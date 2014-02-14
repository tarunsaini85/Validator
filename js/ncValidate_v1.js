$.fn.ncValidate = function(params){
	
	var t=this,
		settings = $.extend({
		//Configurable options
		errors : commonErrList,
		clearOnFocus : false,
		inlineErrors : true,
		messageBox : {id:null,content:null,hideOthers:null},
		styles : {errClass:'err', okClass:'ok', sOkClass:'softMand'},
		formNames : null,
		defaultEvents : null,
		submitButton : null,
		fireDelay : 0,
		
		//Fixed options
		lastErr : null,
		isVld : null,
		erArry : {},
		noVld : false,
		placeholder : $.placeholderSupport
	},params);
	settings.messageBox = $.extend(true,{id:null,content:null,hideOthers:null},settings.messageBox);
	settings.styles = $.extend(true,{errClass:'err', okClass:'ok', sOkClass:'softMand'},settings.styles);
	
	this.each(function(){
		validInit($(this).attr('name'),settings.submitButton,settings.styles.errClass,settings.styles.okClass,settings.styles.sOkClass,settings.messageBox.id,settings.messageBox.content,settings.messageBox.hideOthers,settings.inlineErrors,settings.defaultEvents,settings.fireDelay)
	});
	
	
	function validInit(fN,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr,dEvts,delay){
		var z,
			//frmElm=$('form[name='+fN+']').currObj() || document.forms[fN],
			frmElm=$('form[name='+fN+']'),
			sBtns,
			rStat,
			noVldSt=false,
			sbtFlg;
		if(!settings.placeholder){setDefaultValues(frmElm)}
		checkEvents(frmElm,eC,oC,soC,inErr,dEvts);
		if(sB){
			sBtns=getSbtBtns(frmElm,sB);
			for(z=0;z<sBtns.length;z++){
				if(sBtns[z].attr('type')!='submit'){
					if(sBtns[z].attr('rel')!='' && sBtns[z].attr('rel')=='noValidate'){sBtns[z].on('click',function(){settings.noVld=true;frmElm.submit()})}
					else{sBtns[z].on('click',function(){
						setTimeout(function(){settings.isVld=checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr)},parseInt(delay));
					})
				}
		}}}
		frmElm.submit(function(){
			if(parseInt(delay)==0){
				(settings.noVld)?rStat=true:rStat=commonValidator.checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr);
				return rStat;
			}
			else{
				setTimeout(function(){
					(commonValidator.noVld)?rStat=true:rStat=commonValidator.checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr);
					if(rStat){
						commonValidator.sanitizeDefaultValues(frmElm);
						frmElm.submit();
					}
				},parseInt(delay));
				return false;
			}
		})
	}
	
	function checkEvents(fElm,eC,oC,soC,inErr,dEvts){
		var x,y,evts=null, fEls=getFrmElms(fElm,false);
		for(x=0;x<fEls.length;x++){
			/*var edtr=eval(fEls[x].attr('editor'));
			if(edtr){
				console.log(edtr.viewSrc());
				console.log(edtr.cInput.val())
			}*/
			var valids=fEls[x].attr('rel').split('|')[0];
			if(fEls[x].attr('rel').split('|')[1] || dEvts){
				if(dEvts){(dEvts.constructor===Array)?'':dEvts=new Array(dEvts)}
				evts=(fEls[x].attr('rel').split('|')[1])?fEls[x].attr('rel').split('|')[1].split(','):dEvts;
				if(evts){
					for(y=0;y<evts.length;y++){
						//console.log(fEls[x].currObj()+'-----------'+evts[y]);
						var edtr = checkEditor(fEls[x]);
						if(edtr){
							if(edtr){
								var edtrObj = ($n.browser().name=='msie')?edtr.obj:edtr.objContDoc;
								$n(edtrObj).addEvent(evts[y],function(vlds,obj,frm,eCp,oCp,soCp){
									return function(e){commonValidator.checkValids(vlds,obj,e,frm,eCp,oCp,soCp,true)}
								}(valids,edtr,fElm,eC,oC,soC))
							}
						}
						else{
							//fEls[x].on(evts[y],function(event){checkValids1(event)});
							fEls[x].on(evts[y],function(vlds,obj,frm,eCp,oCp,soCp){
								return function(e){checkValids(vlds,obj,e,frm,eCp,oCp,soCp,true)}
							}(valids,fEls[x],fElm,eC,oC,soC))
						}
					}
				}
			}
			if(settings.clearOnFocus){
				fEls[x].on('focus',function(vlds,obj,frm,eCp,oCp,soCp){
					return function(e){commonValidator.clearError(e,vlds,obj,frm,eCp,oCp,soCp,true)}
				}(valids,fEls[x],fElm,eC,oC,soC))
			}
		}
	}
	
	/*function checkValids1(e){
		alert(e);
	}*/
	
	function checkValids(vlds,obj,e,fElm,eC,oC,soC,inErr){
		var argChk=false,evtChk=0,argSts=false,obVal,sReq=false,etr=false;
		if(obj.obj){etr=true}
		if(arguments.length==2){argChk=true;evtChk=1}
		else{if(e.keyCode!=9&&e.keyCode!=16&&e.keyCode!=17&&e.keyCode!=18&&e.keyCode!=35&&e.keyCode!=36&&e.keyCode!=27&&e.keyCode!=20&&e.keyCode!=13){evtChk=1}}
		if(evtChk==1){
			var x,vRet=false, vCode='', vds=vlds.split(',');
			for(x=0;x<vds.length;x++){if(!vRet){
					console.log(t);
					switch (vds[x].split(':')[0]){
						case 'softReq' :
							(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val();
							if(argChk){(argSts)?'':argSts=this.validators.reqChk(obVal,vds[x].split(':')[1])}
							else{								
								vRet=this.validators.reqChk(obVal,vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1];
								(vRet)?sReq=true:sReq=false;
							}
							break;

						case 'required' :
							(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val();
							if(argChk){(argSts)?'':argSts=t.validators.reqChk(obVal,vds[x].split(':')[1])}
							else{
								vRet=this.validators.reqChk(obVal,vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}
							break;

						case 'alphaDS' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
								if(argChk){(argSts)?'':argSts=this.validators.alphadsChk(obj.val(),vds[x].split(':')[1])}
								else{
									vRet=this.validators.alphadsChk(obj.val(),vds[x].split(':')[1]);
									vCode=vds[x].split(':')[1]
								}}
							break;

						case 'alpha' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.alphaChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.alphaChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'num' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
								if(argChk){(argSts)?'':argSts=this.validators.numChk(obj.val(),vds[x].split(':')[1])}
								else{
									vRet=this.validators.numChk(obj.val(),vds[x].split(':')[1]);
									vCode=vds[x].split(':')[1]
							}}
							break;

						case 'float' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.floatChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.floatChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'alphanum' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.alphanumChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.alphanumChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'email' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.emailChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.emailChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'specialChar' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.splChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.splChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'charRange' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							var o=obj, minL=(o.attr('minL')!='')?o.attr('minL'):o.attr('minlength'), maxL=(o.attr('maxL')!='')?o.attr('maxL'):o.attr('maxlength'), scop='';
				(!o.attr('scope') || o.attr('scope')=='')?scop='in':scop=o.attr('scope');
							if(argChk){(argSts)?'':argSts=this.validators.rangeChk(o.val(),minL,maxL,scop)}
							else{
								vRet=this.validators.rangeChk(o.val(),minL,maxL,scop);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'valRange' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							var o=obj, minV=(o.attr('minval')!='')?parseFloat(o.attr('minval')):parseFloat(o.attr('minV')), maxV=(o.attr('maxval')!='')?parseFloat(o.attr('maxval')):parseFloat(o.attr('maxV')), scop='';
							(!o.attr('scope') || o.attr('scope')=='')?scop='in':scop=o.attr('scope');
							if(argChk){(argSts)?'':argSts=this.validators.rangeVChk(o.val(),minV,maxV,scop)}
							else{
								vRet=this.validators.rangeVChk(o.val(),minV,maxV,scop);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'checked' :
							if(argChk){
								if(obj.attr('type')=='checkbox'){
									var fElm,fPar=obj;
									while(fPar.currObj().nodeName.toLowerCase()!='form'){fPar=fPar.parent()}
									(argSts)?'':argSts=this.validators.checkedChk(obj,fPar.currObj());
								}
								else if(obj.attr('type')=='radio'){
									var fElm,fPar=obj;
									while(fPar.currObj().nodeName.toLowerCase()!='form'){fPar=fPar.parent()}
									(argSts)?'':argSts=this.validators.checkedRadChk(obj,fPar.currObj());
								}
							}
							else{
								if(obj.attr('type')=='checkbox'){vRet=this.validators.checkedChk(obj,fElm)}
								else if(obj.attr('type')=='radio'){vRet=this.validators.checkedRadChk(obj,fElm)}
								vCode=vds[x].split(':')[1]
							}
							break;
							
						case 'selected' :
							if(argChk){(argSts)?'':argSts=this.validators.selectedChk(obj)}
							else{
								vRet=this.validators.selectedChk(obj);
								vCode=vds[x].split(':')[1]
							}
							break;

						case 'custom' :
							if(etr){obj.viewSrc();obVal=obj.cInput.val()}
							else{(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val()}
							if(argChk){
								var fnc = commonValidator.errs[vds[x].split(':')[1]],vR=fnc(obj);
								(vR.constructor===Object)?vR=vR.msg:'';
								(vR)?vR=true:vR;
								(argSts)?'':argSts=vR;
							}
							else if(commonValidator.errs[vds[x].split(':')[1]]){var fnc = commonValidator.errs[vds[x].split(':')[1]], vR=fnc(obj)}
							(vR.constructor===Object)?vRet=vR.msg:vRet=vR;
							vCode=vR;
							break;
							
						default :{break;}
			}}}
			if(argChk){return argSts}
			else{
				if(vRet && !sReq){this.heighlightErrOk(vCode,obj,fElm,'err',eC,oC,soC,inErr);commonValidator.lastErr=obj;return false}
				if(vRet && sReq){this.heighlightErrOk(vCode,obj,fElm,'sMnd',eC,oC,soC,inErr);commonValidator.lastErr=commonValidator.lastErr;return true}
				else{this.heighlightErrOk(vCode,obj,fElm,'ok',eC,oC,soC,inErr);return true;}
			}
	}}
		
	t.setDefaultValues = {
		
		reqChk:function(val,vCd){
			var regX=/^\s*$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			return (regX.test(val))?true:false
		},
		
		alphadsChk:function(val,vCd){
			var regX=/^[a-zA-Z.\s]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){
				val=this.trimVal(val);
				if(val.indexOf('.')==0){return true}
				else if(!regX.test(val)){return true}
				else{return false}
			}else{return false}
		},
		
		alphaChk:function(val,vCd){
			var regX=/^[a-zA-Z]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		numChk:function(val,vCd){
			var regX=/^[-]?[0-9]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		floatChk:function(val,vCd){
			var regX=/^[-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		alphanumChk:function(val,vCd){
			var regX=/^[a-zA-Z0-9]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		emailChk:function(val,vCd){
			var regX=/^([0-9a-zA-Z]([\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,4})$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		splChk:function(val,vCd){
			var regX=/^[a-zA-Z\d\s]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		rangeChk:function(val,minL,maxL,scop){
			if(!maxL || maxL==''){maxL=val.length+1}
			if(val!=''){
				var scop=scop||'in';
				if(scop=='in'){if(val.length<minL || val.length>maxL){return minL+':'+maxL}else{return false}}
				else if(scop=='out'){if(val.length>minL){if(val.length<maxL){return minL+':'+maxL}}else{return false}}
			}else{return false}
		},
		
		rangeVChk:function(val,minV,maxV,scop){
			if(val!=''){
				var scop=scop||'in';
				if(scop=='in'){if(parseFloat(this.trimVal(val))<minV || parseFloat(this.trimVal(val))>maxV){return minV+':'+maxV}else{return false}}
				else if(scop=='out'){if(parseFloat(this.trimVal(val))>minV){if(parseFloat(this.trimVal(val))<maxV){return minV+':'+maxV}}else{return false}}
			}else{return false}
		},
		
		checkedRadChk:function(elm,frm){
			var x, f=false, fElm=$n(frm).childrens("input:radio");
			for(x=0;x<fElm.length;x++){if(fElm.eq(x).attr('name')==elm.attr('name')){(fElm.eq(x).currObj().checked==true)?f=true:'';}}
			return (f)?ret=false:ret=true;
		},
		
		//checkedChk:function(elm){return (elm.currObj().checked==true)?false:true},
		checkedChk:function(elm,frm){
			var x, f=false, fElm=$n(frm).childrens("input:checkbox");
			for(x=0;x<fElm.length;x++){if(fElm.eq(x).attr('name')==elm.attr('name')){(fElm.eq(x).currObj().checked==true)?f=true:'';}}
			return (f)?ret=false:ret=true;
		},
		
		checkedChkSrv:function(val){return (val==null || val=="")?true:false},
				
		selectedChk:function(elm){return (elm.currObj().selectedIndex!=0)?false:true},
		
		selectedChkSrv:function(val,dVal){return (val==dVal)?true:false},
		
		trimVal : function(val){var val=val.replace(new RegExp("^[\\s]+", "g"), "");val=val.replace(new RegExp("[\\s]+$", "g"), "");return val}
	}
	
	function setDefaultValues(fElm){
		var x,fEls=getFrmElms(fElm,true);
		for(x=0;x<fEls.length;x++){
				if(fEls[x].val()=='' || fEls[x].val()==fEls[x].attr('placeholder')){fEls[x].val(fEls[x].attr('placeholder'));fEls[x].css({'color':'#a9a9a9'})}				
				fEls[x].on('focus',function(){defTextFocus($(this),'f')});
				fEls[x].on('blur',function(){defTextFocus($(this),'b')});
		}
		var defTextFocus=function(obj,e){
			if(obj.val()==obj.attr('placeholder') && e=='f'){obj.val('');obj.removeAttr('style')}
			else if((obj.val()=='' || obj.val()==obj.attr('placeholder')) && e=='b'){obj.val(obj.attr('placeholder'));obj.css({'color':'#a9a9a9'})}
		}
	}

	function getFrmElms(frmElm,fg){
		var x, els=[], fElms=frmElm.find('input, select, textarea');
		for(x=0;x<fElms.length;x++){
			var nodNam = fElms.eq(x)[0].nodeName.toLowerCase();
			if(fg){
				if((nodNam=='input' || nodNam=='textarea') && fElms.eq(x).attr('placeholder')!='' && fElms.eq(x).attr('placeholder')!='undefined'){
					els.push(fElms.eq(x))
				}
			}
			else{
				if((nodNam=='input' || nodNam=='select' || nodNam=='textarea') && fElms.eq(x).attr('type')!='submit' && fElms.eq(x).attr('rel') && fElms.eq(x).attr('rel')!=''){
					els.push(fElms.eq(x))
				}
			}
		}
		return els;
	}
	
	function getSbtBtns(frmElm,sB){
		var x, y, els=[], fElms=frmElm.children();
		els = frmElm.find('input[type=submit], button[type=submit]');
		if(sB){if(sB.constructor===Array){for(y=0;y<sB.length;y++){els.push($('#'+sB[y]))}}else{els.push($('#'+sB))}}
		return els;
	}
	
	function checkEditor(o){
		var attrEdtr = o.attr('editor');
		if(attrEdtr && attrEdtr!=''){
			return eval(attrEdtr);
		}
	}
	
	
	return this.each(function(){
		$.fn.setDefaultValues = setDefaultValues($(this));
	});
}

$.placeholderSupport = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
})();