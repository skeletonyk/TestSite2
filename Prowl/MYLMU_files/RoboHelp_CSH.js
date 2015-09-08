var gbNav6=false;
var gbIE5=false;
var gAgent=navigator.userAgent.toLowerCase();
var gbMac=(gAgent.indexOf("mac")!=-1);
var gbSunOS=(gAgent.indexOf("sunos")!=-1);
var gbOpera=(gAgent.indexOf("opera")!=-1);
var HH_DISPLAY_TOPIC=0;
var HH_DISPLAY_TOC=1;
var HH_DISPLAY_INDEX=2;
var HH_DISPLAY_SEARCH=3;
var HH_HELP_CONTEXT=15;
var gVersion=navigator.appVersion.toLowerCase();
var gnVerMajor=parseInt(gVersion);
var gnVerMinor=parseFloat(gVersion);
if(navigator.appName.indexOf("Microsoft")!=-1)
{
var nPos=gAgent.indexOf("msie");
if(nPos!=-1)
{
var nVersion=parseFloat(gAgent.substring(nPos+5));
if(nVersion>=5)
gbIE5=true;
}
}
if(gnVerMajor>=4)
{
if(navigator.appName=="Netscape")
{
if(gnVerMajor>=5)
gbNav6=true;
}
}
function RH_ShowHelp(hParent, a_pszHelpFile, uCommand, dwData)
{
var strHelpPath=a_pszHelpFile;
var strWnd = "";
var nPos = a_pszHelpFile.indexOf(">");
if (nPos !=-1)
{
strHelpPath=a_pszHelpFile.substring(0, nPos);
strWnd=a_pszHelpFile.substring(nPos+1);
}
if (isServerBased(strHelpPath))
RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData);
else
RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData);
}
function RH_OpenHelpTopic(a_pszHelpMainPage, a_pszRelTopicUrl)
{
var strHelpPath=a_pszHelpMainPage;
var strWnd = "";
var nPos = a_pszHelpMainPage.indexOf(">");
if (nPos !=-1)
{
strHelpPath=a_pszHelpMainPage.substring(0, nPos);
strWnd=a_pszHelpMainPage.substring(nPos+1);
}
var a_pszHelpFile = "";
a_pszHelpFile = strHelpPath + "#<url=" + a_pszRelTopicUrl;
if (strWnd)
a_pszHelpFile += ">>wnd=" + strWnd;
if (a_pszHelpFile)
{
if (gbIE5 || gbNav6)
loadData(a_pszHelpFile);
else
{
var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
window.open(a_pszHelpFile, "__webCshStub", sParam);
}
}
}
function RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData)
{
ShowWebHelp_Server(strHelpPath, strWnd, uCommand, dwData);
}
function RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData)
{
ShowWebHelp(strHelpPath, strWnd, uCommand, dwData);
}
function ShowWebHelp_Server(strHelpPath, strWnd, uCommand, nMapId)
{
var a_pszHelpFile = "";
if (uCommand==HH_HELP_CONTEXT)
{
if (strHelpPath.indexOf("?") == -1)
a_pszHelpFile = strHelpPath + "?ctxid=" + nMapId;
else
a_pszHelpFile = strHelpPath + "&ctxid=" + nMapId;
}
else
{
if (strHelpPath.indexOf("?") == -1)
a_pszHelpFile = strHelpPath + "?ctxid=0";
else
a_pszHelpFile = strHelpPath + "&ctxid=0";
}
if (strWnd)
a_pszHelpFile += ">" + strWnd;
if (gbIE5 || gbNav6)
{
a_pszHelpFile += "&cmd=newwnd&rtype=iefrm";
loadData(a_pszHelpFile);
}
else
{
var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
window.open(a_pszHelpFile, "__webCshStub", sParam);
}
}
function ShowWebHelp(strHelpPath, strWnd, uCommand, nMapId)
{
var a_pszHelpFile = "";
if (uCommand==HH_DISPLAY_TOPIC)
{
a_pszHelpFile = strHelpPath + "#<id=0";
}
if (uCommand==HH_HELP_CONTEXT)
{
a_pszHelpFile = strHelpPath + "#<id=" + nMapId;
}
else if (uCommand==HH_DISPLAY_INDEX)
{
a_pszHelpFile = strHelpPath + "#<cmd=idx";
}
else if (uCommand==HH_DISPLAY_SEARCH)
{
a_pszHelpFile = strHelpPath + "#<cmd=fts";
}
else if (uCommand==HH_DISPLAY_TOC)
{
a_pszHelpFile = strHelpPath + "#<cmd=toc";
}
if (strWnd)
a_pszHelpFile += ">>wnd=" + strWnd;
if (a_pszHelpFile)
{
if (gbIE5 || gbNav6)
loadData(a_pszHelpFile);
else
{
var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
window.open(a_pszHelpFile, "__webCshStub", sParam);
}
}
}
function isServerBased(a_pszHelpFile)
{
if (a_pszHelpFile.length>0)
{
var nPos = a_pszHelpFile.lastIndexOf('.');
if (nPos !=-1 && a_pszHelpFile.length>=nPos+4)
{
var sExt=a_pszHelpFile.substring(nPos, nPos+4);
if (sExt.toLowerCase() == ".htm")
{
return false;
}
}
}
return true;
}
function getElement(sID)
{
if(document.getElementById)
return document.getElementById(sID);
else if(document.all)
return document.all(sID);
return null;
}
function loadData(sFileName)
{
if(!getElement("dataDiv"))
{
if(!insertDataDiv())
{
gsFileName=sFileName;
return;
}
}
var sHTML="";
if(gbMac)
sHTML+="<iframe name=\"__WebHelpCshStub\" src=\""+sFileName+"\"></iframe>";
else
sHTML += "<iframe name=\"__WebHelpCshStub\" style=\"display:none;width:0;height:0\" src=\"" + sFileName + "\"></iframe>";
var oDivCon=getElement("dataDiv");
if(oDivCon)
{
if(gbNav6)
{
if(oDivCon.getElementsByTagName&&oDivCon.getElementsByTagName("iFrame").length>0)
{
oDivCon.getElementsByTagName("iFrame")[0].src=sFileName;
}
else
oDivCon.innerHTML=sHTML;
}
else
oDivCon.innerHTML=sHTML;
}
}
function insertDataDiv()
{
var sHTML="";
if(gbMac)
sHTML+="<div id=dataDiv style=\"display:none;\"></div>";
else
sHTML+="<div id=dataDiv style=\"visibility:hidden\"></div>";
var obj=document.body;
if (gbIE5)
{
obj.insertAdjacentHTML("beforeEnd", sHTML);
}
else if (gbNav6)
{
var r=obj.ownerDocument.createRange();
r.setStartBefore(obj);
var parsedHTML=r.createContextualFragment(sHTML);
obj.appendChild(parsedHTML);
}
return true;
}