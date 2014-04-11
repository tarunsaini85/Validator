/*! Naukri UI Framework v1.1 naukri.com  */
/* Sizzle Frameowork added for CSS selectors */
var naukriFrameWork=function(e,a){var b=this;if(!e){return false}if(e==this&&document.all){e=window.event.srcElement}if(e!=document){if(typeof e!="object"){if(e.search(/(<).+(>)$/)>=0){var c=document.createElement(e.substr(1,e.length-2));b.el=new Array(c)}else{a=(Sizzle(a))[0]||document;b.el=Sizzle(e,a)}}else{if(e.constructor!=Array){b.el=new Array(e)}else{b.el=e}}return new chainingFunction(b.el)}else{return new chainingFunction(e)}};var $n=naukriFrameWork;
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var n=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,i="sizcache"+(Math.random()+"").replace(".",""),o=0,r=Object.prototype.toString,h=false,g=true,q=/\\/g,u=/\r\n/g,w=/\W/;[0,0].sort(function(){g=false;return 0});var d=function(C,e,F,G){F=F||[];e=e||document;var I=e;if(e.nodeType!==1&&e.nodeType!==9){return[]}if(!C||typeof C!=="string"){return F}var z,K,N,y,J,M,L,E,B=true,A=d.isXML(e),D=[],H=C;do{n.exec("");z=n.exec(H);if(z){H=z[3];D.push(z[1]);if(z[2]){y=z[3];break}}}while(z);if(D.length>1&&j.exec(C)){if(D.length===2&&k.relative[D[0]]){K=s(D[0]+D[1],e,G)}else{K=k.relative[D[0]]?[e]:d(D.shift(),e);while(D.length){C=D.shift();if(k.relative[C]){C+=D.shift()}K=s(C,K,G)}}}else{if(!G&&D.length>1&&e.nodeType===9&&!A&&k.match.ID.test(D[0])&&!k.match.ID.test(D[D.length-1])){J=d.find(D.shift(),e,A);e=J.expr?d.filter(J.expr,J.set)[0]:J.set[0]}if(e){J=G?{expr:D.pop(),set:l(G)}:d.find(D.pop(),D.length===1&&(D[0]==="~"||D[0]==="+")&&e.parentNode?e.parentNode:e,A);K=J.expr?d.filter(J.expr,J.set):J.set;if(D.length>0){N=l(K)}else{B=false}while(D.length){M=D.pop();L=M;if(!k.relative[M]){M=""}else{L=D.pop()}if(L==null){L=e}k.relative[M](N,L,A)}}else{N=D=[]}}if(!N){N=K}if(!N){d.error(M||C)}if(r.call(N)==="[object Array]"){if(!B){F.push.apply(F,N)}else{if(e&&e.nodeType===1){for(E=0;N[E]!=null;E++){if(N[E]&&(N[E]===true||N[E].nodeType===1&&d.contains(e,N[E]))){F.push(K[E])}}}else{for(E=0;N[E]!=null;E++){if(N[E]&&N[E].nodeType===1){F.push(K[E])}}}}}else{l(N,F)}if(y){d(y,I,F,G);d.uniqueSort(F)}return F};d.uniqueSort=function(y){if(p){h=g;y.sort(p);if(h){for(var e=1;e<y.length;e++){if(y[e]===y[e-1]){y.splice(e--,1)}}}}return y};d.matches=function(e,y){return d(e,null,null,y)};d.matchesSelector=function(e,y){return d(y,null,null,[e]).length>0};d.find=function(E,e,F){var D,z,B,A,C,y;if(!E){return[]}for(z=0,B=k.order.length;z<B;z++){C=k.order[z];if((A=k.leftMatch[C].exec(E))){y=A[1];A.splice(1,1);if(y.substr(y.length-1)!=="\\"){A[1]=(A[1]||"").replace(q,"");D=k.find[C](A,e,F);if(D!=null){E=E.replace(k.match[C],"");break}}}}if(!D){D=typeof e.getElementsByTagName!=="undefined"?e.getElementsByTagName("*"):[]}return{set:D,expr:E}};d.filter=function(I,H,L,B){var D,e,G,N,K,y,A,C,J,z=I,M=[],F=H,E=H&&H[0]&&d.isXML(H[0]);while(I&&H.length){for(G in k.filter){if((D=k.leftMatch[G].exec(I))!=null&&D[2]){y=k.filter[G];A=D[1];e=false;D.splice(1,1);if(A.substr(A.length-1)==="\\"){continue}if(F===M){M=[]}if(k.preFilter[G]){D=k.preFilter[G](D,F,L,M,B,E);if(!D){e=N=true}else{if(D===true){continue}}}if(D){for(C=0;(K=F[C])!=null;C++){if(K){N=y(K,D,C,F);J=B^N;if(L&&N!=null){if(J){e=true}else{F[C]=false}}else{if(J){M.push(K);e=true}}}}}if(N!==undefined){if(!L){F=M}I=I.replace(k.match[G],"");if(!e){return[]}break}}}if(I===z){if(e==null){d.error(I)}else{break}}z=I}return F};d.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};var b=d.getText=function(B){var z,A,e=B.nodeType,y="";if(e){if(e===1||e===9||e===11){if(typeof B.textContent==="string"){return B.textContent}else{if(typeof B.innerText==="string"){return B.innerText.replace(u,"")}else{for(B=B.firstChild;B;B=B.nextSibling){y+=b(B)}}}}else{if(e===3||e===4){return B.nodeValue}}}else{for(z=0;(A=B[z]);z++){if(A.nodeType!==8){y+=b(A)}}}return y};var k=d.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")},type:function(e){return e.getAttribute("type")}},relative:{"+":function(D,y){var A=typeof y==="string",C=A&&!w.test(y),E=A&&!C;if(C){y=y.toLowerCase()}for(var z=0,e=D.length,B;z<e;z++){if((B=D[z])){while((B=B.previousSibling)&&B.nodeType!==1){}D[z]=E||B&&B.nodeName.toLowerCase()===y?B||false:B===y}}if(E){d.filter(y,D,true)}},">":function(D,y){var C,B=typeof y==="string",z=0,e=D.length;if(B&&!w.test(y)){y=y.toLowerCase();for(;z<e;z++){C=D[z];if(C){var A=C.parentNode;D[z]=A.nodeName.toLowerCase()===y?A:false}}}else{for(;z<e;z++){C=D[z];if(C){D[z]=B?C.parentNode:C.parentNode===y}}if(B){d.filter(y,D,true)}}},"":function(A,y,C){var B,z=o++,e=t;if(typeof y==="string"&&!w.test(y)){y=y.toLowerCase();B=y;e=a}e("parentNode",y,z,A,B,C)},"~":function(A,y,C){var B,z=o++,e=t;if(typeof y==="string"&&!w.test(y)){y=y.toLowerCase();B=y;e=a}e("previousSibling",y,z,A,B,C)}},find:{ID:function(y,z,A){if(typeof z.getElementById!=="undefined"&&!A){var e=z.getElementById(y[1]);return e&&e.parentNode?[e]:[]}},NAME:function(z,C){if(typeof C.getElementsByName!=="undefined"){var y=[],B=C.getElementsByName(z[1]);for(var A=0,e=B.length;A<e;A++){if(B[A].getAttribute("name")===z[1]){y.push(B[A])}}return y.length===0?null:y}},TAG:function(e,y){if(typeof y.getElementsByTagName!=="undefined"){return y.getElementsByTagName(e[1])}}},preFilter:{CLASS:function(A,y,z,e,D,E){A=" "+A[1].replace(q,"")+" ";if(E){return A}for(var B=0,C;(C=y[B])!=null;B++){if(C){if(D^(C.className&&(" "+C.className+" ").replace(/[\t\n\r]/g," ").indexOf(A)>=0)){if(!z){e.push(C)}}else{if(z){y[B]=false}}}}return false},ID:function(e){return e[1].replace(q,"")},TAG:function(y,e){return y[1].replace(q,"").toLowerCase()},CHILD:function(e){if(e[1]==="nth"){if(!e[2]){d.error(e[0])}e[2]=e[2].replace(/^\+|\s*/g,"");var y=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(y[1]+(y[2]||1))-0;e[3]=y[3]-0}else{if(e[2]){d.error(e[0])}}e[0]=o++;return e},ATTR:function(B,y,z,e,C,D){var A=B[1]=B[1].replace(q,"");if(!D&&k.attrMap[A]){B[1]=k.attrMap[A]}B[4]=(B[4]||B[5]||"").replace(q,"");if(B[2]==="~="){B[4]=" "+B[4]+" "}return B},PSEUDO:function(B,y,z,e,C){if(B[1]==="not"){if((n.exec(B[3])||"").length>1||/^\w/.test(B[3])){B[3]=d(B[3],null,null,y)}else{var A=d.filter(B[3],y,z,true^C);if(!z){e.push.apply(e,A)}return false}}else{if(k.match.POS.test(B[0])||k.match.CHILD.test(B[0])){return true}}return B},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex}return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(z,y,e){return !!d(e[3],z).length},header:function(e){return(/h\d/i).test(e.nodeName)},text:function(z){var e=z.getAttribute("type"),y=z.type;return z.nodeName.toLowerCase()==="input"&&"text"===y&&(e===y||e===null)},radio:function(e){return e.nodeName.toLowerCase()==="input"&&"radio"===e.type},checkbox:function(e){return e.nodeName.toLowerCase()==="input"&&"checkbox"===e.type},file:function(e){return e.nodeName.toLowerCase()==="input"&&"file"===e.type},password:function(e){return e.nodeName.toLowerCase()==="input"&&"password"===e.type},submit:function(y){var e=y.nodeName.toLowerCase();return(e==="input"||e==="button")&&"submit"===y.type},image:function(e){return e.nodeName.toLowerCase()==="input"&&"image"===e.type},reset:function(y){var e=y.nodeName.toLowerCase();return(e==="input"||e==="button")&&"reset"===y.type},button:function(y){var e=y.nodeName.toLowerCase();return e==="input"&&"button"===y.type||e==="button"},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName)},focus:function(e){return e===e.ownerDocument.activeElement}},setFilters:{first:function(y,e){return e===0},last:function(z,y,e,A){return y===A.length-1},even:function(y,e){return e%2===0},odd:function(y,e){return e%2===1},lt:function(z,y,e){return y<e[3]-0},gt:function(z,y,e){return y>e[3]-0},nth:function(z,y,e){return e[3]-0===y},eq:function(z,y,e){return e[3]-0===y}},filter:{PSEUDO:function(z,E,D,F){var e=E[1],y=k.filters[e];if(y){return y(z,D,E,F)}else{if(e==="contains"){return(z.textContent||z.innerText||b([z])||"").indexOf(E[3])>=0}else{if(e==="not"){var A=E[3];for(var C=0,B=A.length;C<B;C++){if(A[C]===z){return false}}return true}else{d.error(e)}}}},CHILD:function(z,B){var A,H,D,G,e,C,F,E=B[1],y=z;switch(E){case"only":case"first":while((y=y.previousSibling)){if(y.nodeType===1){return false}}if(E==="first"){return true}y=z;case"last":while((y=y.nextSibling)){if(y.nodeType===1){return false}}return true;case"nth":A=B[2];H=B[3];if(A===1&&H===0){return true}D=B[0];G=z.parentNode;if(G&&(G[i]!==D||!z.nodeIndex)){C=0;for(y=G.firstChild;y;y=y.nextSibling){if(y.nodeType===1){y.nodeIndex=++C}}G[i]=D}F=z.nodeIndex-H;if(A===0){return F===0}else{return(F%A===0&&F/A>=0)}}},ID:function(y,e){return y.nodeType===1&&y.getAttribute("id")===e},TAG:function(y,e){return(e==="*"&&y.nodeType===1)||!!y.nodeName&&y.nodeName.toLowerCase()===e},CLASS:function(y,e){return(" "+(y.className||y.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(C,A){var z=A[1],e=d.attr?d.attr(C,z):k.attrHandle[z]?k.attrHandle[z](C):C[z]!=null?C[z]:C.getAttribute(z),D=e+"",B=A[2],y=A[4];return e==null?B==="!=":!B&&d.attr?e!=null:B==="="?D===y:B==="*="?D.indexOf(y)>=0:B==="~="?(" "+D+" ").indexOf(y)>=0:!y?D&&e!==false:B==="!="?D!==y:B==="^="?D.indexOf(y)===0:B==="$="?D.substr(D.length-y.length)===y:B==="|="?D===y||D.substr(0,y.length+1)===y+"-":false},POS:function(B,y,z,C){var e=y[2],A=k.setFilters[e];if(A){return A(B,z,y,C)}}}};var j=k.match.POS,c=function(y,e){return"\\"+(e-0+1)};for(var f in k.match){k.match[f]=new RegExp(k.match[f].source+(/(?![^\[]*\])(?![^\(]*\))/.source));k.leftMatch[f]=new RegExp(/(^(?:.|\r|\n)*?)/.source+k.match[f].source.replace(/\\(\d+)/g,c))}k.match.globalPOS=j;var l=function(y,e){y=Array.prototype.slice.call(y,0);if(e){e.push.apply(e,y);return e}return y};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(v){l=function(B,A){var z=0,y=A||[];if(r.call(B)==="[object Array]"){Array.prototype.push.apply(y,B)}else{if(typeof B.length==="number"){for(var e=B.length;z<e;z++){y.push(B[z])}}else{for(;B[z];z++){y.push(B[z])}}}return y}}var p,m;if(document.documentElement.compareDocumentPosition){p=function(y,e){if(y===e){h=true;return 0}if(!y.compareDocumentPosition||!e.compareDocumentPosition){return y.compareDocumentPosition?-1:1}return y.compareDocumentPosition(e)&4?-1:1}}else{p=function(F,E){if(F===E){h=true;return 0}else{if(F.sourceIndex&&E.sourceIndex){return F.sourceIndex-E.sourceIndex}}var C,y,z=[],e=[],B=F.parentNode,D=E.parentNode,G=B;if(B===D){return m(F,E)}else{if(!B){return -1}else{if(!D){return 1}}}while(G){z.unshift(G);G=G.parentNode}G=D;while(G){e.unshift(G);G=G.parentNode}C=z.length;y=e.length;for(var A=0;A<C&&A<y;A++){if(z[A]!==e[A]){return m(z[A],e[A])}}return A===C?m(F,e[A],-1):m(z[A],E,1)};m=function(y,e,z){if(y===e){return z}var A=y.nextSibling;while(A){if(A===e){return -1}A=A.nextSibling}return 1}}(function(){var y=document.createElement("div"),z="script"+(new Date()).getTime(),e=document.documentElement;y.innerHTML="<a name='"+z+"'/>";e.insertBefore(y,e.firstChild);if(document.getElementById(z)){k.find.ID=function(B,C,D){if(typeof C.getElementById!=="undefined"&&!D){var A=C.getElementById(B[1]);return A?A.id===B[1]||typeof A.getAttributeNode!=="undefined"&&A.getAttributeNode("id").nodeValue===B[1]?[A]:undefined:[]}};k.filter.ID=function(C,A){var B=typeof C.getAttributeNode!=="undefined"&&C.getAttributeNode("id");return C.nodeType===1&&B&&B.nodeValue===A}}e.removeChild(y);e=y=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){k.find.TAG=function(y,C){var B=C.getElementsByTagName(y[1]);if(y[1]==="*"){var A=[];for(var z=0;B[z];z++){if(B[z].nodeType===1){A.push(B[z])}}B=A}return B}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){k.attrHandle.href=function(y){return y.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var e=d,A=document.createElement("div"),z="__sizzle__";A.innerHTML="<p class='TEST'></p>";if(A.querySelectorAll&&A.querySelectorAll(".TEST").length===0){return}d=function(L,C,G,K){C=C||document;if(!K&&!d.isXML(C)){var J=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(L);if(J&&(C.nodeType===1||C.nodeType===9)){if(J[1]){return l(C.getElementsByTagName(L),G)}else{if(J[2]&&k.find.CLASS&&C.getElementsByClassName){return l(C.getElementsByClassName(J[2]),G)}}}if(C.nodeType===9){if(L==="body"&&C.body){return l([C.body],G)}else{if(J&&J[3]){var F=C.getElementById(J[3]);if(F&&F.parentNode){if(F.id===J[3]){return l([F],G)}}else{return l([],G)}}}try{return l(C.querySelectorAll(L),G)}catch(H){}}else{if(C.nodeType===1&&C.nodeName.toLowerCase()!=="object"){var D=C,E=C.getAttribute("id"),B=E||z,N=C.parentNode,M=/^\s*[+~]/.test(L);if(!E){C.setAttribute("id",B)}else{B=B.replace(/'/g,"\\$&")}if(M&&N){C=C.parentNode}try{if(!M||N){return l(C.querySelectorAll("[id='"+B+"'] "+L),G)}}catch(I){}finally{if(!E){D.removeAttribute("id")}}}}}return e(L,C,G,K)};for(var y in e){d[y]=e[y]}A=null})()}(function(){var e=document.documentElement,z=e.matchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.msMatchesSelector;if(z){var B=!z.call(document.createElement("div"),"div"),y=false;try{z.call(document.documentElement,"[test!='']:sizzle")}catch(A){y=true}d.matchesSelector=function(D,F){F=F.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!d.isXML(D)){try{if(y||!k.match.PSEUDO.test(F)&&!/!=/.test(F)){var C=z.call(D,F);if(C||!B||D.document&&D.document.nodeType!==11){return C}}}catch(E){}}return d(F,null,null,[D]).length>0}}})();(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}k.order.splice(1,0,"CLASS");k.find.CLASS=function(y,z,A){if(typeof z.getElementsByClassName!=="undefined"&&!A){return z.getElementsByClassName(y[1])}};e=null})();function a(y,D,C,G,E,F){for(var A=0,z=G.length;A<z;A++){var e=G[A];if(e){var B=false;e=e[y];while(e){if(e[i]===C){B=G[e.sizset];break}if(e.nodeType===1&&!F){e[i]=C;e.sizset=A}if(e.nodeName.toLowerCase()===D){B=e;break}e=e[y]}G[A]=B}}}function t(y,D,C,G,E,F){for(var A=0,z=G.length;A<z;A++){var e=G[A];if(e){var B=false;e=e[y];while(e){if(e[i]===C){B=G[e.sizset];break}if(e.nodeType===1){if(!F){e[i]=C;e.sizset=A}if(typeof D!=="string"){if(e===D){B=true;break}}else{if(d.filter(D,[e]).length>0){B=e;break}}}e=e[y]}G[A]=B}}}if(document.documentElement.contains){d.contains=function(y,e){return y!==e&&(y.contains?y.contains(e):true)}}else{if(document.documentElement.compareDocumentPosition){d.contains=function(y,e){return !!(y.compareDocumentPosition(e)&16)}}else{d.contains=function(){return false}}}d.isXML=function(e){var y=(e?e.ownerDocument||e:0).documentElement;return y?y.nodeName!=="HTML":false};var s=function(z,e,D){var C,E=[],B="",F=e.nodeType?[e]:e;while((C=k.match.PSEUDO.exec(z))){B+=C[0];z=z.replace(k.match.PSEUDO,"")}z=k.relative[z]?z+"*":z;for(var A=0,y=F.length;A<y;A++){d(z,F[A],E,D)}return d.filter(B,E)};window.Sizzle=d})();$n.brewser=function(){var d=navigator.userAgent.toLowerCase();var c={version:(d.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/)||[])[1],chrome:/chrome/.test(d),safari:/webkit/.test(d)&&!/chrome/.test(d),opera:/opera/.test(d),msie:/msie/.test(d)&&!/opera/.test(d),mozilla:/mozilla/.test(d)&&!/(compatible|webkit)/.test(d)};var b=null;var a=null;if(c.chrome){b="chrome";a=c.version}if(c.safari){b="safari";a=c.version}if(c.opera){b="opera";a=c.version}if(c.msie){b="msie";a=c.version}if(c.mozilla){b="mozilla";a=c.version}return({name:b,version:a})};$n.browser=$n.brewser;var chainingFunction=function(el){var me=this;if(el[0]){me.length=el.length}else{me.length=0}me.empty=function(){for(var i=0;i<me.length;i++){el[i].innerHTML=""}};me.remove=function(){for(var i=0;i<me.length;i++){naukriFrameWork(el[i]).parent().currObj().removeChild(el[i])}};me.submit=function(arg){for(var i=0;i<me.length;i++){if(arg||typeof arg=="function"){el[0].onsubmit=arg}else{if(el[0].onsubmit()){el[0].submit()}}}};me.click=function(arg){for(var i=0;i<me.length;i++){if(arg||typeof arg=="function"){el[i].onclick=arg}else{if(el[i].onclick()){el[i].click()}}}return me};me.mouseover=function(arg){for(var i=0;i<me.length;i++){if(arg||typeof arg=="function"){el[i].onmouseover=arg}else{if(el[i].onmouseover()){el[i].mouseover()}}}return me};me.mouseout=function(arg){for(var i=0;i<me.length;i++){if(arg||typeof arg=="function"){el[0].onmouseout=arg}else{if(el[0].onmouseout()){el[0].mouseout()}}}return me};me.siblings=function(){var arr=[];for(var i=0;i<me.length;i++){var currObj=$n(el[i]),prev=currObj.prev(),next=currObj.next();if(next){while(next){arr.push(next.currObj());next=next.next()}}if(prev){while(prev){arr.push(prev.currObj());prev=prev.prev()}}}return naukriFrameWork(arr)};me.show=function(){for(var i=0;i<me.length;i++){if(me.getStyle(el[i],"display")=="none"){el[i].style.display="";el[i].setAttribute("display"," ")}if(me.attr("display")||me.attr("display")==""){getStyle=me.attr("display")}else{getStyle=me.getStyle(el[i],"display");me.attr("display",getStyle)}el[i].style.display=(getStyle=="")?"":((getStyle!="inline")?"block":"inline")}return me};me.hide=function(){for(var i=0;i<me.length;i++){if(me.attr("display")){getStyle=me.attr("display")}else{getStyle=me.getStyle(el[i],"display");me.attr("display",getStyle)}el[i].style.display="none"}return me};me.text=function(){for(var i=0;i<me.length;i++){var html=me.eq(i).html();var reEx=/(\<(\/?[^\>]+)\>)/gi;html=html.replace(reEx,"");return html}return me};me.getStyle=function(obj,styleProp){if(obj.currentStyle){var y=obj.currentStyle[styleProp]}else{if(window.getComputedStyle){var y=document.defaultView.getComputedStyle(obj,null).getPropertyValue(styleProp)}}return y};me.currObj=function(o){for(var i=0;i<me.length;i++){return(o)?el[o]:el[0]}};me.ev=function(o){return(document.all)?window.event:o};me.first=function(){if(el[0]){var elem=el[0].firstChild;return naukriFrameWork((elem&&elem.nodeType!=1)?elem.nextSibling:elem)}return me};me.last=function(){if(el[0]){var elem=el[0].lastChild;return naukriFrameWork((elem&&elem.nodeType!=1)?elem.previousSibling:elem)}return me};me.toggletext=function(textOne,textTwo){for(var i=0;i<me.length;i++){el[i].innerHTML==textOne?el[i].innerHTML=textTwo:el[i].innerHTML=textOne}return me};me.toggle=function(){for(var i=0;i<me.length;i++){if(me.getStyle(el[i],"display")!="none"){if(!me.attr("display")){getStyle=me.getStyle(el[i],"display");me.attr("display",getStyle)}el[i].style.display="none"}else{if(me.getStyle(el[i],"display")=="none"){el[i].style.display="";el[i].setAttribute("display","")}if(me.attr("display")||me.attr("display")==""){getStyle=me.attr("display")}else{getStyle=me.getStyle(el[i],"display");me.attr("display",getStyle)}el[i].style.display=(getStyle=="")?"":((getStyle!="inline")?"block":"inline")}}return me};me.html=function(text){for(var i=0;i<me.length;i++){if(typeof text!="undefined"){el[i].innerHTML=text}else{return el[i].innerHTML}}return me};me.parent=function(){for(var i=0;i<me.length;i++){return naukriFrameWork(el[i].parentNode)}};me.childrens=function(type){var children1=new Array();for(var i=0;i<me.length;i++){var a=Sizzle(type,el[i]);if(!a.length){a=el[i].getElementsByTagName(type||"*")}for(var x=0;x<a.length;x++){children1.push(a[x])}}return naukriFrameWork(children1)};me.childs=function(selec){for(var i=0;i<me.length;i++){if(selec){return(naukriFrameWork(el[i].nodeName+" "+selec))}else{var childrens=el[i].getElementsByTagName("*");var childEle=[];for(var k=0;k<childrens.length;k++){if(!childEle[childrens[k].nodeName]){childEle[childrens[k].nodeName]=naukriFrameWork(childrens[k])}}return childEle}}};me.changeClass=function(classN){for(var i=0;i<me.length;i++){el[i].className=classN}return me};me.reg=function(c){return new RegExp("(\\b)"+c+"(\\b)","gi")};me.hasClass=function(){if(!arguments[1]){return el[0].className.match(me.reg(arguments[0]))}else{return arguments[0].className.match(me.reg(arguments[1]))}};me.removeClass=function(classO){for(var i=0;i<me.length;i++){if(me.hasClass(el[i],classO)){el[i].className=el[i].className.replace(me.reg(classO)," ")}}return me};me.addClass=function(classO){for(var i=0;i<me.length;i++){el[i].className+=" "+classO}return me};me.replaceClass=function(classO,classN){for(var i=0;i<me.length;i++){if(me.hasClass(el[i],classO)){el[i].className=el[i].className.replace(me.reg(classO),classN)}}};me.eq=function(val){if(el[val]){var a=val===-1?el.slice(val):el.slice(val,val+1);return naukriFrameWork(a[0])}return me};me.toggleClass=function(classO,classN){for(var i=0;i<me.length;i++){if(classN){if(me.hasClass(el[i],classO)){el[i].className=el[i].className.replace(me.reg(classO),classN)}else{if(me.hasClass(el[i],classN)){el[i].className=el[i].className.replace(me.reg(classN),classO)}}}else{if(me.hasClass(el[i],classO)){me.removeClass(classO)}else{me.addClass(classO)}}}return me};me.checkAll=function(){for(var i=0;i<me.length;i++){if(el[i].type=="checkbox"){el[i].checked=true}}return me};me.isChecked=function(){if(el[0].type=="checkbox"||el[0].type=="radio"){return el[0].checked}};me.uncheckAll=function(){for(var i=0;i<me.length;i++){if(el[i].type=="checkbox"&&el[i].checked==true){el[i].checked=false}}return me};me.width=function(){for(var i=0;i<me.length;i++){return el[0].offsetWidth}};me.height=function(){for(var i=0;i<me.length;i++){return el[0].offsetHeight}};me.position=function(){for(var i=0;i<me.length;i++){var el1=el[0];var pL=0,pT=0;while(el1){pT+=el1.offsetTop;pL+=el1.offsetLeft;el1=el1.offsetParent}return{left:pL,top:pT}}};me.offLeft=function(){for(var i=0;i<me.length;i++){return el[0].offsetLeft}};me.offTop=function(){for(var i=0;i<me.length;i++){return el[0].offsetTop}};me.innerwidth=function(){var innerW=0;if(document.body&&document.body.offsetWidth){innerW=document.body.offsetWidth}if(document.compatMode=="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth){innerW=document.documentElement.offsetWidth}if(window.innerWidth&&window.innerHeight){innerW=window.innerWidth}return innerW};me.innerheight=function(){var innerH=0;if(document.body&&document.body.offsetWidth){innerH=document.body.offsetHeight}if(document.compatMode=="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth){innerH=document.documentElement.offsetHeight}if(window.innerWidth&&window.innerHeight){innerH=window.innerHeight}return innerH};me.css=function(){for(var i=0;i<me.length;i++){for(x in arguments[0]){el[i].style[x]=arguments[0][x]}}return me};me.getCss=function(x){for(var i=0;i<me.length;i++){return el[0].style[x]}};me.clone=function(){for(var i=0;i<me.length;i++){var state=(typeof arguments[0]=="undefined")?true:arguments[0];return el[0].cloneNode(state)}};me.append=function(child){for(var i=0;i<me.length;i++){if((typeof child).toLowerCase()=="string"){el[i].innerHTML+=child}else{el[i].appendChild(me.getObj(child))}}return me};me.prepend=function(child){for(var i=0;i<me.length;i++){el[i].insertBefore(me.getObj(child),naukriFrameWork(el[i]).first())}return me};me.getObj=function(child){if((typeof child).toLowerCase()=="string"){child=document.createTextNode(child)}else{if((child.toString()).toLowerCase()=="[object object]"){child=child.currObj()}else{if((typeof child).toLowerCase()=="object"){child=child}}}if(el.length>1){return child.cloneNode(true)}else{return child}};me.each=function(callback,args,object){if(!object){object=this}var name,i=0,length=object.length,isObj=length===(undefined||typeof object=="function");if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break}}}else{for(;i<length;){if(callback.call(el[i],i,el[i++])===false){break}}}}return me};me.appendTo=function(parent1){for(var i=0;i<me.length;i++){me.getParentObj(parent1).appendChild(el[i])}return me};me.getParentObj=function(parent1){if((typeof parent1).toLowerCase()=="string"){parent1=naukriFrameWork(parent1).currObj()}else{if((parent1.toString()).toLowerCase()=="[object object]"){parent1=parent1.currObj()}else{if((typeof parent1).toLowerCase()=="object"){parent1=parent1}}}return parent1};me.ieFix={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"};me.attr=function(){if(arguments.length==0){return me}for(var i=0;i<el.length;i++){if(typeof arguments[0]=="string"){for(var y in me.ieFix){arguments[0]=(arguments[0]==y)?me.ieFix[y]:arguments[0]}if(arguments.length==1){(el[i].getAttribute(arguments[0])!=null)?(el[i].getAttribute(arguments[0])):(el[i].setAttribute(arguments[0],""));return(arguments[0].toLowerCase()=="value")?eval("el[i]."+arguments[0]):el[i][arguments[0]]}else{if(arguments.length==2){return(arguments[0].toLowerCase()=="value")?eval("el[i]."+arguments[0]+'="'+arguments[1]+'"'):el[i].setAttribute(arguments[0],arguments[1])}}}else{if(arguments[0].constructor==Object){var att=[],val=[];for(var x in arguments[0]){att.push(x);val.push(arguments[0][x])}for(var k=0;k<att.length;k++){for(var y in me.ieFix){att[k]=(att[k]==y)?me.ieFix[y]:att[k]}el[i][att[k]]=val[k]}}}}return me};me.setFocus=function(){if(el[0]){el[0].focus()}};me.val=function(){if(typeof arguments[0]!="undefined"){for(var i=0;i<el.length;i++){el[i].value=arguments[0]}}else{if(el[0]){return el[0].value}}return me};me.parents=function(){var pr=new Array();for(var i=0;i<me.length;i++){pr.push(el[i].parentNode)}return naukriFrameWork(pr)};me.addEvent=function(eventName,fn){for(var i=0;i<me.length;i++){window.attachEvent?el[i].attachEvent("on"+eventName,fn):el[i].addEventListener(eventName,fn,false)}return me};me.removeEvent=function(eventName,fn){for(var i=0;i<me.length;i++){if(fn){window.detachEvent?el[i].detachEvent("on"+eventName,fn):el[i].removeEventListener(eventName,fn,false)}}return me};me.prev=function(){if(el[0]){var elem=el[0].previousSibling;return naukriFrameWork((elem&&elem.nodeType!=1)?elem.previousSibling:elem)}return me};me.next=function(){if(el[0]){var elem=el[0].nextSibling;return naukriFrameWork((elem&&elem.nodeType!=1)?elem.nextSibling:elem)}return me};var currApp=(navigator.appName=="Netscape")?true:false;me.slideUp=function(){var sstyle=0;for(var i=0;i<me.length;i++){var padT=parseInt(me.eq(i).getStyle(me.eq(i).currObj(),(currApp?"padding-top":"paddingTop")));padT+=parseInt(me.eq(i).getStyle(me.eq(i).currObj(),(currApp?"padding-bottom":"paddingBottom")));var offH=(me.eq(i).height())-(padT+2);sstyle=offH;if(offH>0){var t=setInterval(function(){offH-=5;me.eq(i).css({height:offH+"px",overflow:"hidden"});if(offH<5){clearInterval(t);me.eq(i).css({height:sstyle+"px"});me.eq(i).hide()}},arguments[0]||1)}}};me.slideDown=function(){var x=0;for(var i=0;i<me.length;i++){me.eq(i).show();var padT=parseInt(me.eq(i).getStyle(me.eq(i).currObj(),(currApp?"padding-top":"paddingTop")));padT+=parseInt(me.eq(i).getStyle(me.eq(i).currObj(),(currApp?"padding-bottom":"paddingBottom")));var offH=(me.eq(i).height())-(padT+2);me.eq(i).css({height:x+"px",overflow:"hidden"});if(offH>x){var t=setInterval(function(){x+=5;me.eq(i).css({height:x+"px",overflow:"hidden"});if(x==offH||x>=offH){clearInterval(t);me.eq(i).show()}},arguments[0]||1)}}};me.slideToggle=function(){var para=arguments[0]||null;for(var i=0;i<me.length;i++){var elH=me.eq(i).height();(elH==0||elH<1)?me.eq(i).slideDown(para):me.eq(i).slideUp(para)}};me.fadeOut=function(){var value=10;var t=(arguments[0]&&arguments[0]>50&&arguments[0]<500)?arguments[0]:50;for(var i=0;i<me.length;i++){var padT=me.eq(i).getStyle(me.eq(i).currObj(),"display");if(padT=="none"){return""}if(value>0){var t=setInterval(function(){value--;if(currApp){me.eq(i).css({opacity:value/10})}else{me.eq(i).css({filter:"alpha(opacity="+value*10+")",zoom:1})}if(value==0||value<0){clearInterval(t);me.eq(i).hide()}},t)}}return me};me.fadeIn=function(){var value=0;var t=(arguments[0]&&arguments[0]>50&&arguments[0]<500)?arguments[0]:50;for(var i=0;i<me.length;i++){var padT=me.eq(i).getStyle(me.eq(i).currObj(),"display");if(padT=="block"){return""}if(value<10){var t=setInterval(function(){value++;if(currApp){me.eq(i).css({opacity:value/10})}else{me.eq(i).css({filter:"alpha(opacity="+value*10+")",zoom:1})}me.eq(i).show();if(value==10||value>10){clearInterval(t);me.eq(i).show()}},t)}}return me};me.removeAttr=function(a){var attr=a;if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var ieversion=new Number(RegExp.$1);if(ieversion<=7){attr=(me.ieFix[a])?me.ieFix[a]:a}}for(var i=0;i<me.length;i++){me.eq(i).currObj().removeAttribute(attr)}};me.ready=function(i){var u=navigator.userAgent.toLowerCase();var ie=
/*@cc_on!@*/
false;if((/mozilla/.test(u)&&!/(compatible)/.test(u))||(/opera/.test(u))){el.addEventListener("DOMContentLoaded",i,false)}else{if(/webkit/.test(u)){timeout=setTimeout(function(){if(el.readyState=="loaded"||el.readyState=="complete"){i()}else{setTimeout(arguments.callee,10)}},10)}else{if(ie){(function(){var tempNode=el.createElement("document:ready");try{tempNode.doScroll("left");i();tempNode=null}catch(e){setTimeout(arguments.callee,0)}})()}else{window.onload=i}}}};return me};$n.fn=chainingFunction.prototype;chainingFunction.prototype.ajaxReq=function(param){var xhr=null;this.createXHR=function(){(window.XMLHttpRequest)?xhr=new XMLHttpRequest():xhr=new ActiveXObject("Microsoft.XMLHTTP");return xhr};var type=param.type;var async=param.async;var datatype=param.datatype;var data=param.data;var url=param.url;var success=param.success;var error=param.error;if(!url){alert("URL not specified");return false}if(!success){alert("Success not specified");return false}if(!type||type=="get"){type="get";if(data){url+="?"+data;data=""}else{data=""}}if(!async){async="true"}if(!datatype){datatype="text"}if(!error){error=function(){}}this.createXHR();xhr.open(type.toUpperCase(),url,async.toLowerCase());xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xhr.onreadystatechange=function(){if(xhr.readyState==4&&xhr.status==200){switch(datatype.toLowerCase()){case"text":success(xhr.responseText);break;case"xml":success(xhr.responseXML);break;case"json":success(eval("("+xhr.responseText+")"));break;default:alert("Please correct your data type (i.e. text, xml or json)");break}}else{if(xhr.readyState==4&&xhr.status==404){error()}}};xhr.send(data)};$n.trim=function(b,a){return $n.ltrim($n.rtrim(b,a),a)};$n.ltrim=function(b,a){a=a||"\\s";return b.replace(new RegExp("^["+a+"]+","g"),"")};$n.rtrim=function(b,a){a=a||"\\s";return b.replace(new RegExp("["+a+"]+$","g"),"")};$n.preventDefault=function(a){a=(!a)?window.event:a;if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}};$n.stopPropagation=function(a){a=(!a)?window.event:a;if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}};