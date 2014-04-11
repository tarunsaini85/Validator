//Rich Text Editor V1.0 Powered by NUI Framework
var editorWindow=function(){
	var eW=this;
	eW.createEditor=function(cssPath, defaultcontent, id, objectName, formName, prv, nxt, iframeCountSpan, count, countMess){
		eW.id=id;
		eW.allButton=new Array('editor_Bold'+eW.id, 'editor_Italic'+eW.id, 'editor_under'+eW.id, 'editor_ol'+eW.id, 'editor_ul'+eW.id, 'editor_jl'+eW.id, 'editor_jc'+eW.id, 'editor_jr'+eW.id);
	eW.abClass=new Array('edt_bold', 'edt_Itl', 'edt_undr', 'edt_iol', 'edt_iul', 'edt_jl', 'edt_jc', 'edt_jr');
		var getTextarea=$n('#'+eW.id);
		var getTextareaParent=getTextarea.parent();
		var wid=getTextarea.width() - 6;
		var hei=getTextarea.height() + 10;
		
        eW.contText=getTextarea.html();
        //alert(eW.contText)
		eW.cInput=$n('<input>').attr({type:'hidden', name:getTextarea.attr('name')})//.val(eW.contText)
		eW.ieFlag=0;
		eW.prv=prv;
		eW.nxt=nxt;
		eW.iframeCountSpan=iframeCountSpan;
		eW.count=count;
		eW.countMess=countMess;
		$n('#'+formName).append(eW.cInput);
		getTextarea.remove();
		getTextareaParent.html('<span class="bdrbl bgwht" style="display:inline-block;width:'+(wid+3)+'px; height:'+(hei+29)+'px;"><div class="editorBut" id="editBut'+eW.id+'"><a title="Bold" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'Bold\', \'\', this)" class="edt_bold" id="editor_Bold'+eW.id+'">&nbsp;</a><a title="Italic" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'Italic\', \'\', this)" class="edt_Itl" id="editor_Italic'+eW.id+'">&nbsp;</a><a title="Underline" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'Underline\', \'\', this)" class="edt_undr" id="editor_under'+eW.id+'">&nbsp;</a><a title="Ordered List" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'InsertOrderedList\', \'listId\', this)" class="edt_iol" id="editor_ol'+eW.id+'">&nbsp;</a><a title="Unordered List" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'InsertUnorderedList\', \'listId\', this)" class="edt_iul" id="editor_ul'+eW.id+'">&nbsp;</a><a title="Left Justify" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'JustifyLeft\', \'\', this)" class="edt_jl" id="editor_jl'+eW.id+'">&nbsp;</a><a title="Center Justify" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'JustifyCenter\', \'\', this)" class="edt_jc" id="editor_jc'+eW.id+'">&nbsp;</a><a title="Right Justify" href="javascript:void(0)" onclick="'+objectName+'.changeProp(\'JustifyRight\', \'\', this)" class="edt_jr" id="editor_jr'+eW.id+'">&nbsp;</a></div><iframe id="'+eW.id+'" frameBorder="0" border="0" style="background:transparent;width:'+(wid-1)+'px; overflow:auto;background:#fff !important; margin-left:2px; height:'+hei+'px;" allowtransparency="true"></iframe></span>');
		
		
		eW.stylesheet=cssPath;
		eW.content=eW.contText=='' ? defaultcontent : eW.contText;
		eW.obj=$n('#'+eW.id).currObj();
		eW.objCont = eW.obj.contentWindow;
		eW.objContDoc = eW.objCont.document;
    	eW.objContDoc.designMode='On';
		eW.objContDoc.open();
		eW.browser=$n.brewser();
		var objContDoc=$n(eW.objContDoc);
		objContDoc.addEvent("mousedown", function(e){eW.contextMenuDown(e);eW.setScroll_IE()}).addEvent("keydown", function(e){eW.getkeyCode(e);}).addEvent("keyup", function(e){eW.keyupEvent();eW.setScroll_IE();}).addEvent("mouseup", function(e){eW.keyupEvent()}).addEvent("contextmenu", function(e){eW.contextShow(e, eW.id, eW.objContDoc)});
		
		$n('#editBut'+eW.id+' a').addEvent('focus', function(){$n(eW.objCont).setFocus();})
       	if(typeof document.documentElement.style.opacity!='undefined' && eW.browser.name=='msie'){
			eW.objContDoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en" contenteditable="true"><head>');}
		else{
			eW.objContDoc.write('<html><head>');
		}
        if(eW.stylesheet){
            // must be done after the document has been opened
         eW.objContDoc.write('<style type="text/css">@import url('+eW.stylesheet+');</style>');
        }
         eW.objContDoc.write('</head><body>'+this.content.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;nbsp;/gi, ' ').replace(/&amp;gt;/gi, '>').replace(/&amp;lt;/gi, '<').replace(/&amp;amp;/gi, '&').replace(/(\s*style=("|')(font-size|font-family):\s[a-zA-Z0-9;\s]+("|'))/gi, ''));

        eW.objContDoc.write('</body></html>');
        eW.objContDoc.close();
		eW.objContDocBody = eW.objCont.document.body;
		delete getTextarea; delete getTextareaParent; delete wid; delete hei;
	}
	eW.setScroll_IE=function(){
		var curObj_iframe=$n('#'+eW.id).currObj();
		if(curObj_iframe.contentWindow.document.body){
		curObj_iframe.contentWindow.document.body.scroll='yes'
		if (eW.objContDocBody.scrollHeight > eW.objContDocBody.offsetHeight) 
			curObj_iframe.contentWindow.document.body.scroll='yes';
		else
			 curObj_iframe.contentWindow.document.body.scroll='no';
		}
	}
	eW.getkeyCode = function(event){
		if (event == null)
		event = window.event;
		var code = (document.all) ? event.keyCode:event.which;
		var ctrl = typeof event.modifiers == 'undefined' ? event.ctrlKey : event.modifiers & Event.CONTROL_MASK;
		var sft = typeof event.modifiers == 'undefined' ? event.shiftKey : event.modifiers & Event.SHIFT_MASK;
		// Do stuff here
		//console.log(eW.objContDocBody.scrollHeight , '-' ,  eW.objContDocBody.offsetHeight)
		if(ctrl && code==86 || code==45){ //paste
			eW.paste();
		}
		else if(ctrl && code==66 && eW.browser.name=='mozilla'){ // Bold
			$n.preventDefault(event);
			$n('#editor_Bold'+eW.id).click();
		}
		else if(ctrl && code==73 && eW.browser.name=='mozilla'){ // italic
			$n.preventDefault(event);
			$n('#editor_Italic'+eW.id).click();
		}
		else if(ctrl && code==85 && eW.browser.name=='mozilla'){ // underline
			$n.preventDefault(event);
			$n('#editor_under'+eW.id).click();
		}
		else if(sft && code==9){
			$n.preventDefault(event);
			$n('#'+eW.prv).setFocus();
		}
		else if(code==9){
			$n.preventDefault(event);
			$n('#'+eW.nxt).setFocus();
		}
		
		delete code; delete ctrl; delete sft;
	}
	eW.resetButton=function(){
		for(var i=0; i<eW.allButton.length; i++){
			$n('#'+eW.allButton[i]).removeClass('selected');		
		}
	}
	eW.qcs=function(command){
		return eW.objContDoc.queryCommandState(command);
	}
	eW.keyupEvent=function(){
		eW.resetButton();
		if(eW.qcs('Bold'))
		eW.setSelection(eW.allButton[0])
		if(eW.qcs('Italic'))
		eW.setSelection(eW.allButton[1])
		if(eW.qcs('Underline'))
		eW.setSelection(eW.allButton[2])
		if(eW.qcs('InsertOrderedList'))
		eW.setSelection(eW.allButton[3])
		if(eW.qcs('InsertUnorderedList'))
		eW.setSelection(eW.allButton[4])
		if(!eW.qcs('JustifyCenter') && !eW.qcs('JustifyRight'))
		eW.setSelection(eW.allButton[5])
		if(eW.qcs('JustifyCenter'))
		eW.setSelection(eW.allButton[6])
		if(eW.qcs('JustifyRight'))
		eW.setSelection(eW.allButton[7])
		eW.changeCountText();
	}
	
	eW.changeCountText=function(){
		if(eW.iframeCountSpan){
			var b=eW.textCount();
			var cnt=0;
			if(b<=eW.count){
				cnt=eW.count-b;
			}
			else if(b>=eW.count){
				cnt=0;
			}
			$n('#'+eW.iframeCountSpan).html(cnt);
		}
	}
	
	eW.textCount=function(){
			var tmp=eW.objCont.document.body;
			var b='';
			if(document.body.textContent)
				b=tmp.textContent;
			else
				b=tmp.innerText;
			return b.replace(/\n/gi, '').length;
	}
	eW.setSelection=function(id){
		$n('#'+id).addClass('selected');
	}
	eW.changeProp = function(command, optz, obj){
		if(eW.objContDoc.queryCommandEnabled){
			eW.ieFlag=0;
			eW.objCont.focus();
			eW.setCSSCreate(command);
			eW.objContDoc.execCommand(command, false, optz);
			eW.keyupEvent();
			return true;
		}
		else {
			return false;
		}
	}
	eW.setCSSCreate=function(aUseCss){
		if(eW.objContDoc && eW.browser.name!='msie'){
			eW.objContDoc.execCommand('useCSS', false, aUseCss)
		}
	}
	eW.paste = function(cont){
		var doc=$n(eW.objContDoc.body);
		eW.savedData=doc.html();
		eW.range=eW.saveRange();
		if(eW.browser.name!='msie')
		eW.objContDoc.designMode='Off';
		$n('#editortxtArea').val('');
		
		lightBox({trigger:"trigger5",contId:"pCont",closeBtn:"closeBtn4",contWidth:650,ecp:true,fixedLayer:true,returnFocus:true});
		
		if(eW.browser.name!='msie')
		setTimeout(function(){eW.objContDoc.designMode='On';}, 500);
		setTimeout(function(){$n('#editortxtArea').val('');}, 50)
		createTxtarea=$n('#editortxtArea');
		$n('#editorButton').click(function(){
			var d=createTxtarea.val();
			createTxtarea.val('');
			hideLayer();
			eW.insertHtmlAtCursor(d);
		})
		var alen= $n('#editorButton').parent().childrens('a');
		for(var x=0; x<alen.length; x++){
			var alenX=alen.eq(x);
				if(alenX.attr('id')=='lastAnchor'){
					alenX.addEvent('click', eW.closeLB); 
					break;}
		}
	}
	eW.closeLB=function(){
			hideLayer();
			$n(eW.objCont).setFocus();
	}
	eW.checkPaste=function(){
		var objbodyHTML=$n(eW.objContDocBody).html();
		if(objbodyHTML && objbodyHTML!='<br>'){
			return objbodyHTML;
		}
		setTimeout(function(){eW.checkPaste()}, 10)
	}
	eW.viewSrc = function(){
		var d=(eW.objContDocBody.innerHTML).replace(/(\r\n|\n|\r)/gm, ' ')
    eW.cInput.val(d);
		return false;
	}
	eW.checkHTMLTags=function(){
		if($n(eW.objContDocBody).html().match(/\&lt;.+\&gt;/gi)){
			return false;
		}
		return true;
	}
	 eW.checkBlank=function(){
        if(!($n(eW.objContDocBody).html().replace(/\&lt;.+\&gt;/gi, '').replace(/\&nbsp;/gi, '').replace(/^\s+|\s+$/g,"").replace(/(<([^>]+)>)/ig, ''))){
            return false;
        }
        return true;
    }

		eW.newRange=null;
		eW.newSelection=null;
		eW.selRange=null;
		eW.saveRange = function(){
		if (eW.objCont.document.selection && eW.objCont.document.selection.createRange) {
			range = eW.objCont.document.body.createTextRange();
			eW.selRange=eW.objCont.document.selection.createRange();
		}
		else if (window.getSelection && eW.objCont.window.getSelection().getRangeAt) {
			eW.newSelection=eW.objCont.window.getSelection();
			range = eW.newSelection.getRangeAt(0);
			eW.newRange = range.cloneRange();
		}
		return range;
	}
	eW.insertHtmlAtCursor=function(html){
		html=html.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
		html=(eW.browser.name=='msie') ? html.replace(/(\r\n|\n|\r)/i, '<p>').replace(/(\r\n|\n|\r)/gi, '</p><p>').replace(/(<p><\/p>){2,}/gi, '<p>&nbsp;</p><p>&nbsp;</p>') : html.replace(/(\r\n|\n|\r)/gi, '<br />').replace(/(<br \/>){3,}/gi, '<br /><br /><br />');
		if(eW.browser.name=='msie' && html.match(/<p>/gi)){
			var pos=html.split('<p>');
			var a=pos[0];
			for(i=1; i<=pos.length-1; i++){
				a+='<p>'+pos[i];
			}
			html=a;
		}
		var range, node;
		range=eW.range;
		if (eW.objContDoc.selection && eW.objContDoc.selection.createRange) {
			eW.selRange.pasteHTML(html);
			eW.selRange.select()
    } else if (window.getSelection && eW.objCont.window.getSelection().getRangeAt && range.createContextualFragment) {
			eW.objCont.focus();
			var nRange=eW.newRange.cloneRange();
			nRange.deleteContents();
			html+='<span id="cursorAtThis"></span>';
			node = nRange.createContextualFragment(html) || nRange.pasteHTML(html);
			nRange.setStart(nRange.startContainer, nRange.startOffset)
			nRange.setEnd(nRange.endContainer, nRange.endOffset)
			nRange.insertNode(node);
			var elemToSelect = eW.objCont.document.getElementById("cursorAtThis");
			var selection = eW.objCont.window.getSelection();
       var rangeToSelect = eW.objCont.document.createRange ();
       rangeToSelect.selectNodeContents (elemToSelect);
       selection.removeAllRanges ();
       selection.addRange (rangeToSelect);
			elemToSelect.parentNode.removeChild(elemToSelect)
			
    } else{
			node=range.pasteHTML(html);
			range.insertNode(node);
		}
		eW.changeCountText();
	}
	
	eW.contextFlag=false;
	eW.contextMenuDown=function(event){
		if (event == null)
			event = window.event;
			
		$n('#contextMenu').hide();
		
		if(event.button==2)
			eW.contextFlag=true;
		else
			eW.contextFlag=false;
	}
	
	eW.contextShow=function(event, id, objIframe){
		if (event == null)
			event = window.event;
			if(eW.contextFlag){
				$n.preventDefault(event)
				var _divContext=$n('#contextMenu');
				var getPos=$n('#'+eW.id).position();
			
			_divContext.css({'left':event.clientX + getPos['left'] + 10 + 'px', 'top':event.clientY + getPos['top'] + 5 + 'px'});
			_divContext.show();
			$n(document).addEvent('click', function(){$n('#contextMenu').hide();});
		}
	}
}
