
/*
	Add isArray method function for older browsers.
*/


if(!Array.isArray) {
  Array.isArray = function (vArg){ 
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

/*
	Add trim, ltrim, rtrim, fulltrim methods for older browsers.
*/
if(!String.prototype.trim){
	String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};
	String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
	String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
	String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}

(function(){
	
	if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		var ieversion=new Number(RegExp.$1);if(ieversion<=7){var scr = document.createElement('script'); scr.src = 'http://js.naukimg.com/s/0/0/j/sizzle.js'; document.getElementsByTagName('head')[0].appendChild(scr)};
	}
	
	window.$n = function(arg, context){
		try{
		if(arg==this && document.all) {arg = window.event.srcElement}
		if(typeof arg == 'string'){
			if(arg.search(/(<).+(>)$/)>=0){
				var d = document.createElement(arg.substr(1,arg.length-2));
				 return new $n_myObj([d]); // if user wants to create an element then return the created object in an array;
			}
			else{
				if(document.querySelectorAll){
					var arr = (!context) ? document.querySelectorAll(arg) : context.querySelectorAll(arg); // using windows default method;
					return new $n_myObj(arr);  // return array;
				}
				else
					return new $n_myObj(Sizzle(arg, context)); // using sizzle;
			}
		}
		else if(Array.isArray(arg)){
			return new $n_myObj(arg); // if object is an Array then return arg;
		}
		else if(typeof arg == 'object' && arg.nui != 'nui')
			return new $n_myObj([arg]); // if object then return an array of that object
		else if(typeof arg == 'object' && arg.nui == 'nui')
            return arg; // if object then return an array of that object
	}catch(e){
		if(arg.indexOf(':checkbox') != -1){
			var splitVar = arg.split(':checkbox');
			return $n(splitVar[0]+'[type=checkbox]'+splitVar[1]);
		}
		if(arg.indexOf(':checked') != -1){
			var splitVar = arg.split(':checked');
			return $n(splitVar[0]+'[checked]'+splitVar[1]);
		}
	}

	}
	
})()

var $n_myObj = function(){
	this.push = [].push
	for(var i =0; i<arguments[0].length; i++){
		this.push(arguments[0][i]);
	}
}
$n_myObj.prototype.length = 0;
$n_myObj.prototype.nui='nui';
$n_myObj.prototype.splice = [].splice;
$n_myObj.prototype.pop = [].pop;
$n_myObj.prototype.reverse = [].reverse;
$n_myObj.prototype.slice = [].slice;
//$n_myObj.prototype.indexOf = [].indexOf;

$n.fn = $n_myObj.prototype;

$n.ieFix={'tabindex': "tabIndex",'readonly': "readOnly","for": "htmlFor","class": "className",'maxlength': "maxLength",'cellspacing': "cellSpacing", 'cellpadding': "cellPadding",'rowspan': "rowSpan",'colspan': "colSpan", 'usemap': "useMap", 'frameborder': "frameBorder", 'contenteditable': "contentEditable"};
$n.browser=function(){
var userAgent=navigator.userAgent.toLowerCase();
var getBrowser = {
version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
chrome: /chrome/.test( userAgent ),
safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
opera: /opera/.test( userAgent ),
msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};
var name=null;
var version=null;
if(getBrowser.chrome){name='chrome';version=getBrowser.version}
if(getBrowser.safari){name='safari';version=getBrowser.version}
if(getBrowser.opera){name='opera';version=getBrowser.version}
if(getBrowser.msie){name='msie';version=getBrowser.version}
if(getBrowser.mozilla){name='mozilla';version=getBrowser.version}
return ({name:name,version:version})
}//browser


$n.fn.show = function(){
	var that=this;
	for(var i=0; i<that.length; i++){
		var current = that[i],
		curCSS = new $n_myObj([current]).getCSS('display'),
		currentStyle = current['display'];
		//alert(((currentStyle && currentStyle != 'none') ? currentStyle : get_defaultStyle(current.nodeName)))
		current.style.display = (curCSS != 'none') ? curCSS : ((currentStyle && currentStyle != 'none') ? currentStyle : get_defaultStyle(current.nodeName));
	}
	return that;
}
$n.indexOf = function(obj, matchValue){
if (typeof obj == 'string')
var x = obj.trim();
if(x && (typeof obj).toLowerCase == 'object'){
	if (!Array.prototype.indexOf)
	{
	    var len = obj.length >>> 0;
	
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;
	    for (; from < len; from++)
	    {
	      if (from in obj && obj[from] === elt)
	        return from;
    	}
    	return -1;
	} else
	return obj.indexOf(matchValue)
	}
else
	return -1;
}

$n.fn.hide = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		var current = that[i];
		if(!current['display']){
			current['display'] = new $n_myObj([current]).getCSS('display');
		}
		current.style.display='none';
	}
	return that;
}
$n.fn.toggle = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		var current = that[i];
		if(!current['display']){
			current['display'] = new $n_myObj([current]).getCSS('display');
		}
		var currentStyle = new $n_myObj([current]).getCSS('display');
		if(currentStyle != 'none'){
			current.style.display='none';
		}else{
			current.style.display = (current['display'] != 'none') ? current['display'] : (currentStyle!= 'none' ? currentStyle : get_defaultStyle(current.nodeName));
		}
	}
	return that;
}
$n.fn.html = function(arg){
	var that = this;
	if(typeof arg != 'undefined'){
		var bool = (typeof arg).toLowerCase()=='string';
		for(var i=0; i<that.length; i++){
			if(bool || $n.isNumber(arg))
				that[i].innerHTML=arg;
			else{
				that[i].innerHTML = ''
				if(arg && typeof arg[0] != 'undefined')
				that[i].appendChild(arg[0].cloneNode(true));
			}
		}
	}
	else{
		for(var i=0; i<that.length; i++){
			return that[i].innerHTML; 
		}
	}
	return that;
}
$n.fn.text = function(arg){
	var that = this;
	
	if(!arg){
		for(var i=0; i<that.length; i++){
			return (that[i].textContent) ? (that[i].textContent) : (that[i].innerText); 
		}
	}
	else{
		arg1=arg;
		for(var i=0; i<that.length; i++){
			if(typeof arg == 'function'){
				arg1 = arg(i);
			}
			//arg1 = //arg1.replace(/(\<(\/?[^\>]+)\>)/gi, '');
			(that[i].textContent || that[i].textContent == '') ? (that[i].textContent = arg1) : (that[i].innerText = arg1);
		}
	}
	arg1=null;
	return that;
}
$n.fn.toggletext=function(textOne, textTwo){
	var that = this;
	for (var i=0; i<that.length; i++){
			that[i].innerHTML = (that[i].innerHTML == textOne) ? textTwo : textOne;
	}
	return that;
}

$n.fn.remove = function(){
	var that = this;
	for(var i=that.length-1; i>=0; i--){
		that[i].parentNode.removeChild(that[i]);
	}
	return that;
}
$n.fn.parent = function(arg){
	var that = this;
	if(!arg){
		for(var i=0; i<that.length; i++){
			return new $n_myObj([that[i].parentNode]);
		}
	} else if(typeof arg === 'string' && arg.toLowerCase() == 'all') {
		var thatAll = []
		for(var i=0; i<that.length; i++){
			if($n.indexOf(thatAll, that[i].parentNode) == -1)
			thatAll.push(that[i].parentNode);
		}
		return new $n_myObj(thatAll);
	} else if(!isNaN(arg)){
		var thatAll = [] ;
		for(var i=0; i<that.length; i++){
			var j = 1, that_i = that[i].parentNode;	
			while(j<arg){
				that_i = that_i.parentNode;
				j++;
			}
			if(j==arg && $n.indexOf(thatAll, that_i) == -1){
				thatAll.push(that_i);
			}
		}
		return new $n_myObj(thatAll);
	} else if(typeof arg === 'string'){
		var ele = $n(arg), that_i_arr = [];
		
		for(var i=0; i<that.length; i++){
			var that_i = that[i].parentNode;	
			while(that_i && ($n.indexOf(ele, that_i)) == -1){
				that_i = that_i.parentNode;
			}
			if(that_i && $n.indexOf(ele, that_i)!= -1 && $n.indexOf(that_i_arr, that_i) == -1)
			that_i_arr.push(that_i)
		}
		
		return new $n_myObj(that_i_arr);
	}
	return that;
}
$n.fn.addClass = function(arg){
	var that = this;
	var splitClass = arg.split(' ');
	for(var i=0; i<that.length; i++){
		for(var j=0; j<splitClass.length; j++){
		if(splitClass[j] && (" "+that[i].className+" ").indexOf(' '+splitClass[j]+' ') < 0)
			that[i].className += ' '+splitClass[j]
			that[i].className = (that[i].className).trim();
		}
	}
	return that;
}
$n.fn.removeClass = function(arg){
	var that = this;
	var splitClass = arg.split(' ');
	for(var i=0; i<that.length; i++){
		var that_i = that[i], that_i_class = that_i.className;
		for(var j=0; j<splitClass.length; j++){
		if(splitClass[j] && (" "+that_i_class+" ").indexOf(' '+splitClass[j]+' ') > -1)
			that_i.className = ((" "+that_i_class).replace(' '+splitClass[j], '')).trim();
		}
	}
	return that;
}
$n.fn.changeClass = function(arg){
	var that = this;
	for(var i=0; i<that.length; i++){
		that[i].className = arg;
	}
	return that;
}

$n.fn.replaceClass = function(arg1, arg2){
	var that = this;
	for(var i=0; i<that.length; i++){
		var current = new $n_myObj([that[i]])
		if(current.hasClass(arg1)){
			current.removeClass(arg1);
			if(arg2)
			current.addClass(arg2);
		}
	}
	return that;
}
$n.fn.hasClass = function(arg){
	var that = this;
	var hasClassArray = [];
	var splitClass = arg.split(' ');
	for(var i=0; i<that.length; i++){
		for(var j=0; j<splitClass.length; j++){
			if((that[i].className).indexOf(splitClass[j]) != -1)
				hasClassArray.push(that[i]);
		}
	}
	
	if(hasClassArray.length){
		return new $n_myObj(hasClassArray);
	}
	else
	return null;
}

$n.fn.toggleClass=function(classO, classN){
	var that = this;
    for (var i=0; i<that.length; i++){
		var curO = that[i], current = new $n_myObj([curO]);
      if(classN){
      if(current.hasClass(classO)){
        curO.className=curO.className.replace(new RegExp('(\\b)'+classO+'(\\b)', 'gi'), classN)
      }
      else if(current.hasClass(classN)){
        curO.className=curO.className.replace(new RegExp('(\\b)'+classN+'(\\b)', 'gi'), classO)
      }
      }
      else{
        if(current.hasClass(classO)){
          current.removeClass(classO);
        }
        else{
        current.addClass(classO);
        }
      }
    }
	delete curO, current;
    return that;
  }
$n.fn.checkAll = function(){
	var that = this;
	for (var i=0; i<that.length; i++){
			if(that[i].type=='checkbox')
				that[i].checked = true;
		}
	return that;
}
$n.fn.isChecked=function(){
	var that = this;
		if(that[0].type=='checkbox' || that[0].type=='radio'){
			return that[0].checked;
		}
	}
$n.fn.uncheckAll=function(){
	var that = this;
	for (var i=0; i<that.length; i++){
		if(that[i].type=='checkbox' && that[i].checked == true)
			that[i].checked = false;
	}
	return that;
}
$n.fn.eq = function(index){
	var that = this;
	return new $n_myObj((that[index]) ?  [that[index]] : []);
}
$n.fn.addEvent = function(eventName, fn){
	var that = this;
	for(var i=0; i<that.length; i++){
		window.addEventListener ?  that[i].addEventListener(eventName, fn, false) : that[i].attachEvent('on'+eventName, fn);
	}
	return that;
}
$n.fn.removeEvent = function(eventName, fn){
	var that = this;
	for(var i=0; i<that.length; i++){
		window.addEventListener ?  that[i].removeEventListener(eventName, fn, false) : that[i].detachEvent('on'+eventName, fn);
	}
	return that;
}
$n.fn.height = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		return that[i].offsetHeight;
	}
	return that;
}
$n.fn.width = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		return that[i].offsetWidth;
	}
	return that;
}
$n.fn.css = function(arr){
	var that = this;
	var str = ((typeof arr).toLowerCase() == 'string') ||  $n.isNumber(arr)
	if(str && typeof arguments[1] == 'undefined')
		return that[0] ? new $n_myObj([that[0]]).getCSS(arr) : null;
	if(str && arguments.length==2){
		for(var i=0; i<that.length; i++){
				that[i].style[arr] = arguments[1];
		}
	}else{
		for(var i=0; i<that.length; i++){
			for(var x in arr){
				that[i].style[x] = arr[x];
			}
		}
	}
	return that;
}
$n.fn.getCSS = function(attr){
	var that = this;
	for(var i=0; i<that.length; i++){
		if(that[i].currentStyle)
			return that[i].currentStyle[attr];
		else if(window.getComputedStyle)
			return document.defaultView.getComputedStyle(that[i], null).getPropertyValue(attr);
	}
	return that;
}
$n.fn.appendTo = function(arr){
	var that = this;
	for(var i=0; i<that.length; i++){
		if((typeof arr).toLowerCase()=='string'){
			$n(arr).append(that)
			break;
		}else{
			for(var j=0; j<arr.length; j++){
				arr[j].appendChild(that[i].cloneNode(true))
			}
		}
	}
	return that;
}
$n.fn.append = function(arr){
	var that = this;
		for (var i=0; i<that.length; i++){
			if((typeof arr).toLowerCase()=='string')
				that[i].innerHTML+=arr;
			else{
				if(arr && arr.length){
					that[i].appendChild(arr[0])
				}
				else if(arr){
					that[i].appendChild(arr)
				}
			}
		}
	return that;
}

$n.fn.prepend = function(arr){
	var that = this;
		for (var i=0; i<that.length; i++){
			if((typeof arr).toLowerCase()=='string')
				that[i].innerHTML = arr+that[i].innerHTML;
			else{
				if(arr && arr.length){
					if($n(that[i]).firstChild().length)
						that[i].insertBefore(arr[0].cloneNode(true), ($n(that[i]).firstChild())[0])
					else{
						that[i].appendChild(arr[0].cloneNode(true))
					}
				}
			}
		}
	return that;
}

$n.fn.prependTo = function(arr){
	var that = this;
	for(var i=0; i<that.length; i++){
		if((typeof arr).toLowerCase()=='string'){
			$n(arr).prepend(that)
			break;
		}
		else{
			for(var j=0; j<arr.length; j++){
				arr[j].prepend(that[i])
			}
		}
	}
	return that;
}

$n.fn.position = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		var el1 = that[i];
		var pL = 0, pT = 0;
		while(el1){pT+=el1.offsetTop;pL+=el1.offsetLeft;el1=el1.offsetParent;}
		return {left:pL,top:pT};
	}
	return that;
}
$n.fn.val = function(arg){
	var that = this;
	var valArr = [];
	for(var i=0; i<that.length; i++){
		var nodename = (that[i].nodeName).toLowerCase();
		if(arg){
			switch(nodename){
				case 'input': 		var typeOfThat = that[i].type;
									if(typeOfThat == 'checked' || typeOfThat == 'radio'){
										if(typeof arg != 'string'){
											for(var j = 0; j<arg.length; j++){
												that[i].checked = (that[i].value == arg[j]) ? true : false;
											}
										}else{
											that[i].checked = (that[i].value == arg) ? true : false;
										}
									}
									else
										that[i].value = arg.toString();
									break;
				case 'textarea':	that[i].innerHTML = arg;
									break;
				case 'select':		for(var j =0; j<that[i].options.length; j++){
										that[i].options[j].selected = false;
										for(var k=0; k<arg.length; k++)	{
											if(that[i].options[j].innerHTML == arg[k] || that[i].options[j].value == arg[k]){ 
												that[i].options[j].selected = true 
												break;
											}
										}
									}
									break;
			}
		}
		else{
			switch(nodename){
				case 'input':		valArr.push(that[i].value);
									break;
				case 'textarea':	valArr.push(that[i].value);
				case 'select':		for(var j =0; j<that[i].options.length; j++){
										if(that[i].options[j].selected){
											valArr.push(that[i].options[j].value || that[i].options[j].innerHTML);
										}
									}
			}
		}
	}
	if(!arg){
		if(that.length==1)
		valArr = valArr.toString();
		return valArr;
	}
	return that;
}
$n.fn.clone = function(){
	var that = this;
	for(var i=0; i<that.length; i++){
		return new $n_myObj([that[i].cloneNode(true)]);
	}
	return that;
}
$n.fn.attr = function(prop, val){
	var that = this;
	for(var i=0; i<that.length; i++){
		if(typeof val != 'undefined'){
			/*for(var y in $n.ieFix){
				if(y == prop){
					prop = $n.ieFix[y]
				}
			}*/
			that[i].setAttribute ? ($n.ieFix[prop] ? (that[i][$n.ieFix[prop]] = val) : that[i][prop] = val) : (that[i][prop] = val)
			that[i][prop] = val;
		}
		else if(typeof prop == 'string'){
			for(var y in $n.ieFix){
				if(y == prop){
					prop = $n.ieFix[y]
				}
			}
//			return (that[i][prop]) ? that[i][prop] : that[i].getAttribute(prop);
			return (that[i][prop]) ? that[i][prop] : ($n.ieFix[prop] ? that[i][$n.ieFix[prop]] : that[i].getAttribute(prop));
//			return that[i].setAttribute ? ($n.ieFix[prop] ? that[i][$n.ieFix[prop]] : that[i].getAttribute(prop)) : that[i][prop]
			
		}
		else{
			for(var x in prop){
//				var z = x;
/*				console.log(that[i].setAttribute(z, prop[x]), that[i].getAttribute(z))
				for(var y in $n.ieFix){
					if($n.ieFix[y] == x){
						z = y;
					}
				}*/
				that[i].setAttribute ? ($n.ieFix[x] ? (that[i][$n.ieFix[x]] = prop[x]) : that[i].setAttribute(x, prop[x])) : (that[i][x] = prop[x])
				//that[i][z] = prop[x];
			}
		}
		
	}
	return that;
}
$n.fn.removeAttr=function(attr){
	var that=this;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		var ieversion=new Number(RegExp.$1);if(ieversion<=7)attr=($n.ieFix[attr])?$n.ieFix[attr]:attr;
	}
	for(var i=0;i<that.length;i++){that[i].removeAttribute(attr);}
	return that;
}
$n.fn.ready = function(i) {
	var that = this;
      var u = navigator.userAgent.toLowerCase();
      var ie = /*@cc_on!@*/false;
      if ((/mozilla/.test(u) && !/(compatible)/.test(u)) || (/opera/.test(u))) {
    // opera/moz
      that[0].addEventListener("DOMContentLoaded",i,false);
      } else if (/webkit/.test(u)) {
      // safari
      timeout = setTimeout(function(){
          if ( that[0].readyState == "loaded" ||
            that[0].readyState == "complete" ) {
            i();
          } else {
            setTimeout(arguments.callee,10);
          }
        }, 10);
      }  else if (ie) {
      // IE
      (function (){
        var tempNode = that[0].createElement('document:ready');
        try {
        tempNode.doScroll('left');
        i();
        tempNode = null;
        } catch(e) {
        setTimeout(arguments.callee, 0);
       }
     })();
    } else {
      window.onload = i;
    }
	return that;
}
$n.fn.each=function(callback, args, that) {
	if(!that)
	var that=this;
	
	var name, i = 0,
		length = that.length,
		isObj = length === (undefined || typeof that == 'function');
	if ( args ) {
		if ( isObj ) {
			for ( name in that ) {
				if ( callback.apply( that[ name ], args ) === false ) {
					break;
				}
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.apply( that[ i++ ], args ) === false ) {
					break;
				}
			}
		}

	// A special, fast, case for the most common use of each
	} else {
		if ( isObj ) {
			for ( name in that ) {
				if ( callback.call( that[ name ], name, that[ name ] ) === false ) {
					break;
				}
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.call( that[ i ], i, that[ i++ ] ) === false ) {
					break;
				}
			}
		}
	}
	return that;
}

$n.fn.submit = function(fn){
	var that = this, fnBool = (typeof fn == 'function'), i=0;
	for(; i<that.length; i++){
		fnBool ? (that[i].onsubmit = fn) : that[i].submit();
	}
	delete fnBool;
	return that;
}

$n.fn.click = function(fn){
	var that = this, fnBool = (typeof fn == 'function'), i=0;
	for(; i<that.length; i++){
		fnBool ? (that[i].onclick = fn) : that[i].click();
	}
	delete fnBool;
	return that;
}

$n.fn.mouseover = function(fn){
	var that = this, fnBool = (typeof fn == 'function'), i=0;
	for(; i<that.length; i++){
		fnBool ? (that[i].onmouseover = fn) : that[i].mouseover();
	}
	delete fnBool;
	return that;
}

$n.fn.mouseout = function(fn){
	var that = this, fnBool = (typeof fn == 'function'), i=0;
	for(; i<that.length; i++){
		fnBool ? (that[i].onmouseout = fn) : that[i].mouseout();
	}
	delete fnBool;
	return that;
}
$n.ev=function(e){
	e=(!e) ? window.event : e;
	e.target=(e.target)?e.target:e.srcElement
	return e;
}
$n.fn.children=function(type){
	var that = this;
	var children1=new Array();
	for (var i=0; i<that.length; i++){
			var a=$n(type || '*', that[i]);

			for(var x=0; x<a.length; x++){
				children1.push(a[x])
			}
	}
	return new $n_myObj(children1);
}

$n.fn.slideUp=function(){	 
	var that = this, sstyle=0;
	for(var i=0;i<that.length;i++){	
		var current = new $n_myObj([that[i]]);
		var padT=parseInt(current.getCSS($n.currApp?'padding-top':'paddingTop'));
		padT+=parseInt(current.getCSS($n.currApp?'padding-bottom':'paddingBottom'));;
		var offH=(current.height())-(padT+2);	
		sstyle=offH;
		if(offH>0)
		var t=setInterval(function(){
			offH-=5;
			current.css({height:offH+'px',overflow:'hidden'});
			if(offH<5){clearInterval(t);current.css({height:sstyle+'px'});current.hide();};						
		},arguments[0]||1);
	}
	return that;
}//slideUp end here		

$n.fn.slideDown=function(){
	var that = this, x=0;
	for(var i=0;i<that.length;i++){
		var current = new $n_myObj([that[i]])
		current.show();
		var padT=parseInt(current.getCSS($n.currApp?'padding-top':'paddingTop'));
		padT+=parseInt(current.getCSS($n.currApp?'padding-bottom':'paddingBottom'));;
		var offH=(current.height())-(padT+2);
		current.css({height:x+'px',overflow:'hidden'});
		
		if(offH>x)
		var t=setInterval(function(){								  
			x+=5;current.css({height:x+'px',overflow:'hidden'})
			if(x==offH||x>=offH){clearInterval(t);current.show()};
		},arguments[0]||1);
	 }
	 return that;
}//slideDown end here		


$n.currApp = (navigator.appName == 'Netscape')?true:false;
$n.fn.slideToggle=function(){
	that = this, para = arguments[0]||null;
	for(var i=0;i<that.length;i++){
		var current = new $n_myObj([that[i]]);
		var elH=current.height();
		(elH==0||elH<1)?current.slideDown(para):current.slideUp(para);
	}
	return that;
}//slideToggle end here

$n.fn.fadeOut=function(){
	var that=this, value=10, t=(arguments[0]&& arguments[0]>50 && arguments[0]<500)?arguments[0]:50;
	for(var i=0;i<that.length;i++){
		var current = new $n_myObj([that[i]]), 
			padT=current.getCSS('display');
		if(padT=='none'){return ''}
		if(value>0){
			var t=setInterval(function(){
				value--;
				if(navigator.appName=='Netscape'){current.css({opacity:value/10})}
				else {current.css({filter:'alpha(opacity='+value*10+')',zoom:1})}
				if(value==0||value<0){clearInterval(t);current.hide();}
			},t)			
		}		
	}
	return that;	
}

$n.fn.fadeIn=function(){
	var that=this, value=0, t=(arguments[0]&& arguments[0]>50 && arguments[0]<500)?arguments[0]:50;
	for(var i=0;i<that.length;i++){
		var current = new $n_myObj([that[i]]), 
			padT=current.getCSS('display');
		if(padT=='block'){return ''}
		if(value<10){
			var t=setInterval(function(){
				value++;
				if(navigator.appName=='Netscape'){current.css({opacity:value/10})}
				else {current.css({filter:'alpha(opacity='+value*10+')',zoom:1})}
				current.show();
				if(value==10||value>10){clearInterval(t);current.show();}
			},t)			
		}		
	}
	return that;	
}

$n.fn.first = function(){
	return new $n_myObj(this.length?[this[0]]:[]);
}
$n.fn.last = function(){
	var ifEl=this.length;return new $n_myObj(ifEl?[this[ifEl-1]]:[]);
}
$n.fn.firstChild=function(){
	var allFE=[],that=this;
	for(var i=0; i<that.length; i++){
	var first = that[i].firstChild;
	while(first && first.nodeType !=1 && first.nodeType !=3){first = first.nextSibling;} // changes for prepend 
	if(first && (first.nodeType ==1 || first.nodeType ==3)){allFE.push(first)} // changes for prepend 
}
return new $n_myObj(allFE);        
}

$n.fn.lastChild=function(){
	var allLE=[],that=this;
	for(var i=0; i<that.length; i++){
	var last = that[i].lastChild;
	while(last && last.nodeType !=1){last = last.previousSibling;}
	if(last && last.nodeType ==1){allLE.push(last)}
}
return new $n_myObj(allLE);        
}

$n.fn.next=function() {
	var that=this, nextArr = (that.length && that[0].nextSibling) ? [] : '';;     
	for(var i=0; i<that.length; i++){
		var next = that[i].nextSibling;
		while(next && next.nodeType !=1){next = next.nextSibling;}
		if(next && next.nodeType ==1){nextArr.push(next);}                 
	}
	return nextArr.length ? new $n_myObj(nextArr) : '';             
}

function get_defaultStyle(nName){
	
	var getD = document.createElement(nName);
	document.body.appendChild(getD)
	
	var getDefaultStyle = getStyle(getD, 'display');
	getD.parentNode.removeChild(getD)
	return getDefaultStyle;
}

function getStyle(el,styleProp)
{
	var x = el;
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}

$n.fn.prev=function() {
	var that=this, prevArr = (that.length && that[0].previousSibling) ? [] : '';
	for(var i=0; i<that.length; i++){
		var prev = that[i].previousSibling;
		while(prev && prev.nodeType !=1){
			prev = prev.previousSibling;
		}
		if(prev && prev.nodeType ==1){
			prevArr.push(prev);
		}
	}
	return prevArr.length ? new $n_myObj(prevArr) : '';             
}

$n.fn.prevAll=function() {
	return new $n_myObj(($n.getPrevNodes(this)).sort(sortOrder).reverse());
}
$n.getPrevNodes = function(that){
	var prvAll=[], parentArr = [];
	for(var i=that.length-1; i>=0; i--){
		var ce=that[i];
		if(!parentArr.length)
		parentArr.push(that[i].parentNode)
		var checkEqual = 0;
		for(var j= 0; j<parentArr.length; j++){
			if(parentArr[j]==ce.parentNode)
			checkEqual = 1;
		}
		if(parentArr.length==1 || !checkEqual){
			parentArr.push(that[i].parentNode)
		while(ce!=null){                                                
			ce = ce.previousSibling;
			if(ce&&ce.nodeType==1){prvAll.push(ce)}                                          
		}           
		}
	}
	return prvAll;
}

$n.fn.nextAll=function() {
	return new $n_myObj(($n.getNextNodes(this)).sort(sortOrder));
}
$n.getNextNodes = function(that){
	var prvAll=[], parentArr = [];
	for(var i=0; i<that.length; i++){
		var ce=that[i];
		if(!parentArr.length)
		parentArr.push(that[i].parentNode)
		var checkEqual = 0;
		for(var j= 0; j<parentArr.length; j++){
			if(parentArr[j]==ce.parentNode)
			checkEqual = 1;
		}
		if(parentArr.length==1 || !checkEqual){
			parentArr.push(that[i].parentNode)
		while(ce!=null){                                                
			ce = ce.nextSibling;
			if(ce&&ce.nodeType==1){prvAll.push(ce)}                                          
		}           
		}
	}
	return prvAll;
}

// Compare Position - MIT Licensed, John Resig
function comparePosition(a, b){
  return a.compareDocumentPosition ?
    a.compareDocumentPosition(b) :
    a.contains ?
      (a != b && a.contains(b) && 16) +
        (a != b && b.contains(a) && 8) +
        (a.sourceIndex >= 0 && b.sourceIndex >= 0 ?
          (a.sourceIndex < b.sourceIndex && 4) +
            (a.sourceIndex > b.sourceIndex && 2) :
          1) +
      0 :
      0;
}
$n.fn.siblings=function(){            
	var that=this, al=arguments.length, sibAll, thatParent=[], prv, nxt, allE;
	if(al){
		for(var i=0;i<that.length;i++){
			
			sibAll=$n(arguments[0], that[i].parentNode);
			return sibAll;
		}       
	}
	else {
		//var allSibling=[];
		prv = $n.getPrevNodes(that);
		nxt = $n.getNextNodes(that);
		var flag=1;
		try{
		for(var j=0; j<nxt.length; j++){
			if($n.indexOf(prv, nxt[j]) !== -1){
				nxt.splice(j, 1);
				flag=0;
			}
		}
		}
		catch(e){
		if(flag){
		for(var i=0; i<prv.length; i++){
			for(var j=0; j<nxt.length; j++){
				if(nxt[j]==prv[i]){
				nxt.splice(j, 1);
				}
			}
		}
		}
		}
		
		allE = prv.concat(nxt);
	}
	return new $n_myObj(allE.sort(sortOrder));
		
}

sortOrder = document.documentElement.compareDocumentPosition ? 
			function(a, b){return 3 - (a.compareDocumentPosition(b) & 6)} :
			function(a, b){
    		return 3 - (comparePosition(a, b) & 6);
			}


$n.ajax = function(param){
	var xhr = null;
	
	this.createXHR = function(){(window.XMLHttpRequest) ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject("Microsoft.XMLHTTP"); return xhr;};
	
	var type = param.type, 
		async = param.async,
		datatype = param.datatype, 
		data = param.data, 
		url = param.url, 
		success = param.success, 
		error = param.error;
	
	if(!url) {alert("URL not specified"); return false;}
	if(!success){alert("Success not specified"); return false;}
	if(!type || type=='get') {type = 'get'; if(data) {url+='?'+data; data='';} else data=''};
	async = (typeof async == 'undefined' || async) ? true : false;
	if(!datatype) datatype = 'text';
	if(!error){error=function(){}}
	
	this.createXHR();
	xhr.open(type.toUpperCase(),url,async);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
									if(xhr.readyState == 4 && xhr.status==200){
										
										switch (datatype.toLowerCase())
										{
											 case 'text':
													success(xhr.responseText);
													break;
											 case 'xml':
													success(xhr.responseXML);
													break;
											 case 'json':
													success(eval("("+xhr.responseText+")"));
													break;
											 default:
													alert('Please correct your data type (i.e. text, xml or json)');
													break;
										}
									}
									else if(xhr.readyState == 4 && xhr.status==404) 
									error()
								};
	xhr.send(data);			
}

$n.parseJSON = function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data =  data.trim();

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		alert( "Invalid JSON: " + data );
	}

	// Cross-browser xml parsing
$n.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			alert( "Invalid XML: " + data );
		}
		return xml;
	}


$n.preventDefault=function(e){
	e=(!e)?window.event:e;
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

$n.stopPropagation=function(e){
	e=(!e)?window.event:e;
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
}
$n.innerwidth=function(){
	var innerW = 0;
	if (document.body && document.body.offsetWidth) {
	 innerW = document.body.offsetWidth;
	}
	else if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
	 innerW = document.documentElement.offsetWidth;
	}
	else if (window.innerWidth && window.innerHeight) {
	 innerW = window.innerWidth;
	}
	return innerW;
}
$n.innerheight=function(){
	var innerH = 0;
	if (document.body && document.body.offsetWidth) {
	 innerH = document.body.offsetHeight;
	}
	else if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
	 innerH = document.documentElement.offsetHeight;
	}
	else if (window.innerWidth && window.innerHeight) {
	 innerH = window.innerHeight;
	}
	return innerH;
}
$n.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}