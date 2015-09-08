ipjUA=navigator.userAgent;
ipjIsIE = (navigator.appName == "Microsoft Internet Explorer" || ipjUA.indexOf('Trident/') != -1);
ipjIsIE5 = ipjIsIE && (ipjUA.indexOf('MSIE 5') != -1);
ipjIsIE6 = ipjIsIE && (ipjUA.indexOf('MSIE 6') != -1);
ipjIsIE5_0 = ipjIsIE && (ipjUA.indexOf('MSIE 5.0') != -1);
ipjIsIE7 = ipjIsIE && (ipjUA.indexOf('MSIE 7') != -1);
ipjIsIE8 = ipjIsIE && (ipjUA.indexOf('MSIE 8') != -1);
ipjIsIE9 = ipjIsIE && (ipjUA.indexOf('MSIE 9') != -1);
ipjIsIE10 = ipjIsIE && (ipjUA.indexOf('MSIE 10') != -1);
ipjIsIE11 = ipjIsIE && (ipjUA.indexOf('Trident/7') != -1);
ipjIsGecko = ipjUA.indexOf('Gecko') != -1; // Will also be true on Safari and IE11
ipjIsSafari = ipjUA.indexOf('Safari') != -1;
ipjIsOpera = window['opera'] && opera.buildNumber ? true : false;
ipjIsMac = ipjUA.indexOf('Mac') != -1;
ipjIsNS7 = ipjUA.indexOf('Netscape/7') != -1;
ipjIsNS71 = ipjUA.indexOf('Netscape/7.1') != -1;
ipjIsFF = ipjUA.indexOf('Firefox') != -1;
ipjIsFF3OrGreater = (ipjIsFF && ipjUA.indexOf('Firefox/2.') == -1);
ipjIsChrome = ipjUA.indexOf('Chrome') != -1;
ipjIsSafari = ipjUA.indexOf('Safari') != -1;
ipjIsiPad = ipjUA.indexOf('iPad') != -1;
ipjIsiPhone = ipjUA.indexOf('iPhone') != -1;
ipjIsiOS=(ipjIsiPad||ipjIsiPhone);
ipjiOSVer=getiOSMajorVersion();
ipjIsAndroid=ipjUA.indexOf('Android') != -1;
ipjIsMobile=(ipjIsiOS||ipjIsAndroid);
if(ipjIsChrome){
ipjIsSafari=false;
}
/*
var BrowserDetect={
init: function (){
this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
this.version=this.searchVersion(navigator.userAgent)
|| this.searchVersion(navigator.appVersion)
|| "an unknown version";
this.OS = this.searchString(this.dataOS) || "an unknown OS";
},
searchString: function (data){
for (var i=0;i<data.length;i++){
var dataString=data[i].string;
var dataProp=data[i].prop;
this.versionSearchString=data[i].versionSearch || data[i].identity;
if (dataString){
if (dataString.indexOf(data[i].subString) !=-1)
return data[i].identity;
}
else if (dataProp)
return data[i].identity;
}
},
searchVersion: function (dataString){
var index=dataString.indexOf(this.versionSearchString);
if (index==-1) return;
return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
},
dataBrowser: [
{
string: navigator.userAgent,
subString: "Chrome",
identity: "Chrome"
},
{string: navigator.userAgent,
subString: "OmniWeb",
versionSearch: "OmniWeb/",
identity: "OmniWeb"
},
{
string: navigator.vendor,
subString: "Apple",
identity: "Safari",
versionSearch: "Version"
},
{
prop: window.opera,
identity: "Opera",
versionSearch: "Version"
},
{
string: navigator.vendor,
subString: "iCab",
identity: "iCab"
},
{
string: navigator.vendor,
subString: "KDE",
identity: "Konqueror"
},
{
string: navigator.userAgent,
subString: "Firefox",
identity: "Firefox"
},
{
string: navigator.vendor,
subString: "Camino",
identity: "Camino"
},
{
string: navigator.userAgent,
subString: "Netscape",
identity: "Netscape"
},
{
string: navigator.userAgent,
subString: "MSIE",
identity: "Explorer",
versionSearch: "MSIE"
},
{
string: navigator.userAgent,
subString: "Gecko",
identity: "Mozilla",
versionSearch: "rv"
},
{
string: navigator.userAgent,
subString: "Mozilla",
identity: "Netscape",
versionSearch: "Mozilla"
}
],
dataOS : [
{
string: navigator.platform,
subString: "Win",
identity: "Windows"
},
{
string: navigator.platform,
subString: "Mac",
identity: "Mac"
},
{
string: navigator.userAgent,
subString: "iPhone",
identity: "iPhone/iPod"
},
{
string: navigator.platform,
subString: "Linux",
identity: "Linux"
}
]
};
BrowserDetect.init();
function ipjCheckBrowser()
{
var blnWarn=false;
if (ipjIsIE && BrowserDetect.version<8)
{
blnWarn=true;
}
else if (ipjIsFF && BrowserDetect.version<5)
{
blnWarn=true;
}
else if (!ipjIsIE && !ipjIsFF)
{
blnWarn=true;
}
if (blnWarn)
{
var objSpan = document.createElement('span');
var objBreak = document.createElement('br');
objSpan.setAttribute('style', 'margin: 6px 6px 6px 6px;font:bold 12px Tahoma, Arial, Verdana, Helvetica, sans-serif;vertical-align:middle;text-align:center;');
objSpan.innerHTML = 'WARNING: Your current browser is not supported in administrative mode.';
document.getElementById('ipb-AdminToolbarPageView').appendChild(objSpan);
document.getElementById('ipb-AdminToolbarPageView').appendChild(objBreak);
}
}
*/
function ipjIsTouchDevice(){
var b=false;
if(ipjIsiOS||ipjIsAndroid){
b=true;
}else{
b=ipjIsEventSupported('touchstart');
}
return b;
}
function ipjIsEventSupported(eventName){
var b=false;
var TAGNAMES={'select':'input','change':'input','submit':'form','reset':'form','error':'img','load':'img','abort':'img'};
try{
var el=document.createElement(TAGNAMES[eventName]||'div');
eventName='on'+eventName;
b=(eventName in el);
if(!b){
el.setAttribute(eventName,'return;');
b=typeof el[eventName]=='function';
}
}catch(e){
}finally{
el=null;
}
return b;
}
function ipjBrowserSupportsFixedPositioning(){
var b=true;
if(ipjIsiOS&&(ipjiOSVer<5)){
b=false;
}
return b;
}
function getiOSVersion(){
var ver="0";
try{
if(ipjIsiOS){
var i=ipjUA.indexOf(" OS ");
var s=ipjUA.substring(i);
ver=s.split(' ')[2].replace(/_/g,'.');
}
}catch(e){}
return ver;
}
function getiOSMajorVersion(){
var ver=getiOSVersion();
var i=ver.indexOf(".");
if(i>0){
ver=ver.substring(0,i);
}
return new Number(ver);
}
function getFireFoxVersion(){
var ffver=0;
try{
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
ffver=new Number(RegExp.$1)
}
}catch(e){}
return ffver;
}
function getIEVersion(){
var iever=0;
try{
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
iever=new Number(RegExp.$1)
}
}catch(e){}
return iever;
}
var ipjPageSiteID=-1;
var ipjPageSiteGroupID=-1;
function ipjCreateCookie(name,value,days){
if (days){
var date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}
function ipjReadCookie(name){
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i<ca.length;i++){
var c=ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
}
return null;
}
function ipjEraseCookie(name){
ipjCreateCookie(name,"",-1);
}
function ipjAddEvent(obj, evType, fn){
if (obj.addEventListener){
obj.addEventListener(evType, fn, false);
return true;
}
else{
if (obj.attachEvent){
var r = obj.attachEvent("on"+evType, fn);
return r;
}
else return false;
}
}
function ipjCancelEvent(event){
if (window.event && window.event.cancelBubble !==null) window.event.cancelBubble=true;
else if (event!=null && event.stopPropagation) event.stopPropagation();
}
function ipjPageHeight(){
if (window.innerHeight!=window.undefined) return window.innerHeight;
if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
if (document.body) return document.body.clientHeight;
return 0;
}
function ipjPageWidth(){
if (window.innerWidth!=window.undefined) return window.innerWidth;
if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
if (document.body) return document.body.clientWidth;
return 0;
}
function ipjPageScrollTop(){
if (self.pageYOffset) return self.pageYOffset;
if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
if (document.body) return document.body.scrollTop;
return 0;
}
function ipjPageScrollLeft(){
if (self.pageXOffset) return self.pageXOffset;
if (document.documentElement && document.documentElement.scrollLeft) return document.documentElement.scrollLeft;
if (document.body) return document.body.scrollLeft;
return 0;
}
function ipjFindAbsoluteTop(obj){
var curtop=0;
if (obj.offsetParent){
do{
curtop+=obj.offsetTop;
}while (obj=obj.offsetParent);
}
return curtop;
}
function ipjGetStyle(el, cssprop){
if (el.currentStyle)
return el.currentStyle[cssprop]
else if (document.defaultView && document.defaultView.getComputedStyle)
return document.defaultView.getComputedStyle(el, "")[cssprop]
else
return el.style[cssprop]
}
if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement) {
HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode)
{
switch (where){
case 'beforeBegin':
this.parentNode.insertBefore(parsedNode,this)
break;
case 'afterBegin':
this.insertBefore(parsedNode,this.firstChild);
break;
case 'beforeEnd':
this.appendChild(parsedNode);
break;
case 'afterEnd':
if (this.nextSibling)
this.parentNode.insertBefore(parsedNode,this.nextSibling);
else this.parentNode.appendChild(parsedNode);
break;
}
}
HTMLElement.prototype.insertAdjacentHTML=function(where,htmlStr)
{
var r=this.ownerDocument.createRange();
r.setStartBefore(this);
var parsedHTML=r.createContextualFragment(htmlStr);
this.insertAdjacentElement(where,parsedHTML)
}
HTMLElement.prototype.insertAdjacentText=function(where,txtStr)
{
var parsedText=document.createTextNode(txtStr)
this.insertAdjacentElement(where,parsedText)
}
}
function ipjSetElementInnerHTMLGecko(element,htmlStr)
{
var range=element.ownerDocument.createRange();
range.selectNodeContents(element);
range.deleteContents();
var newFragment=range.createContextualFragment(htmlStr);
element.appendChild(newFragment);
};
function ipjGetElementOuterHTMLGecko(element)
{
if (element.outerHTML) return element.outerHTML;
var range=document.createRange();
range.selectNode(element);
var span = document.createElement("span");
range.surroundContents(span);
var strOuterHtml=span.innerHTML;
range.selectNode(span);
range.extractContents();
range.insertNode(element);
return strOuterHtml;
};
function ipjGetHtmlTextOfRangeGecko(range)
{
var clonedSelection=range.cloneContents();
var div = document.createElement('div');
div.appendChild(clonedSelection);
return div.innerHTML;
}
function ipjValidateRegEx(objTextbox, objSpan, strRegEx, intRequired, isRevMatch)
{
var b=false;
var s=objTextbox.value;
if (iTrim(s) == '') {
b=(intRequired==1);
}
else{
if (iTrim(strRegEx) != '') {
var rx=new RegExp(strRegEx);
var matches=rx.exec(s);
if (isRevMatch=='True')
{
b=(matches==null);
}
else
{
b=(matches !=null);
}
}
}
if (b){
iSetElementVis(objSpan, 1)
}
else{
iSetElementVis(objSpan, 0)
}
};
function ipjIsValidPhone(s){
var rePhone=/^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
if(rePhone.test(s)){
return s.replace(rePhone, "($1) $2-$3");
}else{
rePhone=/^(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
if(rePhone.test(s)){
return s.replace(rePhone, "$2-$3");
}else{
return null;
}
}
}
function ipjIsValidURL(value){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}
function ipjIsValidSiteAddress(value){
var regexp=(/^HTTP|HTTP|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/);
return regexp.test(value);
}
function ipjFindObj(n, d){
if(n==null) return n;
var p,i,x;
if(!d) d=document;
if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
}
if(!(x=d[n])&&d.all) x=d.all[n];
for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=ipjFindObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n);
return x;
}
function ipjJumpMenu(targ,selObj,restore){
eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
if (restore) selObj.selectedIndex=0;
}
function iSetElementVis(elementName, intVis)
{
var element=ipjFindObj(elementName);
if (element){
switch(intVis){
case 0:
element.style.visibility = "hidden";
break;
case 1:
element.style.visibility = "visible";
break;
case 2:
if (element.style.visibility == "hidden") {
element.style.visibility = "visible";
}
else{
element.style.visibility = "hidden";
}
}
}
};
function ipjShowFirstHideSecond (elementName1, elementName2)
{
var element1=ipjFindObj(elementName1);
var element2=ipjFindObj(elementName2);
if ((element1) && (element2)){
element1.style.display = "inline";
element2.style.display = "none";
}
};
function ipjEnableFirstDisableSecond (elementName1, elementName2)
{
var element1=ipjFindObj(elementName1);
var element2=ipjFindObj(elementName2);
if ((element1) && (element2)){
element1.disabled=false;
element2.disabled=true;
}
};
function ipjConditionalSetEnable(checkBoxName,elementName)
{
var element1=ipjFindObj(elementName);
var checkbox1=ipjFindObj(checkBoxName)
if ((element1) && (checkbox1)){
element1.disabled=!checkbox1.checked;
}
};
function ipjEnable(elementName)
{
var element1=ipjFindObj(elementName);
if (element1)
{
element1.disabled=false;
}
};
function ipjDisable(elementName)
{
var element1=ipjFindObj(elementName);
if (element1)
{
element1.disabled=true;
}
};
function ipjDisableAndUncheck(elementName,elementNameToCheck){
var el=ipjFindObj(elementName);
if(el){
el.disabled=true;
el.checked=false;
}
el=ipjFindObj(elementNameToCheck);
if(el){
el.checked=true;
}
}
function ipjShowDiv(divName)
{
var element1=ipjFindObj(divName);
if (element1)
{
iSetElementVis(divName, 1);
}
};
function ipjHideDiv(divName)
{
var element1=ipjFindObj(divName);
if (element1)
{
iSetElementVis(divName, 0);
}
};
function ipjToggleDivWithImageID(imageId,divId){
ipjToggleDivWithImage(ipjFindObj(imageId),divId);
}
function ipjToggleDivWithImage(image,divId){
ipjToggleDivWithImageAndDiv(image,ipjFindObj(divId),divId);
}
function ipjToggleDivWithImageAndDiv(image,div,divId,displayStyle){
if(div){
if(!divId)divId=div.id;
if(displayStyle==null)displayStyle='inline';
if(div.style.visibility=='visible')
{
ipjHideDiv(divId);
div.style.display='none';
var objRegEx = new RegExp("control_contract.gif");
image.src = image.src.replace(objRegEx, "control_expand.gif");
return false;
}
else
{
ipjShowDiv(divId);
div.style.display=displayStyle;
var objRegEx = new RegExp("control_expand.gif");
image.src = image.src.replace(objRegEx, "control_contract.gif");
return true;
}
}
}
function ipjTrim(s){
return iTrim(s);
}
function iTrim(str)
{
var x=str;
x=x.replace(/^\s*(.*)/, "$1");
x=x.replace(/(.*?)\s*$/, "$1");
return x;
};
function iTrimChar(str, c)
{
if ((str !=null) && (str !=undefined)){
while (str.substring(0, 1)==c){
str=str.substring(1, str.length);
}
while (str.substring(str.length-1, 1)==c){
str=str.substring(0, str.length-1);
}
}
return str;
};
function ipjMakeSafe(str,trim){
if(str&&(str.length>0)){
var div=document.createElement('div');
div.innerHTML=str;
var scripts=div.getElementsByTagName('script');
var i=scripts.length;
while(i--){
scripts[i].parentNode.removeChild(scripts[i]);
}
return (trim?ipjTrim(div.innerHTML):div.innerHTML);
}
return "";
}
function ipjFocusElement(formName, elemName, doSelect)
{
if (document.forms[formName][elemName] !=null){
var elem=document.forms[formName].elements[elemName];
elem.focus();
if (doSelect){
elem.select();
}
}
};
function iAppendVirtualPath(path1, path2)
{
path1=iTrim(path1);
path2=iTrim(path2);
path1 = iTrimChar(path1, "/");
path2 = iTrimChar(path2, "/");
if ((path1.length>0) && (path2.length>0)){
return "/" + path1 + "/" + path2;
}
if (path1.length>0){
return "/" + path1;
}
if (path2.length>0){
return "/" + path2;
}
};
String.prototype.endsWith=function(sEnd)
{
return (this.substr(this.length-sEnd.length)==sEnd);
};
String.prototype.startsWith=function(sStart)
{
return (this.substr(0,sStart.length)==sStart);
};
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); }; // String.prototype.trim
String.prototype.toCharArray=function()
{
var arrRet=new Array();
for(var i=0;i<this.length;i++){
arrRet.push(this.substr(i,1));
}
return arrRet;
};
String.prototype.reverse=function()
{
var a=new Array();
for(var i=0;i<this.length;i++){
a.push(this.substr(i,1));
}
return a.reverse().join("");
}
function ipjStringFormat(){
var s=arguments[0];
for(var i=0;i<arguments.length-1;i++){
var reg=new RegExp("\\{"+i+"\\}","gm");
s=s.replace(reg,arguments[i+1]);
}
return s;
}
function stringFormat(){
return ipjStringFormat.apply(this, arguments);
}
function ipjIsNumber(n){
return (!isNaN(parseFloat(n))&&isFinite(n));
}
function isNumber(n){
return ipjIsNumber(n);
}
var iDivUpdateLast=(new Date()).getTime();
function ipjDivUpdate(elemName, msg)
{
msg=unescape(msg);
if ((new Date()).getTime()>iDivUpdateLast+1000){
var div=ipjFindObj(elemName);
div.innerHTML+=msg;
window.scrollTo(0,document.body.scrollHeight);
iDivUpdateLast=(new Date()).getTime();
}
};
function ipjRadioSelect(rbId)
{
var rb=ipjFindObj(rbId);
rb.checked=true;
};
function ipjClearDefaultAndCSS(el)
{
if (el){
if (el.defaultValue==el.value) el.value = ""
}
};
function ipjClearValue(el)
{
if (el)  el.value = "";
};
function ipjClearValueByID(elID)
{
ipjClearValue(document.getElementById(elID));
};
function ipjClearControlsValue(controlIDs){
var controls = controlIDs.split(",");
for (i=0; i<controls.length; i++){
ipjClearValueByID(controls[i]);
}
};
function ipjAddPostBack()
{
if(typeof(__doPostBack) == 'undefined')
{
document.write("<input type=\"hidden\" name=\"__EVENTTARGET\" value=\"\" />");
document.write("<input type=\"hidden\" name=\"__EVENTARGUMENT\" value=\"\" />");
document.write("<script language=\"javascript\" type=\"text/javascript\"> function __doPostBack(eventTarget, eventArgument) {	var theform; if (window.navigator.appName.toLowerCase().indexOf(\"microsoft\") > -1) { theform = document.IronPointForm; } else { theform = document.forms[\"IronPointForm\"]; } theform.__EVENTTARGET.value = eventTarget.split(\"$\").join(\":\"); theform.__EVENTARGUMENT.value = eventArgument; theform.submit(); }</script>");
}
};
function ipjSetRadioButton(groupName, value){
var radios=document.getElementsByName(groupName);
for (i=0; i<radios.length; i++){
radios[i].checked=(radios[i].value==value);
}
}
function ipjUpdateCharCount(charCount_id, textArea, maxChars){
if(textArea.value.length>maxChars){
textArea.value=textArea.value.substring(0,maxChars);
return false;
}else{
document.getElementById(charCount_id).value=(maxChars-textArea.value.length) + " / " + maxChars;
}
}
function ipjRemoveQueryStringParams(url, paramsToRemove, paramPrefixToRemove){
var urlparts = url.split('?');
if (urlparts.length>=2){
if (urlparts[1].length>0){
if (paramsToRemove.length>0 || paramPrefixToRemove.length>0){
var pars=urlparts[1].split(/[&;]/g);
for (var i=pars.length; i-->0; ){
if (pars[i].lastIndexOf(paramPrefixToRemove, 0) !==-1){
pars.splice(i, 1);
}else{
for (var j=paramsToRemove.length; j-->0; ){
if (pars[i].lastIndexOf(paramsToRemove[j] + '=', 0) !== -1) {
pars.splice(i, 1);
break;
}
}
}
}
url = urlparts[0] + '?' + pars.join('&');
url = url.replace(/\?&/g, "?").replace(/&&/g, "&").replace(/[\?&]$/g, "");
}
}
}
return url
}
function ipjParseJSON(data){
if (typeof data !== "string" || !data) {
return null;
}
if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
.replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
try
{
var objObject=null;
if (window.JSON && window.JSON.parse)
objObject=window.JSON.parse(data)
else
objObject = eval('(' + data + ')');
if (!objObject) return null;
if (objObject.hasOwnProperty('d'))
return objObject.d;
else
return objObject;
}
catch (err)
{
return null;
}
}else{
return null;
}
}
function ipjIsFunction ( obj ){
return Object.prototype.toString.call(obj) === "[object Function]";
}
function ipjEach( object, callback){
var name, i=0,
length=object.length,
isObj=length===undefined || ipjIsFunction(object);
if ( isObj ){
for ( name in object ){
if ( callback.call( object[ name ], name, object[ name ] )===false ){
break;
}
}
}else{
for ( var value=object[0];
i<length && callback.call( value, i, value ) !==false; value=object[++i] ){}
}
return object;
}
function ipjToggleControls(isShow, controlIDs){
var divs = controlIDs.split(",");
if (isShow){
for (i=0; i<divs.length; i++){
div=document.getElementById(divs[i]);
if (div){
div.style.display = '';
}
}
}else{
for (i=0; i<divs.length; i++){
div=document.getElementById(divs[i]);
if (div){
div.style.display = 'none';
}
}
}
}
function ipjToggleOnCheckboxCheckedChanged(chb, controlIDs){
ipjToggleControls(chb.checked, controlIDs);
}
function ipjToggleOnRadioBtn(rbID, controlIDs){
ipjToggleControls(document.getElementById(rbID).checked, controlIDs);
}
function ipjEventTarget(e){
var targ;
if (!e) var e=window.event;
if (e.target) targ=e.target;
else if (e.srcElement) targ=e.srcElement;
if (targ.nodeType==3)
targ=targ.parentNode;
return targ.nodeName;
}
function ipjOpenPreview(url)
{
eval("window.open(url,'Admin','scrollbars=yes,status=yes,toolbar=yes,menubar=yes,resizable=yes,height=510,width=750,left='+(screen.width-750)/2+',top='+(screen.height-(510+45))/2)");
};
function ipjOpenPrintPage(url)
{
eval("window.open(url,'PrinterFriendlyPage','scrollbars=yes,status=yes,toolbar=yes,menubar=yes,resizable=yes,height=510,width=750,left='+(screen.width-750)/2+',top='+(screen.height-(510+45))/2)");
};
function ipjOpenPrintPageReturnWindow(url)
{
return eval("window.open(url,'PrinterFriendlyPage_'+new Date().getTime(),'scrollbars=yes,status=yes,toolbar=yes,menubar=yes,resizable=yes,height=510,width=750,left='+(screen.width-750)/2+',top='+(screen.height-(510+45))/2)");
};
function ipjSearchResultPreview(url, id, previewLabel, hideLabel)
{
var strFrameID = 'ipFrame' + id;
var objFrame=ipjFindObj(strFrameID);
var strPreview = '&lt;&lt;' + previewLabel + '&gt;&gt;'
var strHide = '&lt;&lt;' + hideLabel + '&gt;&gt;'
if(url.innerHTML.indexOf(previewLabel) >= 0) // We're expanding the frame
{
objFrame.src = url.href.replace("http://","");//ACM-7369 - "no protocol"
objFrame.height = "175px";
if (document.all) objFrame.width = "100%"; //IE
else objFrame.width = "95%";//Firefox, leave room for a scrollbar
url.innerHTML = '<font color=red>' + strHide + '</font>';
}
else // We're hiding the frame
{
objFrame.src = "";
objFrame.height = "0";
objFrame.width = "0";
url.innerHTML=strPreview;
}
};
function ipjShowPopupWithContent(strContent,winName,features)
{
if (winName =="")    winName = "_blank";
if (winName =="center") features = ipjFindCenterForPopup();
if (features == "")  features = "width=300,height=300"
var ipDisplayWindow  = window.open("",winName,features);
ipDisplayWindow.document.write(unescape(strContent));
ipDisplayWindow.document.close();
}
function ipjShowPopupByURL(strURL,winName,features)
{
if (winName =="")    winName = "_blank";
if (winName =="center") features = ipjFindCenterForPopup();
if (features == "")  features = "width=300,height=300"
var ipDisplayWindow=window.open(strURL,winName,features);
}
function ipjFindCenterForPopup()
{
if (window.screen){
var nWidth=380;
var nHeight=350;
var nLeft=10;
var nTop=10;
nLeft=(window.screen.availWidth-nWidth)/2;
nTop=(window.screen.availHeight-nHeight)/2;
var features = 'width='+nWidth+',height='+nHeight+',left='+nLeft+',top='+nTop;
}
else{
var features='width=380,height=350';
}
return features;
}
var ipjModalDialogWindow=null;
var ipjModalReturnFunction=null;
var ipjModalReturnFunctionArgs=null;
var ipjModalAbortNew=false;
var ipjEventActionCancelled=false;
function Dimensions(){
this.top=0;
this.left=0;
this.width=0;
this.height=0;
}
function ipjGetDialogDimensions(intWidth, intHeight)
{
var dim=new Dimensions();
dim.width=intWidth;
dim.height=intHeight;
if (window.screenX){
dim.left=window.screenX+((window.outerWidth-intWidth)/2);
dim.top=window.screenY+((window.outerHeight-intHeight)/2);
}else if (window.screenLeft){
var CSSCompat = (document.compatMode && document.compatMode != "BackCompat");
window.outerWidth=(CSSCompat) ? document.body.parentElement.clientWidth : document.body.clientWidth;
window.outerHeight=(CSSCompat) ? document.body.parentElement.clientHeight : document.body.clientHeight;
window.outerHeight-=80;
dim.left=parseInt(window.screenLeft+((window.outerWidth-intWidth)/2));
dim.top=parseInt(window.screenTop+((window.outerHeight-intHeight)/2));
}else{
dim.left=(screen.width-intWidth)/2;
dim.top=(screen.height-intHeight)/2;
}
return dim;
}
function ipjShowModal(strUrl, intHeight, intWidth , args, objPointer, funcReturnFunc, functionArgs, dialogArgs){
ipjEventActionCancelled=false;
if (ipjModalAbortNew==true) return true;
ipjSessionWarningSet();
if (args !=null){
strUrl += "?" + args;
}
var dim=ipjGetDialogDimensions(intWidth, intHeight);
if (!ipjModalDialogWindow || (ipjModalDialogWindow && ipjModalDialogWindow.closed)){
if ((!ipjIsChrome)&&(!ipjIsMobile)&&(window.showModalDialog)){
var ieFeatures = "resizable:no;dialogLeft:" + dim.left + "px;dialogTop:" + dim.top + "px;dialogWidth:" + dim.width + "px;dialogHeight:" + dim.height + "px;status:no;help:no;scroll:no"; //mr
var returnValue=window.showModalDialog(strUrl, dialogArgs, ieFeatures);
ipjSessionKeepAlive();
ipjSessionWarningSet();
if (funcReturnFunc !=null){
funcReturnFunc(returnValue, functionArgs);
return;
}
else{
return returnValue;
}
}
else{
ipjModalReturnFunction=funcReturnFunc;
ipjModalReturnFunctionArgs=functionArgs;
ipjModalDialogArgs=dialogArgs;
var nnfeatures = "dependent=yes,resizable=no,screenX=" + dim.left + ",screenY=" + dim.top + ",width=" + dim.width + ",height=" + dim.height;
ipjModalDialogWindow=window.open(strUrl, (new Date()).getTime().toString(), nnfeatures);
ipjModalDialogWindow.focus();
window.top.captureEvents(Event.CLICK|Event.FOCUS);
window.top.onfocus=iHandleFocus;
window.top.onclick=iHandleFocus;
setTimeout("ipjModalDialogWindow.focus();",1)
}
}
else{
ipjModalDialogWindow.focus();
}
}
function ipjCloseModal(returnValue, paramForChrome){
returnValue=unescape(returnValue);
if ((!ipjIsChrome)&&(!ipjIsMobile)&&(ipjIsFF3OrGreater||ipjIsSafari)){
window.top.returnValue=returnValue;
window.top.close();
}else if((!ipjIsChrome)&&(!ipjIsMobile)&&(window.showModalDialog)){
window.close();
window.returnValue=returnValue;
}else{
if(parent.opener!=null){
parent.opener.top.releaseEvents(Event.CLICK|Event.FOCUS);
parent.opener.top.onclick="";
parent.opener.top.onfocus="";
if (ipjIsChrome && paramForChrome == "cancel"){
}
if (ipjIsChrome && paramForChrome == "submit"){
parent.opener.document.forms[0].submit();
}else if(ipjIsChrome && paramForChrome != null && paramForChrome != ""){
parent.opener.location=paramForChrome;
}else if(parent.opener.ipjModalReturnFunction !=null){
parent.opener.ipjModalReturnFunction(returnValue, parent.opener.ipjModalReturnFunctionArgs);
}
}
window.top.close();
}
};
function ipjForcePostBack(returnValue, postbackArgs)
{
if (postbackArgs!=null && typeof(postbackArgs)=="string")
__doPostBack(postbackArgs,'');
else if (postbackArgs==null || typeof(postbackArgs)!="object")
__doPostBack('','');
else{
if (postbackArgs.length==1) __doPostBack(postbackArgs[0],'');
if (postbackArgs.length==2) __doPostBack(postbackArgs[0],postbackArgs[1]);
}
}
function ipjUpdateHyperlink(hyperlinkText, hyperlinkElementId)
{
if (hyperlinkText==null || hyperlinkText=="") return;
document.getElementById(hyperlinkElementId).innerHTML=hyperlinkText;
}
function ipjContinueEventAction(returnValue, elementId)
{
if (document.all && !ipjIsIE11) return;
if (returnValue == "true" || returnValue == true || ipjIsChrome || ipjIsIE11) {
ipjModalAbortNew=true;
if (document.getElementById(elementId)) document.getElementById(elementId).click();
}
else{
__doPostBack('', '');  //default action is to postback when the modal is closed
}
}
function ipjContinueEventActionWithCancel(returnValue, elementId)
{
if (document.all || ipjIsFF3OrGreater){
if (returnValue==window.undefined || returnValue=="" || returnValue=="false") ipjEventActionCancelled=true;
return;
}
else{
if (returnValue==window.undefined || returnValue=="" || returnValue=="false") {
}
else{
ipjModalAbortNew=true;
document.getElementById(elementId).click();
}
}
}
function iIgnoreEvents(e)
{
return false;
};
function iHandleFocus()
{
if (ipjModalDialogWindow){
if (!ipjModalDialogWindow.closed){
ipjModalDialogWindow.focus();
return false;
}
else{
window.top.releaseEvents(Event.CLICK|Event.FOCUS);
window.top.onclick="";
window.top.onfocus="";
}
}
};
function ipjSelectAllText(textbox){
textbox.focus();
textbox.select();
}
var ipjULMouseoutLIs=new Array();
var ipjULMouseoutLITimeouts=new Array();
function ipjInitUnorderedListMenu(sectionMenuElementID, collapseDelay){
if (arguments.length==1) collapseDelay=0;
var sfEls = document.getElementById(sectionMenuElementID).getElementsByTagName("LI");
for (var i=0; i<sfEls.length; i++){
if (collapseDelay==0){
sfEls[i].onmouseover=function(){
this.className+=" sfhover";
}
sfEls[i].onmouseout=function(){
this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
}
}
else{
sfEls[i].onmouseover=function(){
this.className+=" sfhover";
ipjULProcessLIMouseouts();
}
sfEls[i].onmouseout=function(){
ipjULMouseoutLIs.push(this);
var to = setTimeout("ipjULProcessLIMouseouts()",collapseDelay);
ipjULMouseoutLITimeouts.push(to);
}
}
}
}
function ipjULProcessLIMouseouts(){
for (var i=0; i<ipjULMouseoutLIs.length; i++){
ipjULMouseoutLIs[i].className=ipjULMouseoutLIs[i].className.replace(new RegExp(" sfhover\\b"), "");
}
for (var i=0; i<ipjULMouseoutLITimeouts.length; i++){
clearTimeout(ipjULMouseoutLITimeouts[i]);
}
ipjULMouseoutLIs=new Array();
ipjULMouseoutLITimeouts=new Array();
}
function ipjInitUnorderedListMenuItemsActive(sectionMenuElementID){
var strList=null;
try
{
strList = eval('ipActivePageDefIds_' + sectionMenuElementID + ';');
}
catch (e)
{}
var sfEls = document.getElementById(sectionMenuElementID).getElementsByTagName("LI");
if (strList)
for (var i=0; i<sfEls.length; i++){
{
var strPageDefId = sfEls[i].id.replace('pageid','');
for (var j=0;j<strList.length;j++)
{
if (strList[j]==strPageDefId)
{
intLevel = sfEls[i].getAttribute('data-level');
if (sfEls[i].className.length>0)
{
sfEls[i].className = sfEls[i].className + ' ipf-active' + intLevel;
}
else
{
sfEls[i].className = 'ipf-active' + intLevel;
}
break;
}
}
}
}
}
var ipjJSULExpandDelayedMenu=null;
var ipjJSULExpandDelayedMenuTimeout=null;
var ipjJSULCollapseDelayedMenuTimeout=null;
var ipjJSULStillOpenMenus=new Array();
var ipjJSULOpenMenus=new Array();
var ipjJSULAdminBarExists=false;
var ipjJSLIHeight=null;
function ipjInitJSULMenu(sectionMenuElementID, collapseDelay, expandDelay){
if (collapseDelay>=expandDelay) alert("JSULSectionMenu Error: the collapse day must be less than the expand delay");
if (!(document.compatMode && document.compatMode=='CSS1Compat')) {
document.getElementById(sectionMenuElementID).className="ipf-sectionmenu";
ipjInitUnorderedListMenu(sectionMenuElementID, collapseDelay);
return;
}
ipjJSULAdminBarExists = (document.getElementById("tblACMAdminToolbar")!=null);
var sfLIs = document.getElementById(sectionMenuElementID).getElementsByTagName("LI");
var sfULs = document.getElementById(sectionMenuElementID).getElementsByTagName("UL");
for (var i=0; i<sfLIs.length; i++){
sfLIs[i].onmouseover=function(){
if (ipjJSULExpandDelayedMenu=ipjJSULExpandDelayedMenu) return;
var childUL=ipjJSULGetFirstULChild(this);
ipjJSULExpandDelayedMenu=childUL;
var parentUL=ipjJSULGetParentUL(this);
if (parentUL!=null){
ipjJSULStillOpenMenus.push(parentUL.id)
}
clearTimeout(ipjJSULExpandDelayedMenuTimeout);
ipjJSULExpandDelayedMenuTimeout=setTimeout("ipjJSULProcessExpand()",expandDelay);
}
sfLIs[i].onmouseout=function(){
ipjJSULExpandDelayedMenu=null;
clearTimeout(ipjJSULExpandDelayedMenuTimeout);
ipjJSULStillOpenMenus=new Array();
clearTimeout(ipjJSULCollapseDelayedMenuTimeout);
ipjJSULCollapseDelayedMenuTimeout = setTimeout("ipjJSULProcessCollapse()",collapseDelay);
}
}
for (var i=0; i<sfULs.length; i++){
sfULs[i].id="MenuJSUL"+i;
}
}
function ipjJSULProcessExpand(){
if (ipjJSULExpandDelayedMenu!=null){
var alreadyOpen=false;
for (var i=0; i<ipjJSULOpenMenus.length; i++){
if (ipjJSULOpenMenus[i]==ipjJSULExpandDelayedMenu.id) alreadyOpen=true;
}
if (!alreadyOpen){
ipjJSULOpenMenus.push(ipjJSULExpandDelayedMenu.id)
}
ipjJSULSetMenuVisible(ipjJSULExpandDelayedMenu);
}
}
function ipjJSULProcessCollapse(){
clearTimeout(ipjJSULCollapseDelayedMenuTimeout);
ipjJSULCollapseDelayedMenuTimeout=null;
for (var i=0; i<ipjJSULOpenMenus.length; i++){
var collapse=true;
for (var j=0; j<ipjJSULStillOpenMenus.length; j++){
if (ipjJSULOpenMenus[i]==ipjJSULStillOpenMenus[j]){
collapse=false;
break;
}
}
if (collapse){
document.getElementById(ipjJSULOpenMenus[i]).style.left="-999em";
}
}
ipjJSULStillOpenMenus=new Array()
}
function ipjJSULGetFirstULChild(li){
var ul=null;
if (li.childNodes.length>0){
var sfULs = li.getElementsByTagName("UL");
if (sfULs.length>0){
ul=sfULs[0];
return ul;
}
else return null;
}
else return null;
}
function ipjJSULGetParentUL(li){
if (li.parentNode.tagName=="UL") {
return li.parentNode;
}
else return null;
}
function ipjJSULSetMenuVisible(ul){
ul.style.left="auto";
var adminBarOffset=0;
var availPageHeight=ipjPageHeight();
if (ipjJSLIHeight==null) ipjJSLIHeight = Math.abs(parseInt(ipjGetStyle(ul,"marginTop")));
if (ipjJSLIHeight==0) ipjJSLIHeight=null;
if (ipjJSULAdminBarExists){
var adminBarPinned = (document.getElementById("tblACMAdminToolbar").className == "ipb-atb-pinned");
var adminBarHeight = document.getElementById("tblACMAdminToolbar").offsetHeight;
if (adminBarPinned){
if (ipjPageScrollTop()<adminBarHeight) adminBarOffset=adminBarHeight-ipjPageScrollTop();
}
else adminBarOffset=adminBarHeight;
}
availPageHeight-=adminBarOffset;
ul.style.marginTop = -ipjJSLIHeight+"px";
var fromTop=ipjFindAbsoluteTop(ul)-ipjPageScrollTop()-adminBarOffset;
if (ul.offsetHeight+fromTop>availPageHeight){
if (ul.offsetHeight>availPageHeight){
ul.style.marginTop = -fromTop-ipjJSLIHeight+"px";
}
else{
ul.style.marginTop = availPageHeight-ul.offsetHeight-fromTop-ipjJSLIHeight-ipjJSLIHeight+"px";
}
}
}
function ipjOpenCalendarButtonClick(ctlID, doAutoPostBack, localize,currentDateTicks){
if(!currentDateTicks)currentDateTicks='';
var txtDate = document.getElementById(ctlID + "_txtDate");
var selectedDate = "";
if (txtDate){
if(txtDate.disabled){return false};
selectedDate=encodeURI(txtDate.value);
}
var iframeElem = document.getElementById(ctlID+"_ifrCalendarPage");
var pathToIframe=iAppendVirtualPath(ipVirDir,"/CM/WebUI/UserControls/DateTimeControlIframe.aspx?ctlID="+ctlID+"&doAutoPostBack="+doAutoPostBack+"&localize="+localize+"&selectedDate="+selectedDate+"&cdt="+currentDateTicks);
iframeElem.src=pathToIframe;
iframeElem.style.display=(iframeElem.style.display=="block"?"none":"block");
}
function ipjClearCalendarButtonClick(ctlID, doAutoPostBack)
{
if (document.getElementById(ctlID+"_txtDate")) document.getElementById(ctlID+"_txtDate").value="";
if (document.getElementById(ctlID+"_hdnDateValueForQuestionnaireResponses")) document.getElementById(ctlID+"_hdnDateValueForQuestionnaireResponses").value="";
if (document.getElementById(ctlID+"_dd24Hours")) document.getElementById(ctlID+"_dd24Hours").selectedIndex=0;
if (document.getElementById(ctlID+"_dd12Hours")) document.getElementById(ctlID+"_dd12Hours").selectedIndex=0;
if (document.getElementById(ctlID+"_ddMinute")) document.getElementById(ctlID+"_ddMinute").selectedIndex=0;
if (document.getElementById(ctlID+"_ddAMPM")) document.getElementById(ctlID+"_ddAMPM").selectedIndex=0;
if (doAutoPostBack) __doPostBack('','');
}
function ipjCalendarDaySelectedClick(ctlID, strDate, strDateValueForQuestionnaireResponses, doAutoPostBack){
var txtDate = document.getElementById(ctlID + "_txtDate");
if (txtDate){
txtDate.value=strDate;
}
try
{
eval(ctlID+"_DaySelectedClick();");
}
catch (err)
{
}
document.getElementById(ctlID+"_hdnDateValueForQuestionnaireResponses").value=strDateValueForQuestionnaireResponses;
if (doAutoPostBack) __doPostBack('','');
else document.getElementById(ctlID+"_ifrCalendarPage").style.display="none";
}
var __nonMSDOMBrowser = (window.navigator.appName.toLowerCase().indexOf('explorer') == -1);
var __theFormPostData = "";
var __theFormPostCollection=new Array();
function WebForm_InitCallback(){
for (var formIndex=0; formIndex<document.forms.length; formIndex++){
var objForm=document.forms[formIndex];
if (objForm.name.indexOf("IronPointForm") > -1) {
var count=objForm.elements.length;
var element;
for (var i=0; i<count; i++){
element=objForm.elements[i];
var tagName=element.tagName.toLowerCase();
if (tagName == "input") {
var type=element.type;
if ((type == "text" || type == "hidden" || type == "password" ||
((type == "checkbox" || type == "radio") && element.checked)) &&
(element.id != "__EVENTVALIDATION")) {
WebForm_InitCallbackAddField(element.name, element.value);
}
}
else if (tagName == "select") {
var fieldValue="";
for (var j=0; j<element.options.length; j++){
var selectChild=element.options[j];
if (selectChild.selected==true) WebForm_InitCallbackAddField(element.name, selectChild.value);
}
}
else if (tagName == "textarea") {
WebForm_InitCallbackAddField(element.name, element.value);
}
}
}
}
}
var __ourInitCallback=WebForm_InitCallback;
function WebForm_InitCallbackAddField(name, value){
var nameValue=new Object();
nameValue.name=name;
nameValue.value=value;
__theFormPostCollection[__theFormPostCollection.length]=nameValue;
__theFormPostData += name + "=" + WebForm_EncodeCallback(value) + "&";
}
function WebForm_EncodeCallback(parameter)
{
if (encodeURIComponent){
return encodeURIComponent(parameter);
}
else{
return escape(parameter);
}
}
function ipjDoXmlHttpRequestSimple(strCallerId, strURL, strPostData, ptrStateChangeFunc)
{
var xmlHttp=iGetXmlHttpObject();
if (xmlHttp==null)
{
alert ('Browser does not support HTTP Request');
return;
}
xmlHttp.onreadystatechange=function()
{
if (xmlHttp.readyState==4 || xmlHttp.readyState=='complete')
{
ptrStateChangeFunc(xmlHttp);
}
}
xmlHttp.open('POST',strURL,true);
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
var strData=new String;
if (strCallerId.length>0)
{
strData = '__CALLERID=' + WebForm_EncodeCallback(strCallerId) + '&__CALLBACKPARAM=';
}
if (strPostData.length>0)
{
strData+=WebForm_EncodeCallback(strPostData);
}
xmlHttp.send(strData);
}
function ipjDoXmlHttpRequestSynchronous(strCallerId, strURL, strPostData,strParam2){
__theFormPostData = "";
__theFormPostCollection=new Array();
__ourInitCallback();
var xmlHttp=iGetXmlHttpObject();
if (xmlHttp==null){
alert ('Browser does not support HTTP Request');
return;
}
xmlHttp.open('POST',strURL,false);
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
var strData=new String;
if (strCallerId.length>0){
strData = __theFormPostData + '__CALLBACKID=' + WebForm_EncodeCallback(strCallerId) + '&__CALLBACKPARAM=';
}
if (strPostData.length>0){
strData+=WebForm_EncodeCallback(strPostData);
}
if(strParam2){
strData+=('&__CALLBACKPARAM2='+WebForm_EncodeCallback(strParam2));
}
xmlHttp.send(strData);
return xmlHttp.responseText;
}
function ipjDoXmlHttpRequest(strCallerId, strURL, strPostData, ptrStateChangeFunc,strParam2){
__theFormPostData = "";
__theFormPostCollection=new Array();
__ourInitCallback();
var xmlHttp=iGetXmlHttpObject();
if (xmlHttp==null){
alert ('Browser does not support HTTP Request');
return;
}
xmlHttp.onreadystatechange=function(){
if (xmlHttp.readyState==4 || xmlHttp.readyState=='complete'){
if(ptrStateChangeFunc!=null){
ptrStateChangeFunc(xmlHttp);
}
}
}
xmlHttp.open('POST',strURL,true);
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
var strData=new String;
if (strCallerId.length>0){
strData = __theFormPostData + '__CALLBACKID=' + WebForm_EncodeCallback(strCallerId) + '&__CALLBACKPARAM=';
}
if (strPostData.length>0){
strData+=WebForm_EncodeCallback(strPostData);
}
if(strParam2){
strData+=('&__CALLBACKPARAM2='+WebForm_EncodeCallback(strParam2));
}
xmlHttp.send(strData);
}
function ipjDoXmlHttpRequestFromModal(returnValue, postbackArgs)
{
if (returnValue)
{
if (postbackArgs.length==3)
{
ipjDoXmlHttpRequest(postbackArgs[0],postbackArgs[1],postbackArgs[2]);
}
}
}
function ipjDoXmlHttpRequestJSON(strURL, data, verb, ptrStateChangeFunc){
var xmlHttp=iGetXmlHttpObject();
if (xmlHttp==null){
return;
}
xmlHttp.onreadystatechange=function(){
if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {
ptrStateChangeFunc(xmlHttp);
}
}
xmlHttp.open(verb, strURL, true);
xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
xmlHttp.send(data);
}
function ipjCreateXMLDOM(strResponseText)
{
var vXMLDoc;
if (window.ActiveXObject)
{
vXMLDoc = new ActiveXObject("Microsoft.XMLDOM");
vXMLDoc.async=false;
vXMLDoc.loadXML(strResponseText);
}
else if(document.implementation.createDocument)
{
var vParser=new DOMParser();
vXMLDoc = vParser.parseFromString(strResponseText, "text/xml");
}
return vXMLDoc;
}
function iGetXmlHttpObject()
{
var objXMLHttp=null;
if (window.XMLHttpRequest)
{
objXMLHttp=new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
return objXMLHttp;
}
function ipjSessionKeepAlive()
{
var objXMLHttp=iGetXmlHttpObject();
var strURL = iAppendVirtualPath(ipVirDir, "/CM/WebUI/Admin/ServerAction.aspx?action=session_keepalive&dt=" + new Date().getTime());
objXMLHttp.open('GET', strURL, true);
objXMLHttp.send(null);
}
function ipjSessionTerminate()
{
var objXMLHttp=iGetXmlHttpObject();
var strURL = iAppendVirtualPath(ipVirDir, "/CM/WebUI/Admin/ServerAction.aspx?action=session_terminate&dt=" + new Date().getTime());
objXMLHttp.open('GET', strURL, true);
objXMLHttp.send(null);
}
function getKeyCode(e)
{
if (window.event)
return window.event.keyCode;
else if (e)
return e.which;
else
return null;
}
function ipKeyRestrict(e, validchars, blurOnEnter, caller){
var key='', keychar='';
key=getKeyCode(e);
if (key==null){
return true;
}
keychar=String.fromCharCode(key);
keychar=keychar.toLowerCase();
validchars=validchars.toLowerCase();
if (validchars.indexOf(keychar) !=-1){
return true;
}
if (blurOnEnter && key==13){
caller.blur();
return false;
}
if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 ){
return true;
}else if (ipjIsFF && key==118 && e.ctrlKey){
return true;
}
return false;
}
ipjAddEvent(window, "resize", ipjCenterModalDialogPanel);
ipjAddEvent(window, "scroll", ipjCenterModalDialogPanel);
var ipjModalDialogPanelCurrentElem=null;
var ipjAlertMsgsProcessor=null;
var ipjKeepModalDialogPanel=false;
function ipjShowModalDialogPanel(elemID, modalPath, transparent){
if (ipjModalDialogPanelCurrentElem!=null) return;
ipjModalDialogPanelCurrentElem=document.getElementById(elemID);
if (modalPath){
ipjModalDialogPanelCurrentElem.innerHTML = '<iframe src="' + modalPath + '" width="99%" height="99%">';
}
ipjModalDialogPanelCurrentElem.style.display="block";
var overlayElem=ipjModalDialogPanelCurrentElem.nextSibling;
if(!transparent){
if(document.all && !ipjIsIE10){
overlayElem.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ipSysImageDir+"/ModalOverlay.png', sizingMethod='scale')";
}else{
overlayElem.style.backgroundImage="url("+ipSysImageDir+"/ModalOverlay.png)";
}
}else if((ipjIsIE)&&(overlayElem.style.position=="fixed")){
overlayElem.style.backgroundImage="url("+ipSysImageDir+"/0.gif)";
overlayElem.style.backgroundRepeat="no-repeat";
}
overlayElem.style.display="block";
ipjCenterModalDialogPanel();
}
function ipjHideModalDialogPanel(id){
if (ipjModalDialogPanelCurrentElem && !ipjKeepModalDialogPanel){
if((id==null)||(ipjModalDialogPanelCurrentElem.id==id)){
ipjModalDialogPanelCurrentElem.style.display="none";
ipjModalDialogPanelCurrentElem.nextSibling.style.display="none";
ipjModalDialogPanelCurrentElem=null;
}
}
}
function ipjAlertMsgAcknowledge(messageID)
{
ipjDoXmlHttpRequestJSON(iAppendVirtualPath(ipVirDir,
"/CM/WebServices/AlertMessagesService.asmx/AcknowledgeMessage?bh=2&messageID="
+ipjAlertMsgsProcessor.currentID
+ "&userID="
+ ipjAlertMsgsProcessor.userID), "{}", "GET", function(objXMLHTTP) {});
}
function ipjAlertMsgDefer(messageID)
{
ipjDoXmlHttpRequestJSON(iAppendVirtualPath(ipVirDir,
"/CM/WebServices/AlertMessagesService.asmx/DeferMessage?bh=2&messageID="
+ipjAlertMsgsProcessor.currentID
+ "&userID="
+ ipjAlertMsgsProcessor.userID), "{}", "GET", function(objXMLHTTP) {});
}
function ipjCenterModalDialogPanel(event){
ipjFixAdminBarWidth();
if (ipjModalDialogPanelCurrentElem==null) return;
var panelHeight = ipjModalDialogPanelCurrentElem.style.height == "" ? ipjModalDialogPanelCurrentElem.offsetHeight : ipjModalDialogPanelCurrentElem.style.height;
var top=ipjPageScrollTop()+((ipjPageHeight()-parseInt(panelHeight))/2);
var left=ipjPageScrollLeft()+((ipjPageWidth()-parseInt(ipjModalDialogPanelCurrentElem.style.width))/2);
if (ipjAlertMsgsProcessor !=null){
if (ipjAlertMsgsProcessor.currentPopup !=null){
top=top+100;
left=left+250;
}
}
ipjModalDialogPanelCurrentElem.style.top = (top<0?0:top)+"px";
ipjModalDialogPanelCurrentElem.style.left = (left<0?0:left)+"px";
var overlayElem=ipjModalDialogPanelCurrentElem.nextSibling;
if ((overlayElem) && (overlayElem.style) && (overlayElem.style.position != "fixed")) {
overlayElem.style.height = (ipjPageHeight()-1)+"px";
overlayElem.style.width = (ipjPageWidth()-1)+"px";
overlayElem.style.top = ipjPageScrollTop()+"px";
overlayElem.style.left = ipjPageScrollLeft()+"px";
}
if ((overlayElem) && (overlayElem.style) && (overlayElem.style.position != "fixed") && overlayElem.offsetParent.nodeName.toUpperCase() != "BODY") {
overlayElem.style.position = "fixed";
ipjModalDialogPanelCurrentElem.style.position = "fixed";
}
}
var ipjSessionWarningCounter=0;
var ipjSessionWarningTimer=null;
var ipjSessionWarningPageTitle=null;
var ipjSessionWarningPageTitleFlashInterval=null;
function ipjSessionWarningSet(){
if (!window.ipjSessionWarningEnabled || window.ipjSessionWarningEnabled==false) return;
if (window.ipjSessionWarningTimer) clearTimeout(ipjSessionWarningTimer);
ipjSessionWarningTimer = setTimeout("ipjShowSessionWarning()", ipjSessionWarningSecondsTo*1000);
}
function ipjShowSessionWarning(){
var asb=document.getElementById('divMobileEditHost');
if(asb){
document.getElementById(ipjSessionWarningModalID).className="ipb-asb-session-modal";
}else{
asb=document.getElementById('asb_adminbar');
if((asb)&&(asb.style.display=='block')){
document.getElementById(ipjSessionWarningModalID).className="ipb-asb-session-modal";
}else{
asb=null;
document.getElementById(ipjSessionWarningModalID).className="";
}
}
if(asb){
ipjSessionTerminate();
document.getElementById("divSessionWarningTitle").innerHTML = "Session Expired";
document.getElementById("divSessionWarningText").innerHTML = '<br>Your current session has expired.<div style="line-height:2;">Please login again.</div>';
document.getElementById("divSessionWarningButton").onclick=ipjSessionWarningReloadPage;
document.getElementById("lnkAsbSessionClose").onclick=ipjSessionWarningReloadPage;
ipjShowModalDialogPanel(ipjSessionWarningModalID);
}else if(ipjSessionWarningIsModalPage==true){
ipjSessionTerminate();
document.getElementById("divSessionWarningTitle").innerHTML = ipjSessionWarningExpiredTitle;
document.getElementById("divSessionWarningText").innerHTML = ipjSessionWarningExpiredText;
document.getElementById("divSessionWarningButton").onclick=ipjSessionWarningModalPageClose;
document.getElementById("lnkAsbSessionClose").onclick=ipjSessionWarningModalPageClose;
ipjShowModalDialogPanel(ipjSessionWarningModalID);
if(!document.all){
window.top.opener.ipjHideModalDialogPanel();
}
}else{
ipjSessionWarningCounter=ipjSessionWarningCounterInitial;
ipjShowModalDialogPanel(ipjSessionWarningModalID);
ipjSessionWarningCountdown();
}
if(!asb){
window.focus();
ipjSessionWarningPageTitle=document.title;
ipjSessionWarningPageTitleFlashInterval=setInterval("ipjSessionWarningFlashTitle()",1000);
}
}
function ipjSessionWarningFlashTitle(){
document.title=(document.title==ipjSessionWarningPageTitle?"SESSION EXPIRY":ipjSessionWarningPageTitle);
}
function ipjSessionWarningCountdown(){
document.getElementById("divSessionWarningSeconds").innerHTML=ipjSessionWarningCounter+" seconds";
if (ipjSessionWarningCounter<=0){
ipjSessionTerminate();
document.getElementById("divSessionWarningTitle").innerHTML = ipjSessionWarningExpiredTitle;
document.getElementById("divSessionWarningText").innerHTML = ipjSessionWarningExpiredText;
document.getElementById("divSessionWarningButton").onclick = ipjSessionWarningReloadPage;
document.getElementById("lnkAsbSessionClose").onclick=ipjSessionWarningReloadPage;
clearInterval(ipjSessionWarningPageTitleFlashInterval);
document.title=ipjSessionWarningPageTitle;
if (ipjAlertMsgsProcessor !=null){
ipjAlertMsgsProcessor.hideMsgPanel();
ipjAlertMsgsProcessor.stop=true;
ipjCenterModalDialogPanel();
ipjAlertMsgsProcessor=null;
}
}
else{
ipjSessionWarningCounter--;
ipjSessionWarningTimer = setTimeout("ipjSessionWarningCountdown()", 1000);
}
}
function ipjSessionWarningExtend(){
clearTimeout(ipjSessionWarningTimer);
ipjHideModalDialogPanel();
ipjSessionKeepAlive();
ipjSessionWarningSet();
clearInterval(ipjSessionWarningPageTitleFlashInterval);
document.title=ipjSessionWarningPageTitle;
}
function ipjSessionWarningReloadPage(){
if (window.ipjQuestionnaireLastPageURL){
document.location.href=unescape(ipjQuestionnaireLastPageURL);
}
else{
document.location.href=document.location.href;
}
}
function ipjSessionWarningModalPageClose(){
window.top.close();
}
var ipjMouseoutLIs=new Array();
var ipjMouseoutLITimeouts=new Array();
function ipjInitULMenu(menuElementID, frameElementID){
var sfEls = document.getElementById(menuElementID).getElementsByTagName("LI");
var elFrame=document.getElementById(frameElementID);
for (var i=0; i<sfEls.length; i++){
sfEls[i].onmouseover=function(){
this.className+=" sfhover";
ipjProcessLIMouseouts(frameElementID);
if (elFrame)
{
var guideElement=null;
if (this.className.indexOf("rootitem")<0)
guideElement=this.parentElement;
else
{
var items = this.getElementsByTagName("LI");
if (items && items[0])
{
guideElement=items[0].parentElement;
}
}
if (guideElement)
{
elFrame.style.top=guideElement.offsetTop;
elFrame.style.left=guideElement.offsetLeft;
elFrame.style.width=guideElement.offsetWidth;
elFrame.style.height=guideElement.offsetHeight;
}
}
}
sfEls[i].onmouseout=function(){
ipjMouseoutLIs.push(this);
var to = setTimeout("ipjProcessLIMouseouts('" + frameElementID + "')",500);
ipjMouseoutLITimeouts.push(to);
}
}
}
function ipjProcessLIMouseouts(frameElementID){
var elFrame=document.getElementById(frameElementID);
for (var i=0; i<ipjMouseoutLIs.length; i++){
ipjMouseoutLIs[i].className=ipjMouseoutLIs[i].className.replace(new RegExp(" sfhover\\b"), "");
}
for (var i=0; i<ipjMouseoutLITimeouts.length; i++){
clearTimeout(ipjMouseoutLITimeouts[i]);
}
ipjMouseoutLIs=new Array();
ipjMouseoutLITimeouts=new Array();
if (elFrame)
{
elFrame.style.width=0;
elFrame.style.height=0;
}
}
var ipjIsAdminBarPinned=true;
var ipjEnabledIEPositionFix=false;
if (ipjIsIE8){
ipjEnabledIEPositionFix = (document.compatMode && document.compatMode == 'BackCompat');
}else{
ipjEnabledIEPositionFix = ipjIsIE && !(ipjIsIE7 && document.compatMode && document.compatMode == 'CSS1Compat');
}
function ipjAdminBarSetByCookie(){
var pinned = ipjReadCookie("adminbarpinned");
if (pinned!=null){
if (pinned=="true") {
document.getElementById("tblACMAdminToolbar").className = "ipb-atb-pinned";
ipjIsAdminBarPinned=true;
}
else{
document.getElementById("tblACMAdminToolbar").className = "ipb-atb-unpinned";
ipjIsAdminBarPinned=false;
}
}
}
function ipjSwitchPinAdminBar(){
document.getElementById("tblACMAdminToolbar").className = (ipjIsAdminBarPinned?"ipb-atb-unpinned":"ipb-atb-pinned");
ipjIsAdminBarPinned=!ipjIsAdminBarPinned;
ipjCreateCookie("adminbarpinned", (ipjIsAdminBarPinned ? "true" : "false"), 10);
ipjFixAdminBarWidth();
}
function ipjSwitchAboutACMPanel(){
document.getElementById("divAboutACM").style.display=(document.getElementById("divAboutACM").style.display=="block"?"none":"block");
document.getElementById("divSocialNetworking").style.display="none";
}
function ipjSocialNetworkingPanel(){
document.getElementById("divSocialNetworking").style.display=(document.getElementById("divSocialNetworking").style.display=="block"?"none":"block");
document.getElementById("divAboutACM").style.display="none";
}
function ipjACMToolbarToggleDiv(div,pad,dh,buffer){
if(div.style.display=="block"){
div.style.display="none";
if(pad)pad.style.height=dh+"px"
}else{
div.style.display="block";
var i=dh;
if(div.offsetHeight>0){
i=div.offsetHeight+dh+buffer;
}
if(pad)pad.style.height=i+"px"
}
}
function ipjGetAdminBarTop(){
if (ipjIsAdminBarPinned || !ipjEnabledIEPositionFix) return 0;
else{
if (document.compatMode && document.compatMode=='CSS1Compat') return document.documentElement.scrollTop;
else return document.body.scrollTop;
}
}
function ipjAdminBarIEPositionFix(){
if (ipjEnabledIEPositionFix==true){
var fixStyle ="<style>"
fixStyle+=".ipb-atb-unpinned { position: absolute; top: expression(ipjGetAdminBarTop()); } ";
if (ipjEnabledIEPositionFix==true && (document.body.currentStyle.backgroundImage=="" || document.body.currentStyle.backgroundImage=="none")) {
fixStyle+="* html body { background-image: url(falseimage.gif); background-attachment: fixed; background-repeat: no-repeat; }";
}
fixStyle+="</style>";
document.write(fixStyle);
}
}
var ipjFormSubmitted=false;
var ipjSelectedSubmitButton=null;
var __ValidatorOnSubmit=null;
ipjAddEvent(window, "load" , ipjAddUnloadEvent)
function ipjAddUnloadEvent(){
if (document.forms.length>0){
ipjAddEvent(window, "unload", function () { });
ipjFixAdminBarWidth();
}
}
function ipjInitIronPointFormHandling(){
ipjRegisterSubmitButtons();
if (typeof(__doPostBack) == 'undefined') {
return;
}
__oldDoPostBack=__doPostBack;
__doPostBack=ipjSubmitIronPointForm;
}
function ipjRegisterSubmitButtons(){
for (var formIndex=0; formIndex<document.forms.length; formIndex++){
var innerForm=document.forms[formIndex];
if (innerForm.name.indexOf("IronPointForm_") > -1) {
var elements = innerForm.getElementsByTagName("INPUT");
for (var elementIndex=0; elementIndex<elements.length; elementIndex++){
var element=elements[elementIndex];
var type=element.type;
if (type=="submit" || type=="image") {
ipjAddEvent(element, "click" , ipjSubmitButtonClicked);
}
}
}
}
}
function ipjSubmitButtonClicked(e){
if (ipjIsIE) ipjSelectedSubmitButton=e.srcElement;
else ipjSelectedSubmitButton=e.currentTarget;
}
function ipjSubmitIronPointForm(eventTarget, eventArgument)
{
var blnForceRefresh = (eventArgument == 'ForceRefresh');
if (ipjFormSubmitted==true) return;
if (typeof(ValidatorOnSubmit) == "function")
{
if (__ValidatorOnSubmit==null)
{
__ValidatorOnSubmit=ValidatorOnSubmit;
ValidatorOnSubmit=function()
{
var blnReturn=__ValidatorOnSubmit();
if (blnReturn)
{
ipjPrepIronPointForm();
if (eventTarget==null) eventTarget="";
if (eventArgument==null) eventArgument="";
ipjFormSubmitted=true;
}
return blnReturn;
};
}
}
else
{
ipjPrepIronPointForm();
if (eventTarget==null) eventTarget="";
if (eventArgument==null) eventArgument="";
ipjFormSubmitted=true;
}
if (typeof(__doPostBack) == 'undefined') {
document.forms['IronPointForm'].submit();
return;
}
if (typeof(__oldDoPostBack) == 'undefined') {
__doPostBack(eventTarget, eventArgument);
return;
}
setTimeout("__oldDoPostBack('"+eventTarget+"', '"+eventArgument+"');",1);
if(blnForceRefresh){
setTimeout("__oldDoPostBack('', '');",1000);
}else{
var i=eventArgument.indexOf('eval:');
if(i>=0){
eval(eventArgument.substring(i+5));
}
}
}
function ipjPrepIronPointForm(){
for (var formIndex=0; formIndex<document.forms.length; formIndex++){
var innerForm=document.forms[formIndex];
if (innerForm.name.indexOf("IronPointForm_") > -1) {
for (var elementIndex=0; elementIndex<innerForm.elements.length; elementIndex++){
var element=innerForm.elements[elementIndex];
var tagName=element.tagName.toLowerCase();
var type=element.type;
switch (tagName){
case 'input':
if (type == "file") {
var copiedElement=element.cloneNode(true);
copiedElement.style.display="none";
element.insertAdjacentElement("afterEnd", copiedElement);
element.style.display="none";
theForm.appendChild(element);
copiedElement.style.display="block";
}
if (type == "text" || type == "hidden" || type == "password" ||
((type == "checkbox" || type == "radio") && element.checked)) {
ipjAddHiddenFieldToForm(theForm, element.name, element.value);
}
break;
case 'select':
var fieldValue="";
for (var i=0; i<element.options.length; i++){
var selectChild=element.options[i];
if (selectChild.selected==true) ipjAddHiddenFieldToForm(theForm, element.name, selectChild.value);
}
break;
case 'textarea':
ipjAddHiddenFieldToForm(theForm, element.name, element.value);
break;
}
}
}
}
if (ipjSelectedSubmitButton!=null){
if (ipjSelectedSubmitButton.type=="image") {
ipjAddHiddenFieldToForm(theForm, ipjSelectedSubmitButton.name+".x", 0);
ipjAddHiddenFieldToForm(theForm, ipjSelectedSubmitButton.name+".y", 0);
}
else{
ipjAddHiddenFieldToForm(theForm, ipjSelectedSubmitButton.name, ipjSelectedSubmitButton.value);
}
}
}
function ipjAddHiddenFieldToForm(form, name, value){
var el = document.createElement("input");
el.type = "hidden";
el.name=name;
el.value=value;
form.appendChild(el);
}
function ipjMoveViewstateFromFooter()
{
if (typeof theForm != 'undefined' && theForm)
{
var footerForm = document.forms['IronPointForm_Footer'];
if (!footerForm)
{
footerForm=document.IronPointForm_Footer;
}
if (footerForm && footerForm.__VIEWSTATEFOOTER && theForm.__VIEWSTATE)
{
theForm.__VIEWSTATE.value=footerForm.__VIEWSTATEFOOTER.value;
document.getElementById('__VIEWSTATEFOOTER').parentNode.removeChild(document.getElementById('__VIEWSTATEFOOTER'));
}
}
return;
}
function IPScroll(strContainerDivID, intSpeed, height, delay, initialDelay, btnUp, btnDown, btnReset){
this.containerDivID=strContainerDivID;
this.speed=intSpeed;
this.height=height;
this.delay=delay;
this.initialDelay=initialDelay;
this.up=false;
this.down=false;
this.fast=false;
this.btnUp=btnUp;
this.btnDown=btnDown;
this.btnReset=btnReset;
}
IPScroll.prototype.initialize=function(){
var obj=document.getElementById(this.containerDivID);
var instanceOf=this;
var container = document.createElement("div");
var parent=obj.parentNode;
container.id = this.containerDivID + "_container";
parent.insertBefore(container, obj);
parent.removeChild(obj);
container.style.position = "relative";
container.style.height = this.height + "px";
container.style.overflow = "hidden";
obj.style.position = "absolute";
obj.style.top = "0";
obj.style.left = "0";
container.appendChild(obj);
if (this.btnUp != "") {
var UpBtn=document.getElementById(this.btnUp);
UpBtn.onmouseover=function(){
instanceOf.up=true;
};
UpBtn.onmouseout=function(){
instanceOf.up=false;
};
UpBtn.onmousedown=function(){
instanceOf.fast=true;
};
UpBtn.onmouseup=function(){
instanceOf.fast=false;
};
}
if (this.btnDown != "") {
var DownBtn=document.getElementById(this.btnDown);
DownBtn.onmouseover=function(){
instanceOf.down=true;
};
DownBtn.onmouseout=function(){
instanceOf.down=false;
};
DownBtn.onmousedown=function(){
instanceOf.fast=true;
};
DownBtn.onmouseup=function(){
instanceOf.fast=false;
};
}
if (this.btnReset != "") {
var ResetBtn=document.getElementById(this.btnReset);
ResetBtn.onmouseover=function(){
};
ResetBtn.onmouseout=function(){
};
ResetBtn.onclick=function(){
var obj=document.getElementById(instanceOf.containerDivID);
obj.style.top = "0px";
};
}
obj.style.display = '';
if ((obj.offsetHeight+obj.offsetTop)<this.height){
var DownBtn=document.getElementById(this.btnDown);
DownBtn.src = DownBtn.src.replace("icon-scrolldown.gif", "icon-scrolldown-disabled.gif");
}
setTimeout(function(){instanceOf.tick()}, this.initialDelay)
}
IPScroll.prototype.tick=function(){
var instanceOf=this;
var obj=document.getElementById(this.containerDivID);
var DownBtn=document.getElementById(this.btnDown);
var UpBtn=document.getElementById(this.btnUp);
var newTop;
var objHeight=obj.offsetHeight;
var top=obj.offsetTop;
var fast=(this.fast) ? 2 : 1;
if (this.down){
if ((objHeight+top)>this.height){
newTop=top-(this.speed * fast);
DownBtn.src = DownBtn.src.replace("icon-scrolldown-disabled.gif", "icon-scrolldown.gif");
}else{
newTop=top;
DownBtn.src = DownBtn.src.replace("icon-scrolldown.gif", "icon-scrolldown-disabled.gif");
}
obj.style.top = newTop + "px";
if (top<0){
UpBtn.src = UpBtn.src.replace("icon-scrollup-disabled.gif", "icon-scrollup.gif");
}else{
UpBtn.src = UpBtn.src.replace("icon-scrollup.gif", "icon-scrollup-disabled.gif");
}
};
if (this.up){
if (top<0){
newTop=top+(this.speed * fast);
UpBtn.src = UpBtn.src.replace("icon-scrollup-disabled.gif", "icon-scrollup.gif");
}else{
UpBtn.src = UpBtn.src.replace("icon-scrollup.gif", "icon-scrollup-disabled.gif");
newTop=top;
}
obj.style.top = newTop + "px";
if ((objHeight+top)>this.height){
DownBtn.src = DownBtn.src.replace("icon-scrolldown-disabled.gif", "icon-scrolldown.gif");
}else{
DownBtn.src = DownBtn.src.replace("icon-scrolldown.gif", "icon-scrolldown-disabled.gif");
}
};
setTimeout(function(){instanceOf.tick()}, this.delay)
}
function ipjAlertMessagesIEPositionFix(){
if (ipjEnabledIEPositionFix==true){
var fixStyle = "<style>"
fixStyle += ".ipb-messages { position: absolute; top: expression(ipjGetAlertsTop()); } ";
if (ipjEnabledIEPositionFix == true && (document.body.currentStyle.backgroundImage == "" || document.body.currentStyle.backgroundImage == "none")) {
fixStyle += "* html body { background-image: url(/falseimage.gif); background-attachment: fixed; background-repeat: no-repeat; }";
}
fixStyle += "</style>";
document.write(fixStyle);
}
}
function ipjGetAlertsTop(){
if (!ipjEnabledIEPositionFix) return 0;
else{
if (document.compatMode && document.compatMode == 'CSS1Compat') return document.documentElement.scrollTop;
else return document.body.scrollTop;
}
}
function IPAlertMessages(containerDivID, titleDivID, bodyDivID, delay, initialDelay, isModalPage, siteGroupID, userID){
this.containerDivID=containerDivID;
this.titleDivID=titleDivID;
this.bodyDivID=bodyDivID;
this.delay=delay;
this.initialDelay=initialDelay;
this.isModalPage=isModalPage;
this.currentTitle = "";
this.pageTitle=document.title;
this.currentBody = "";
this.currentID=0;
this.siteGroupID=siteGroupID;
this.userID=userID;
this.currentPopup=null;
this.showMsg=false;
this.intervalObjID=null;
this.allMessagesActive=false;
this.stop=false;
this.flashTitle=function(){
document.title = (document.title == this.currentTitle ? "NEW MESSAGE" : this.currentTitle);
}
this.showMessage=function(){
var instanceOf=this;
if (this.isModalPage){
this.showMsgPanel();
document.getElementById(this.titleDivID).innerHTML = "<b>" + this.currentTitle + "</b>";
document.getElementById(this.bodyDivID).innerHTML=this.currentBody;
}
else{
this.showMsgPanel();
document.getElementById(this.titleDivID).innerHTML = "<b>" + this.currentTitle + "</b>";
document.getElementById(this.bodyDivID).innerHTML=this.currentBody;
}
window.focus();
if (this.intervalObjID>0){
clearInterval(this.intervalObjID);
}
this.intervalObjID=setInterval(function(){instanceOf.flashTitle()}, 1000);
}
}
IPAlertMessages.prototype.initialize=function(){
var instanceOf=this;
ipjAddEvent(window, "resize", function() { instanceOf.centerMsgPanel(); });
ipjAddEvent(window, "scroll", function() { instanceOf.centerMsgPanel(); });
if (!instanceOf.isModalPage){
ipjAddEvent(window.document, "dblclick", function(e) {
var targetElem=ipjEventTarget(e);
if (targetElem != "INPUT" && targetElem != "TEXTAREA") {
instanceOf.showHistory();
}
});
}
setTimeout(function(){instanceOf.getMessages()}, instanceOf.initialDelay);
}
IPAlertMessages.prototype.showHistory=function(){
var instanceOf=this;
if (!instanceOf.stop){
var messagesDiv = document.getElementById("alertMessages");
if (!instanceOf.allMessagesActive){
messagesDiv.style.display = "block";
instanceOf.allMessagesActive=true;
instanceOf.getAllMessages(1);
}else{
messagesDiv.style.display = "none";
instanceOf.allMessagesActive=false;
}
}
}
IPAlertMessages.prototype.hideHistory=function(){
var instanceOf=this;
var messagesDiv = document.getElementById("alertMessages");
messagesDiv.style.display = "none";
instanceOf.allMessagesActive=false;
}
IPAlertMessages.prototype.getMessages=function(){
var instanceOf=this;
if (!instanceOf.stop){
ipjDoXmlHttpRequestJSON(iAppendVirtualPath(ipVirDir,
"/CM/WebServices/AlertMessagesService.asmx/GetMessagesJSON?bh=2&siteGroupID="
+instanceOf.siteGroupID
+ "&userID="
+ instanceOf.userID), "{}", "GET", function(objXMLHTTP) {
var msg=ipjParseJSON(objXMLHTTP.responseText);
var data;
try{
data = eval("(" + msg + ")");
}catch(e){}
if (data){
instanceOf.showMsg=false;
ipjEach(data, function(rec){
if (instanceOf.currentID !==this.id){
instanceOf.currentID=this.id;
instanceOf.currentTitle=this.title;
instanceOf.currentBody=this.body;
instanceOf.showMsg=true;
}
});
if (instanceOf.showMsg && !instanceOf.stop){
instanceOf.showMessage();
}
}
});
setTimeout(function(){instanceOf.getMessages()}, instanceOf.delay);
}
}
IPAlertMessages.prototype.getAllMessages=function(days){
var instanceOf=this;
var messagesListDiv = document.getElementById("alertMessagesList");
ipjDoXmlHttpRequestJSON(iAppendVirtualPath(ipVirDir,
"/CM/WebServices/AlertMessagesService.asmx/GetAllMessagesJSON?bh=2&siteGroupID="
+instanceOf.siteGroupID
+ "&userID="
+instanceOf.userID
+ "&days="
+ days), "{}", "GET", function(objXMLHTTP) {
var msg=ipjParseJSON(objXMLHTTP.responseText);
var data;
try{
data = eval("(" + msg + ")");
}catch(e){}
if (data){
var ul = window.document.createElement("ul");
var noMessages=true;
ipjEach(data, function(rec){
var li = document.createElement("li");
li.innerHTML = "<b>" + this.title + "</b>&nbsp;<i>" + this.date + "</i><br>" + this.body;
ul.appendChild(li);
noMessages=false;
});
if (noMessages){
messagesListDiv.innerHTML = "<i>No messages.</i>";
}else{
messagesListDiv.innerHTML = "";
messagesListDiv.appendChild(ul);
instanceOf.allMessagesActive=true;
}
}
});
}
IPAlertMessages.prototype.flashTitle=function(){
var instanceOf=this;
document.title = (document.title == instanceOf.currentTitle ? "NEW MESSAGE" : instanceOf.currentTitle);
}
IPAlertMessages.prototype.showMsgPanel=function(){
var instanceOf=this;
instanceOf.currentPopup=document.getElementById(instanceOf.containerDivID);
instanceOf.currentPopup.style.display = "block";
var overlayElem=instanceOf.currentPopup.nextSibling;
if (document.all) overlayElem.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ipSysImageDir + "/ModalOverlay.png', sizingMethod='scale')";
else overlayElem.style.backgroundImage = "url(" + ipSysImageDir + "/ModalOverlay.png)";
overlayElem.style.display = "block";
instanceOf.centerMsgPanel();
}
IPAlertMessages.prototype.hideMsgPanel=function(){
var instanceOf=this;
if (instanceOf.currentPopup){
instanceOf.currentPopup.style.display = "none";
instanceOf.currentPopup.nextSibling.style.display = "none";
clearInterval(instanceOf.intervalObjID);
instanceOf.currentPopup=null;
document.title=instanceOf.pageTitle;
}
}
IPAlertMessages.prototype.centerMsgPanel=function(){
var instanceOf=this;
if (instanceOf.currentPopup==null) return;
var top=ipjPageScrollTop()+((ipjPageHeight()-parseInt(instanceOf.currentPopup.style.height))/2);
var left=ipjPageScrollLeft()+((ipjPageWidth()-parseInt(instanceOf.currentPopup.style.width))/2);
if (ipjModalDialogPanelCurrentElem !=null){
top=top+100;
left=left+150;
}
instanceOf.currentPopup.style.top = (top < 0 ? 0 : top) + "px";
instanceOf.currentPopup.style.left = (left < 0 ? 0 : left) + "px";
var overlayElem=instanceOf.currentPopup.nextSibling;
overlayElem.style.height = ipjPageHeight() + "px";
overlayElem.style.width = ipjPageWidth() + "px";
overlayElem.style.top = ipjPageScrollTop() + "px";
overlayElem.style.left = ipjPageScrollLeft() + "px";
}
function ipjShowLinkToTheseResultsPopup(link, textboxID){
var divLinkToTheseResults = document.getElementById("divLinkToTheseResults");
var txtLinkToTheseResults=document.getElementById(textboxID);
txtLinkToTheseResults.value=link.href;
divLinkToTheseResults.style.display = '';
}
function ipjHideLinkToTheseResultsPopup(){
document.getElementById("divLinkToTheseResults").style.display = 'none';
}
function ipjAddCategoryCallback(callerID, containerID, txtNewSubfolderID, treeID)
{
var onServerResponse=function(objXMLHTTP)
{
if (objXMLHTTP.responseText.charAt(0) == 's')
{
var strSuccess=objXMLHTTP.responseText.substring(1,2);
if (strSuccess == '1')
{
document.getElementById(txtNewSubfolderID).value ="";
mstrUpdateDiv=eval(treeID+'_Data').treeContainerId;
var  data  = objXMLHTTP.responseText.substring(2).split('[break]');
var  treeCode=data[0];
var  strNodeText=data[1];
var  strTreeTextBoxClientID=data[2];
var  intNodeID=data[3];
iTreeElementID=strTreeTextBoxClientID;
iTreeNodeItemID=intNodeID;
iTreeValue=strNodeText;
var textbox=ipjFindObj(strTreeTextBoxClientID);
var hiddenfield = ipjFindObj('ip_' + strTreeTextBoxClientID);
if ((textbox) && (hiddenfield)){
textbox.value=strNodeText;
hiddenfield.value=intNodeID;
}
if (treeCode.substring(0,21) == 'IPTreeView_SelectNode')
{
var strFunction = treeCode.substring(0, treeCode.indexOf(';')+1);
document.getElementById(mstrUpdateDiv).innerHTML=treeCode.substring(treeCode.indexOf(';')+1);
eval(strFunction);
}
else
{
document.getElementById(mstrUpdateDiv).innerHTML=treeCode;
}
}
else
{
alert(objXMLHTTP.responseText.substring(2));
}
}
}
ipjDoXmlHttpRequest(callerID, document.forms['IronPointForm'].action, 'addcategory', onServerResponse);
}
function ipjAlert(s){
alert(s);
}
function ipjAcmOrAsbAlert(dialogText,dialogCaption,defaultFocusSelector){
var asb=document.getElementById('asb_adminbar');
if((asb) && (asb.style.display=='block')&& (typeof asbAlert != 'undefined')){
asbAlert(dialogText,dialogCaption,defaultFocusSelector);
}else{
alert(dialogText);
}
}
function ipjAcmOrAsbConfirm(dialogText,dialogYesAction,dialogCaption,dialogNoAction,boolOkCancel,boolDefaultNo){
var asb=document.getElementById('asb_adminbar');
if((asb) && (asb.style.display=='block') && (typeof asbConfirm != 'undefined')){
asbConfirm(dialogText,dialogYesAction,dialogCaption,dialogNoAction,boolOkCancel,boolDefaultNo);
return false;
}else{
if(confirm(dialogText)){
if(dialogYesAction){
return eval(dialogYesAction);
}else{
return true;
}
}else{
if(dialogNoAction){
return eval(dialogNoAction);
}else{
return false;
}
}
}
}
function ipjFixAdminBarWidth(){
var aBar = document.getElementById('tblACMAdminToolbar');
if (aBar){
aBar.removeAttribute("style");
var w = "";
if (ipjIsAdminBarPinned)
w = document.documentElement.scrollWidth + "px";
else
w = document.documentElement.offsetWidth + "px";
aBar.width=w;
aBar.setAttribute("style", "width:" + w + "px!important");
}
}