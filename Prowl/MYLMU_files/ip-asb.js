var CALLBACK_LITEEDITON="LiteEditOn";
var CALLBACK_LITEEDITOFF="LiteEditOff";
function ipjASBToggleScroll(){
var boolNoScroll=ipjASBPanelIsVisible();
if (boolNoScroll) boolNoScroll = $('.ipb-asb-panel:visible').height() + $('#asb_adminbar').height() < $(window).height();
if (boolNoScroll){
$("html").css("overflow-y", "hidden");
}else{
$("html").css("overflow-y", "visible");
}
}
function ipjASBHideAllPanels(ignoreLE){
$('.ipb-asb-panel').hide();
if(ipjiOSVer=="6"){
$("#divAsbToolbarWrapper.full").removeClass("open");
}
if(ipjIsMobile){
$(".asb-adminbar-fixed").removeClass("openpanel");
}
if((!ignoreLE)&&(ipjASBIsLiteEditOn())){
var $li=$('#asb_adminbar li#asb_adminbar_nav_edit');
if(!$li.hasClass('ipb-asb_adminbar_nav-active')){
$li.addClass('ipb-asb_adminbar_nav-active');
}
}
ipjASBToggleScroll();
}
function ipjASBShowPanel(jqPanel,fnSwitchFrom,controlCaption,jqToolbar){
ipjASBHideAllPanels(true);
$(".hidAsbControlSwitchProc").val("");
$(".hidAsbControlDirtyProc").val(fnSwitchFrom);
scroll(0,0);
$(jqPanel).show();
$('#divAsbPageBlocker').show();
$("ul#asb_adminbar_nav li.ipb-asb_adminbar_nav-active").removeClass("ipb-asb_adminbar_nav-active");
$(jqToolbar).addClass("ipb-asb_adminbar_nav-active");
ipjASBToggleScroll();
if(ipjiOSVer=="6"){
$("#divAsbToolbarWrapper.full").addClass("open");
}
if(ipjIsMobile){
$(".asb-adminbar-fixed").addClass("openpanel");
}
}
function ipjASBPanelIsVisible(){
for(var i=0;i<$('.ipb-asb-panel').length;i++){
if($('.ipb-asb-panel')[i].style.display=="block"){
return true;
}
}
return false;
}
function ipjASBToggleToolbar(asbID,admID,userID,bshow){
if(bshow){
document.getElementById(admID).style.display='none';
document.getElementById(asbID).style.display='block';
ipjASBIsMobileMode()?ipjASBSetMobileMode():ipjLiteEditPanel(true);
}else{
if ($(".hidAsbRequiresReload").val() == "true") {
$(".hidAsbRequiresReload").val("");
$('.ipb-asb-panel').hide();
if (lpCurrentPageURL != null && lpCurrentPageURL != ""){
window.location.href=lpCurrentPageURL;
}else{
window.location.reload();
}
}else{
ipjASBEditZonesOff();
ipjASBHideAllPanels();
document.getElementById(asbID).style.display = 'none';
document.getElementById(admID).style.display = 'block';
}
}
if(userID){
ipjCreateCookie('asbadminbar_'+userID, (bshow?'true':'false'), 10);
}
ipjASBToggleScroll();
}
function ipjASBShowProgress(){
ipjShowModalDialogPanel('mdpASBDesignLoadingMessage', false, true);
$("[style*='cursor'][style*='wait'], [style*='cursor'][style*='progress']").addClass("ip-asb-hidecursor");;
}
function ipjASBHideProgress(){
$(".ip-asb-hidecursor").removeClass("ip-asb-hidecursor");
ipjHideModalDialogPanel();
}
function ipjASBEditZonesOff(){
$(document).unbind('mousemove');
$('.ipbSBZoneWrapper').unbind('mouseenter');
$('.ipbSBZoneWrapper').unbind('mousedown');
$('.ipbSBZoneWrapper').addClass('ipbSBZoneWrapperOff');
$('.ipbSBZoneWrapper').removeClass('ipbSBZoneWrapperOn');
$('.ipbSBZoneWrapper.mobile a.edit').hide();
$('#asb_adminbar li#asb_adminbar_nav_edit').removeClass('ipb-asb_adminbar_nav-active');
}
function ipjASBEditZonesOn(hidemsg){
$('.ipbSBZoneWrapper').addClass('ipbSBZoneWrapperOn');
$('.ipbSBZoneWrapper').removeClass('ipbSBZoneWrapperOff');
$('.ipbSBZoneWrapper.mobile').show();
$('.ipbSBZoneWrapper.mobile a.edit').show();
$('#asb_adminbar li#asb_adminbar_nav_edit').addClass('ipb-asb_adminbar_nav-active');
if(!ipjASBIsMobileMode()){
$('.ipbSBZoneWrapper').mouseenter(function(e){
e.stopPropagation();
ipjDoEditableZoneHover(this);
});
if(ipjIsiOS||ipjIsAndroid){
$('.ipbSBZoneWrapper').mousedown(function(e){
e.stopPropagation();
ipjDoEditableZoneHover(this);
});
}
}
}
function ipjDoEditableZoneHover(zone){
var $zone=$(zone);
var zoneNum=$zone.attr("zone");
var $hdr=$("#divZoneHeader"+zoneNum);
$('.ipbSBZoneWrapperOver').not(zone).addClass('ipbSBZoneWrapperOn');
$('.ipbSBZoneWrapperOver').not(zone).removeClass('ipbSBZoneWrapperOver');
$('.ipbSBZoneWrapperHeader').not($hdr[0]).css('display','none');
if(!ipjASBPanelIsVisible()){
if(!$zone.hasClass('ipbSBZoneWrapperOver')){//only if we don't already have the hover class.
var l=$zone.offset().left;
var t=$zone.offset().top-27;
var w=zone.getBoundingClientRect().width;
if(!w){
w=zone.offsetWidth;
}
w-=4;
if($hdr.parent()[0].nodeName=="DIV"){
$hdr.appendTo('body');
}
$hdr.css({'position':'absolute','left':l+'px','top':t+'px','width':w+'px'});
if(t<68){
$hdr.css('z-index','1002');
}
$(document).bind("mousemove",function(event){
if(($(event.target).hasClass("ipbLEHover"))||($(event.target).parents(".ipbLEHover").length>0)){
}else{
$(document).unbind("mousemove");
resetEditableZone(zoneNum);
}
});
$(zone).removeClass('ipbSBZoneWrapperOn');
$(zone).addClass('ipbSBZoneWrapperOver');
$hdr.css('display','block');
}
}
}
function resetEditableZone(zoneNum){
var ez=document.getElementById("divZoneWrapper"+zoneNum);
if(ez){
var $hdr=$("#divZoneHeader"+zoneNum);
$hdr.css('display','none');
$(ez).addClass('ipbSBZoneWrapperOn');
$(ez).removeClass('ipbSBZoneWrapperOver');
var ul=$hdr.find('.ui-menu')[0];
if(ul!=null){
ul.style.display='none';
}
if(ipjIsFF){
var ddl=$hdr.children('select')[0];
if(ddl){
var oldID=$(ddl).attr('origID');
if(oldID){
ddl.value=oldID;
}
}
}
}
}
function ipjASBToggleEditZones(forceOn){
if((!forceOn)&&($('.ipbSBZoneWrapperOn').get(0)!=null)){
ipjASBEditZonesOff();
return false;
}else if($('.ipbSBZoneWrapperOff').get(0)!=null){
ipjASBEditZonesOn();
return true;
}else{
return ($('.ipbSBZoneWrapperOn').get(0)!=null);
}
}
function ipjASBIsLiteEditOn(){
return ($('.ipbSBZoneWrapperOn').get(0)!=null);
}
function ipjASBInitIsDirty(zone,isNew){
ipjASBSetIsDirty(false);
var id;
if(isNew){
id=(('#divSBNew_'+zone).replace('-','_'));
}else{
id=('#divSBEdit_'+zone);
}
$(id+' .asb-set-dirty-keypress').bind("keypress",function(e){ipjASBSetIsDirty();return true;});
$(id+' .asb-set-dirty-click').bind("click",function(e){ipjASBSetIsDirty();return true;});
$(id+' .asb-set-dirty-change').bind("change",function(e){ipjASBSetIsDirty();return true;});
$(id+' .asb-set-dirty-asbrbg .asb-rb').bind("click",function(e){ipjASBSetIsDirty();return true;});
}
function ipjASBInitIsDirtyRadAjax(oEditor){
ipjASBSetIsDirty(false);
try{
var id='#'+oEditor.get_id();
if($(id).hasClass('asb-set-dirty-editor')){
oEditor.attachEventHandler("onkeydown",function(e){
ipjASBSetIsDirty();
return true;
});
$(id+' .reTool').bind("click",function(e){
ipjASBSetIsDirty();
return true;
});
$(id+' .reDropdown').bind("click",function(e){
ipjASBSetIsDirty();
return true;
});
}
}catch(e){}
}
function ipjASBSetIsDirty(isDirty){
if(isDirty==false){
$(".hidAsbIsDirty").val("");
}else{
$(".hidAsbIsDirty").val("1");
}
}
function ipjASBIsDirty(){
return $(".hidAsbIsDirty").val()!="";
}
function switchAsbControl(asbControlSwitchProc){
switch (asbControlSwitchProc){
case "ipjLitePagesPanel()":
if ($(".divLitePages").is(":visible")) return;
break;
case "ipjLiteSitePanel()":
if ($("#divSiteProperties").is(":visible")) return;
break;
case "ipjLiteEditPanel()":
if ($("#divLiteEditControlContainer").is(":visible")) return;
if ($(".divLitePages").is(":visible")){
asbControlSwitchProc="ipjLiteEditPanel(true)";
}else if($(".divLitePages").is(":visible")){
asbControlSwitchProc="ipjLiteEditPanel(true)";
}
break;
case "ipjMobileEditToggle()":
if ($("#divMobileEditControlContainer").is(":visible")) return;
break;
}
try{
var asbControlDirtyProc = $(".hidAsbControlDirtyProc").val();
if ((asbControlDirtyProc != null) && (asbControlDirtyProc != "")) {
$(".hidAsbControlSwitchProc").val(asbControlSwitchProc);
eval(asbControlDirtyProc);
}else{
$(".ipb-asb-panel").hide();
$(".hidAsbControlDirtyProc, .hidAsbControlSwitchProc").val("");
eval(asbControlSwitchProc);
}
}catch(e){
}finally{
ipjASBToggleScroll();
}
}
var idInterval=0;
var previousOrientation=0;
var onOrientationChange=function(){
if((!ipjBrowserSupportsFixedPositioning())&&(ipjIsAndroid||(window.orientation!==previousOrientation))){
previousOrientation=window.orientation;
ipjPositionToolbarForMobile();
}
};
var reflowFixedPositions=function(){
document.documentElement.style.paddingRight = '1px';
setTimeout(function (){
document.documentElement.style.paddingRight = '';
}, 100);
}
function ipjASBIsMobileMode(){
try{
return ipjASBIsMobile;
}catch(e){
return false;
}
}
function ipjASBShowMobilePanel(jqPanel,fnSwitchFrom,jqToolbar){
$('.ipb-asb-panel').hide();
$(".hidAsbControlSwitchProc").val("");
$(".hidAsbControlDirtyProc").val(fnSwitchFrom);
$(jqPanel).show();
$("ul#asb_adminbar_nav li.ipb-asb_adminbar_nav-active").removeClass("ipb-asb_adminbar_nav-active");
$(jqToolbar).addClass("ipb-asb_adminbar_nav-active");
}
function ipjASBSetMobileMode(){
if(ipjASBIsMobileMode()){
window.addEventListener("resize", reflowFixedPositions, false);
if(!ipjBrowserSupportsFixedPositioning()){
$(".asb-adminbar-fixed").attr('style', 'position: absolute !important');
$(window).scroll(function(){
ipjPositionToolbarForMobile();
});
window.addEventListener("orientationchange", onOrientationChange, false);
}else if(ipjIsiOS){
}else if(ipjIsAndroid){
}else{
try{
}catch(e){
}
}
$("#asb_adminbar").css("height","0px");
$("body").css("padding-bottom","60px");
ipjMobileScrollToTop(!ipjBrowserSupportsFixedPositioning(),true);
}else{
$(".asb-adminbar-fixed").attr('style', 'position: fixed !important').css("bottom","auto").css("top",0);
$("#asb_adminbar").css("height", "75px");
window.removeEventListener("resize", onOrientationChange, false);
window.removeEventListener("orientationchange", onOrientationChange, false);
$(window).unbind('scroll');
if(idInteval){
clearInterval(idInteval);
}
}
}
function ipjPositionToolbarForMobile(){
if(!ipjBrowserSupportsFixedPositioning()){
var top;
if(ipjIsiOS&&(ipjiOSVer<5)){
top=(window.pageYOffset+window.innerHeight-$("#asb_adminbar_nav li").height())+"px";
}else{
top=(window.innerHeight-$("#asb_adminbar_nav li").height())+"px";
}
$(".asb-adminbar-fixed").css("bottom","auto").css("top",top);
}
}
function ipjMobileScrollToTop(useTimeout,repositionToolbar){
if(ipjASBIsMobileMode()){
if(ipjIsiPhone){
if(useTimeout&&repositionToolbar){
setTimeout(function(){
window.scrollTo(0, 1);
}, 0);
setTimeout(function(){
ipjPositionToolbarForMobile();
}, 10);
return;
}else if(useTimeout){
setTimeout(function(){
window.scrollTo(0, 1);
}, 0);
return;
}else{
window.scrollTo(0, 1);
if(repositionToolbar){
ipjPositionToolbarForMobile();
}
return;
}
}
}
scroll(0,0);
if(repositionToolbar){
ipjPositionToolbarForMobile();
}
}
function ipjMobileEditToggle(forceOn){
var b=ipjASBToggleEditZones(forceOn);
if(b){
$("ul#asb_adminbar_nav li.ipb-asb_adminbar_nav-active").removeClass("ipb-asb_adminbar_nav-active");
$("ul#asb_adminbar_nav li#asb_adminbar_nav_edit").addClass("ipb-asb_adminbar_nav-active");
}else{
$("ul#asb_adminbar_nav li#asb_adminbar_nav_edit").removeClass("ipb-asb_adminbar_nav-active");
}
if ($(".divMobilePages").is(":visible")) {
$(".divMobilePages").hide();
$("ul#asb_adminbar_nav li.#asb_adminbar_nav_pages").removeClass("ipb-asb_adminbar_nav-active");
ipjMobileEditToggle(true);
}
}
function ipjFixedPositionFix(){
if(ipjIsMobile){
window.addEventListener("scroll", reflowFixedPositions, false);
};
}
function ipjLiteLogoutRedirect(){
if (typeof m_strPassportLogoutPath != 'undefined')
$.get(m_strPassportLogoutPath);
window.location.href=m_strLogoutRedirectPath;
}
function ipjSelectFontOption(dropDown, value)
{
for (var i=0; i<dropDown.options.length; i++)
{
if (dropDown.options[i].value.replace(/\\/g,"").replace(/\s/g,"")==value.replace(/\\/g,"").replace(/\s/g,""))
{
$(dropDown.options[i]).attr('selected','selected');
}
}
}
function ipjSiteBuilderCallback(owner, method, postData, callbackCompleteFunc)
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
if (callbackCompleteFunc)
callbackCompleteFunc(xmlHttp);
}
};
var strURL=ipVirDir;
if (strURL == '/') strURL = '';
strURL += "/CM/WebUI/Pages/SiteBuilder.aspx?Owner=" + owner + '&Method=' + method;
xmlHttp.open('POST',strURL,true);
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlHttp.setRequestHeader("Content-length", postData.length);
xmlHttp.setRequestHeader("Connection", "close");
xmlHttp.send(postData);
}
function ipjSiteBuilderCallbackSynchronous(owner, method, postData){
var xmlHttp=iGetXmlHttpObject();
if (xmlHttp==null){
alert('Browser does not support HTTP Request');
return;
}
var strURL=ipVirDir;
if (strURL == '/') strURL = '';
strURL += "/CM/WebUI/Pages/SiteBuilder.aspx?Owner=" + owner + '&Method=' + method;
xmlHttp.open('POST', strURL, false);
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlHttp.setRequestHeader("Content-length", postData.length);
xmlHttp.setRequestHeader("Connection", "close");
xmlHttp.send(postData);
return xmlHttp.responseText;
}
function ipjACMDebug(s){
var e=document.getElementById("divACMDebug");
e.style.display="block";
document.getElementById("divACMDebug").innerHTML+=s;
}
/**
* Get the css rules of a stylesheet which apply to the htmlNode. Meaning its class
* its id and its tag.
* @param CSSStyleSheet styleSheet
*/
function getCssRules(styleSheet){
if ( !styleSheet )
return null;
try
{
var cssRules=new Array();
if (styleSheet.cssRules){
var currentCssRules=styleSheet.cssRules;
for ( var i=0; i<currentCssRules.length; i++){
if ( currentCssRules[i].type==3 ){
var importCssRules=getCssRules(currentCssRules[i].styleSheet);
if ( importCssRules !=null ){
cssRules=addToArray(cssRules, importCssRules);
}
styleSheet.deleteRule(i);
}
else{
break;
}
}
cssRules=addToArray(cssRules, currentCssRules);
}
return cssRules;
}
catch (ex)
{
return 'fail';
}
}
/**
* Since a list of rules is returned, we cannot use concat.
* Just use old good push....
* @param CSSRuleList cssRules
* @param CSSRuleList cssRules
*/
function addToArray(cssRules, newRules){
for ( var i=0; i<newRules.length; i++){
cssRules.push(newRules[i]);
}
return cssRules;
}
/**
* Finds all CSS rules.
*/
function getCSSRules(targetDoc){
var cssRules=new Array();
for ( var i=0; i<targetDoc.styleSheets.length; i++){
for ( var j=0; j<10; j++)
{
var currentCssRules=getCssRules(targetDoc.styleSheets[i])
if (currentCssRules != 'fail')
{
if ( currentCssRules !=null )
cssRules.push.apply(cssRules, currentCssRules);
break;
}
}
}
return cssRules;
}
function ipjGetDocumentCSSProperty(targetDoc, selectorText, propertyName)
{
if (!targetDoc) return;
if (!targetDoc.styleSheets) return;
var thecss=getCSSRules(targetDoc);
for (j=0;j<thecss.length;j++)
{
if (thecss[j].selectorText && (thecss[j].selectorText.toLowerCase()==selectorText.toLowerCase()))
{
return thecss[j].style[propertyName];
}
}
return null;
}
function ipjRadEditorHeightFix($editor,force){
if ((ipjiOSVer=="6")||(ipjiOSVer=="7")||ipjIsChrome||ipjIsIE11||ipjIsSafari) {
if((force)||(!$editor.hasClass("ipjradeditorheightfix"))){
var $tdinput = $editor.find("td.reContentCell");
var fullheight;
if(ipjIsiOS){
fullheight=$editor.height()-55;
}else{
var $tdtool = $editor.find("td.reToolCell");
var toolbarHeight=$tdtool.height();
if (toolbarHeight==0){
toolbarHeight=($editor.width()<600) ? 53 : 26;
}
fullheight=$editor.height()-((toolbarHeight+32));
$editor.find("td.reContentCell iframe").css("height", (fullheight + "px"));
}
$tdinput.css("height",(fullheight+"px"));
$tdinput.children("div.reContentArea").css("height",(fullheight+"px"));
$editor.addClass("ipjradeditorheightfix");
}
}
}
function ipjASBCoverElement(elm){
if (elm.length == 1 && !elm.hasClass("ipb-asb-element-covered")) {
elm.addClass("ipb-asb-element-covered");
var cover = $('<div class="ipb-asb-cover"/>');
cover.insertAfter(elm);
cover.css("width", elm.width() + parseInt(elm.css("padding-left")) + parseInt(elm.css("padding-right")));
cover.css("height", elm.height() + parseInt(elm.css("padding-top")) + parseInt(elm.css("padding-bottom")));
cover.position({ my: "center center", at: "center center", of: elm });
}
}
function ipjASBKeepCovers(){
var covers = $(".ipb-asb-element-covered");
if (covers.length>0){
$("div.ipb-asb-cover").remove();
covers.each(function (){
$(this).removeClass("ipb-asb-element-covered");
ipjASBCoverElement($(this));
});
}
}
function ipjASBSetNumericInput(input){
input.bind("keydown",
function (e){
var key=e.charCode || e.keyCode || 0;
return (
key==8 ||
key==9 ||
key==46 ||
(key>=37 && key<=40) ||
(key>=48 && key<=57) ||
(key>=96 && key<=105));
});
}