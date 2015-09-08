var IPJ_DELETED_ROW_FLAG=999999
var ipjDisableGridCellChangedHandler=false;
var ipjAsbToolbarZindex=0;
function ipjGetGridIdByControlId(ctrlId){
var foundGridId = "";
var gridId;
for (gridId in igtbl_gridState){
if (gridId.replace(/[_x]/g,"").replace(/grdTable/g,"")==ctrlId.replace(/[_x]/g,"").replace(/grdTable/g,"")) {
foundGridId=gridId;
break;
}
}
if (foundGridId=="") alert('Unable to identify grid - ' + ctrlId);
return foundGridId;
}
function ipjCellClickEditMode(GridID, CellID)
{
var column=igtbl_getColumnById(CellID);
if (column.HeaderText != 'Order') {
if (column.DataType==8){
igtbl_EnterEditMode(GridID);
};
};
};
function ipjAfterExitEditModeHandler(GridID, CellID)
{
__doPostBack('', '');
};
function ipjOrderedGridCellChangedHandler(GridID, CellID)
{
if (ipjDisableGridCellChangedHandler==true) return;
var cell=igtbl_getCellById(CellID);
var grid=igtbl_getGridById(ipjGetGridIdByControlId(GridID));
var count=grid.Rows.length;
if (cell.Column.Index==1){
var row=igtbl_getRowById(CellID);
if((cell.getValue()>0) && (cell.getValue()<=count)){
ipjMoveTableRow( GridID, (row.getIndex()+1), cell.getValue());
}
else{
ipjMoveTableRow( GridID, (row.getIndex()+1), (row.getIndex()+1));
}
}
};
function iGetRowOrderHTML(gridName, index, count)
{
var intUpArrowTo=index-1;
var intOrder=index;
var intDownArrowTo=index+1;
index--;
count--;
var strLead = '<table class="ipb-no" cellspacing="0" cellpadding="0"><tr><td><table class="ipb-no" cellSpacing="0" cellPadding="0" style="width:10px">';
var strMidRow = '<tr><td>' + ipGridImgPxH2 + '</td></tr>';
var strOrderNumLink =  '<a class="ipb" title="Click to move." href="javascript:igtbl_EnterEditMode(\'' + gridName + '\');">' + intOrder + '</a>';
var strTail = '</td></tr></table>';
if((index==0) && (index!=count))
{
return strLead+
'<tr><td>' + ipGridImgPxH9 + '</td></tr>' +
strMidRow+
"<tr><td><a class=\"ipb\" href=\"javascript:ipjMoveTableRow('" + gridName + "', " + intOrder + ", " + intDownArrowTo + ");\">" + ipGridImgDn + "</a></td></tr>" +
"</table></td><td style=\"width:8px\">&nbsp;</td><td>" + strOrderNumLink + strTail;
}
else
{
if((index!=0) && (index!=count))
{
return strLead+
"<tr><td><a class=\"ipb\" href=\"javascript:ipjMoveTableRow('" + gridName + "', " + intOrder + ", " + intUpArrowTo + ");\">" + ipGridImgUp + "</td></tr>" +
strMidRow+
"<tr><td><a class=\"ipb\" href=\"javascript:ipjMoveTableRow('" + gridName + "', " + intOrder + ", " + intDownArrowTo + ");\">" + ipGridImgDn + "</td></tr>" +
"</table></td><td style=\"width:8px\">&nbsp;</td><td>" + strOrderNumLink + strTail;
}
else
{
if((index!=0) && (index==count))
{
return strLead+
"<tr><td><a class=\"ipb\" href=\"javascript:ipjMoveTableRow('" + gridName + "', " + intOrder + ", " + intUpArrowTo + ");\">" + ipGridImgUp + "</td></tr>" +
strMidRow+
"<tr><td>&nbsp;</td></tr>" +
"</table></td><td style=\"width:8px\">&nbsp;</td><td>" + strOrderNumLink + strTail;
}
else
{
return intOrder;
}
}
}
};
function ipjGetDeletedRowCount(grid)
{
var count=0;
for (var i=0; i<grid.Rows.length; i++){
if (grid.Rows.getRow(i).getCellFromKey("HiddenSortOrder").getValue()==IPJ_DELETED_ROW_FLAG) {
count++;
}
}
return count;
}
function ipjGetActiveRowCount(grid)
{
return grid.Rows.length-ipjGetDeletedRowCount(grid);
}
function ipjMoveTableRow(gridName, indexFrom, indexTo)
{
indexFrom=Math.floor(indexFrom*1);
indexTo=Math.floor(indexTo*1);
if (indexTo<=0) indexTo=1;
var grid=igtbl_getGridById(ipjGetGridIdByControlId(gridName));
var row;
var count=ipjGetActiveRowCount(grid);
if(grid==null) return;
if(count==0) return;
if(indexFrom==0) return;
if(indexTo==0) return;
if(indexFrom>count) return;
if(indexTo>count) return;
ipjDisableGridCellChangedHandler=true;
grid.suspendUpdates(true);
if(indexFrom==indexTo)
{
row=grid.Rows.getRow(indexFrom-1);
row.getCell(0).setValue(indexTo);
row.getCell(1).setValue(indexTo);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, indexTo, count);
}
else
{
if(((indexFrom+1)==indexTo) || ((indexFrom-1)==indexTo) )
{
var intNewPos=indexTo;
if (indexFrom<indexTo)
{
row=grid.Rows.getRow(indexFrom-1);
row.getCell(0).setValue(intNewPos);
row.getCell(1).setValue(intNewPos);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, intNewPos, count);
row=grid.Rows.getRow(indexTo-1);
row.getCell(0).setValue(intNewPos-1);
row.getCell(1).setValue(intNewPos-1);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, intNewPos-1, count);
}
else
{
row=grid.Rows.getRow(indexTo-1);
row.getCell(0).setValue(intNewPos+1);
row.getCell(1).setValue(intNewPos+1);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, intNewPos+1, count);
row=grid.Rows.getRow(indexFrom-1);
row.getCell(0).setValue(intNewPos);
row.getCell(1).setValue(intNewPos);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, intNewPos, count);
}
}
else
{
var start=1;
var IsMovingDown;
if(indexFrom>indexTo)
{
IsMovingDown=false;
}
else
{
IsMovingDown=true;
}
row=grid.Rows.getRow(indexFrom-1);
row.getCell(0).setValue(indexTo);
row.getCell(1).setValue(indexTo);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, indexTo, count);
for(i=0; i<count; i++)
{
if(IsMovingDown)
{
if (i!=indexFrom-1)
{
row=grid.Rows.getRow(i);
if(i<=indexTo-1)
{
row.getCell(0).setValue(start);
row.getCell(1).setValue(start);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, start, count);
}
else
{
row.getCell(0).setValue(start+1);
row.getCell(1).setValue(start+1);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, start+1, count);
}
start++;
}
}
else
{
if(i!=indexFrom-1)
{
row=grid.Rows.getRow(i);
if(i<=indexTo-2)
{
row.getCell(0).setValue(start);
row.getCell(1).setValue(start);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, start, count);
}
else
{
row.getCell(0).setValue(start+1);
row.getCell(1).setValue(start+1);
row.getCell(1).Element.innerHTML=iGetRowOrderHTML(gridName, start+1, count);
}
start++;
}
}
}
}
}
grid.suspendUpdates(false);
ipjDisableGridCellChangedHandler=false;
var hiddenColumn=grid.Bands[0].Columns[0];
hiddenColumn.SortIndicator = 0; // 1 means "ascending"
grid.sortColumn(grid.Bands[0].Columns[0].Id);
grid.sort();
document.body.style.cursor = "default";
};
function ipjGridFindClear(gridName, textBoxName)
{
var grid=igtbl_getGridById(ipjGetGridIdByControlId(gridName));
var textbox=ipjFindObj(textBoxName);
var row;
for (i=0;i<rows.length;i++)
{
row=grid.Rows.getRow(i);
}
igtbl_clearSelectionAll(gridName);
};
function ipjGridSelectDeselectColumn(gridName, columnName)
{
var grid=igtbl_getGridById(ipjGetGridIdByControlId(gridName));
var blnAllSelected=true;
for (i=0; i<grid.Rows.length; i++){
if (grid.Rows.getRow(i).getCellFromKey(columnName).isEditable()){
if (grid.Rows.getRow(i).getCellFromKey(columnName).getValue()==0){
blnAllSelected=false;
break;
}
}
}
for (i=0; i<grid.Rows.length; i++){
if (grid.Rows.getRow(i).getCellFromKey(columnName).isEditable()){
grid.Rows.getRow(i).getCellFromKey(columnName).setValue(!blnAllSelected);
}
}
};
function ipjDebugGridAlert(gridName, cellCount)
{
var grid=igtbl_getGridById(ipjGetGridIdByControlId(gridName));
var msg="";
if (cellCount==null) cellCount=1;
for( var rowIndex=0; rowIndex<grid.Rows.length; rowIndex++)
{
msg+="\nRow_" + rowIndex +": ";
for( var cellIndex=0; cellIndex<cellCount; cellIndex++)
{
msg+="   " + (grid.Rows.getRow(rowIndex).getCell(cellIndex).getValue()+"").replace(/[^A-Za-z_0-9]/g,"");
}
}
alert(msg);
}
var ipj_PageletsCallerID='';
var ipj_PageletsGridID='';
var ipj_PageletsMobileGridID='';
var ipj_PageletsRowReferences=new Array();
var ipj_PageletsMobileRowReferences=new Array();
function ipjPageletsGetGrid(id){
return igtbl_getGridById(ipjGetGridIdByControlId(id));
}
function ipjPageletsGetGridID(id){
return id.replace(/_/g,"x")+"xgrdTable";
}
function ipjPageletsGetRowReferences(id){
if((id==ipj_PageletsMobileGridID)||(id==ipj_PageletsMobileGridID+"_grdTable"))
return ipj_PageletsMobileRowReferences;
return ipj_PageletsRowReferences;
}
function ipjPageletsSetupGrid(callerID, gridID, mobileGridID){
ipj_PageletsCallerID=callerID;
ipj_PageletsGridID=gridID;
ipj_PageletsMobileGridID=mobileGridID;
for (var i=0; i<ipjPageletsGetGrid(gridID).Rows.length; i++) ipj_PageletsRowReferences.push(ipjPageletsGetGrid(gridID).Rows.getRow(i));
for (var i=0; i<ipjPageletsGetGrid(mobileGridID).Rows.length; i++) ipj_PageletsMobileRowReferences.push(ipjPageletsGetGrid(mobileGridID).Rows.getRow(i));
igtbl_deleteRow(ipjPageletsGetGridID(gridID), ipj_PageletsRowReferences[0].Element.id);
igtbl_deleteRow(ipjPageletsGetGridID(mobileGridID), ipj_PageletsMobileRowReferences[0].Element.id);
}
function ipjPageletsAddRow(gridID){
igtbl_addNew(ipjPageletsGetGridID(gridID),0);
var grid=ipjPageletsGetGrid(gridID);
var rowRefs=ipjPageletsGetRowReferences(gridID);
var id=ipjPageletsGetGridID(gridID);
var intRowIndex=ipjGetActiveRowCount(grid)-1;
var templateRow=rowRefs[0];
var newRow=grid.Rows.getRow(grid.Rows.length-1);
newRow.getCellFromKey("HiddenSortOrder").setValue(intRowIndex+1);
newRow.getCellFromKey("PageDefID").setValue(0);
newRow.getCellFromKey("Title").Element.innerHTML = templateRow.getCellFromKey("TitleAlternate").Element.innerHTML.replace(/-1/g, grid.Rows.length);
newRow.getCellFromKey("TitleAlternate").Element.innerHTML = newRow.getCellFromKey("Title").Element.innerHTML;
newRow.getCellFromKey("SavePageletForceChildren").Element.innerHTML = templateRow.getCellFromKey("SavePageletForceChildren").Element.innerHTML;
newRow.getCellFromKey("UseParentCheckbox").Element.innerHTML = templateRow.getCellFromKey("UseParentCheckbox").Element.innerHTML.replace("-1", grid.Rows.length);
newRow.getCellFromKey("Delete").Element.innerHTML = templateRow.getCellFromKey("Delete").Element.innerHTML.replace("-1", grid.Rows.length);
newRow.getCellFromKey("UsePageTemplateCheckbox").Element.innerHTML = '<input type="checkbox" id="chkHide" style="display:none"\>';
newRow.getCellFromKey("UsePageTemplateCheckboxAlternate").Element.innerHTML = templateRow.getCellFromKey("UsePageTemplateCheckboxAlternate").Element.innerHTML.replace("-1", grid.Rows.length);
newRow.getCellFromKey("ShowInSearchModeCheckbox").Element.innerHTML = templateRow.getCellFromKey("ShowInSearchModeCheckbox").Element.innerHTML.replace("-1", grid.Rows.length);
rowRefs.push(newRow);
var hiddenColumn=grid.Bands[0].Columns[0];
hiddenColumn.SortIndicator = 0; // 1 means "ascending"
grid.sortColumn(grid.Bands[0].Columns[0].Id);
grid.sort();
ipjMoveTableRow(id, intRowIndex, intRowIndex);
ipjMoveTableRow(id, intRowIndex+1, intRowIndex+1);
}
function ipjPageletsDeleteRow(gridID, intRowIndex){
var row=ipjPageletsGetRowReferences(gridID)[intRowIndex];
var intOriginalPosition = row.getCellFromKey("HiddenSortOrder").getValue();
var intActiveRowCount=ipjGetActiveRowCount(ipjPageletsGetGrid(gridID));
ipjMoveTableRow(ipjPageletsGetGridID(gridID), intOriginalPosition, intActiveRowCount);
row.getCellFromKey("HiddenSortOrder").setValue(IPJ_DELETED_ROW_FLAG);
row.Element.style.display="none";
ipjMoveTableRow(ipjPageletsGetGridID(gridID), intActiveRowCount-1, intActiveRowCount-1);
}
function ipjPageletsUpdateRow(strReturnedValues, strParams){
if (typeof strReturnedValues=="undefined") return;
var tempArray=strParams.split(":");
var gridID=tempArray[0];
var intSavedIndex=tempArray[1];
var returnedValues=eval(strReturnedValues);
if (returnedValues==false) return;
var intPageletPageDefID=returnedValues[0];
var strPageletTitle=unescape(returnedValues[1]);
var templateRow=ipjPageletsGetRowReferences(gridID)[0];
var row=ipjPageletsGetRowReferences(gridID)[intSavedIndex];
row.getCellFromKey("PageDefID").setValue(intPageletPageDefID);
row.getCellFromKey("Title").Element.innerHTML = templateRow.getCellFromKey("Title").Element.innerHTML.replace("TEMPLATE_TITLE", strPageletTitle).replace(/-1/g, intSavedIndex);
row.getCellFromKey("TitleAlternate").Element.innerHTML = row.getCellFromKey("Title").Element.innerHTML;
row.getCellFromKey("SavePageletForceChildren").Element.innerHTML = templateRow.getCellFromKey("SavePageletForceChildren").Element.innerHTML.replace("-1", intPageletPageDefID);
var blnShowCheckbox=false;
if (Number(intPageletPageDefID)>0)
{
var strResponse = ipjDoXmlHttpRequestSynchronous(ipj_PageletsCallerID, document.forms['IronPointForm'].action, 'pageDefID='+intPageletPageDefID);
if (strResponse.charAt(0) == 's')
{
var strReturn=strResponse.substring(1,2);
if (strReturn == '1')
{
blnShowCheckbox=true;
}
}
}
if (blnShowCheckbox)
{
row.getCellFromKey("UsePageTemplateCheckbox").Element.innerHTML = row.getCellFromKey("UsePageTemplateCheckboxAlternate").Element.innerHTML;
}
else
{
row.getCellFromKey("UsePageTemplateCheckbox").Element.innerHTML = '<input type="checkbox" id="chkHide" style="display:none">';
}
row.getCellFromKey("UsePageTemplate").setValue(false);
}
function ipjPageletsUseParentCheckboxChange(checkBoxElement, gridID, intRowIndex){
var row=ipjPageletsGetRowReferences(gridID)[intRowIndex];
var blnIsChecked=checkBoxElement.checked;
row.getCellFromKey("UseParent").setValue(blnIsChecked);
if (blnIsChecked){
__doPostBack('', '');
}
else{
row.getCellFromKey("Title").Element.innerHTML = row.getCellFromKey("TitleAlternate").Element.innerHTML;
}
}
function ipjPageletsShowInSearchModeCheckboxChange(checkBoxElement, gridID, intRowIndex){
var row=ipjPageletsGetRowReferences(gridID)[intRowIndex];
var blnIsChecked=checkBoxElement.checked;
row.getCellFromKey("ShowInSearchMode").setValue(blnIsChecked);
}
function ipjPageletsUseParentPageAllCheckboxChange(checkBoxElement){
var blnIsChecked=checkBoxElement.checked;
if (blnIsChecked){
__doPostBack('', '');
}
else{
__doPostBack('', '');
}
}
function ipjPageletsUsePageTemplateCheckboxChange(checkBoxElement,gridID, intRowIndex){
var row=ipjPageletsGetRowReferences(gridID)[intRowIndex];
var blnIsChecked=checkBoxElement.checked;
row.getCellFromKey("UsePageTemplate").setValue(blnIsChecked);
}
function ipjPageletsForceChildren(gridID){
var intRowIndex = ipjPageletsGetGrid(gridID).getActiveRow().getCellFromKey("HiddenSortOrder").getValue();
__doPostBack('FORCE_'+gridID+'_'+intRowIndex, '');
}
function ipjUpdatePageletHyperlink(hyperlinkText, functionArgs)
{
var hyperlinkElementId=functionArgs[0];
var onChoosePageDef=functionArgs[1];
if (hyperlinkText==null || hyperlinkText=='' || hyperlinkText=='false') return;
var objRegEx = new RegExp('(.*)<PageDefID value="(.*)">');
var objMatch=objRegEx.exec(hyperlinkText);
if (objMatch !=null)
{
document.getElementById(hyperlinkElementId).innerHTML=objMatch[1];
document.getElementById(hyperlinkElementId.replace('hlkPageSelect','hdnPageDefID')).value = objMatch[2];
if (onChoosePageDef)
{
if (functionArgs.length>2)
{
var objArgs=new Array(functionArgs.length-2);
for (var i=0; i<objArgs.length; i++)
{
objArgs[i]=functionArgs[i+2];
}
onChoosePageDef(objMatch[2], objArgs);
}
else
onChoosePageDef(objMatch[2]);
}
}
}
function ipjTreeToggle(DivName, TreeName)
{
if(DivName==null) return;
var element=ipjFindObj(DivName);
if (element){
if (element.style.display == "inline" || element.style.display == "inline-block") {
ipjTreeHide(DivName, TreeName);
}
else{
iTreeShow(DivName, TreeName);
}
}
};
function ipjTreeSetViewFromCookie(DivName, TreeName)
{
var strShowTree=ipjTreeGetCookie(DivName);
if(strShowTree == "true") {
iTreeShow(DivName, TreeName);
}
else{
ipjTreeHide(DivName, TreeName);
}
};
function ipjTreeGetCookie(DivName)
{
var strCookies=document.cookie;
var strPrefix = 'IPShowTree' + DivName + '=';
var strBegin = strCookies.indexOf("; " + strPrefix);
if (strBegin==-1){
strBegin=strCookies.indexOf(strPrefix);
if (strBegin !=0) return null;
}
else{
strBegin+=2;
}
var strEnd = document.cookie.indexOf(";", strBegin);
if (strEnd==-1) strEnd=strCookies.length;
return unescape(strCookies.substring(strBegin+strPrefix.length, strEnd));
};
function ipjTreeSetCookie(DivName, Value){
document.cookie = 'IPShowTree' + DivName + '=' + Value;
};
function iTreeShow(DivName, TreeName, dontSetCookie)
{
var element=ipjFindObj(DivName);
if (element){
if (ipjIsSafari) element.style.display = 'inline-block';
else element.style.display = 'inline';
if(!dontSetCookie){ipjTreeSetCookie(DivName, "true");}
}
};
function ipjTreeHide(DivName, TreeName)
{
var element=ipjFindObj(DivName);
if (element){
element.style.display = 'none';
ipjTreeSetCookie(DivName, "false");//ACM-7202
ipjCreateCookie('IPShowTree'+DivName,"",-1);
}
};
var iTreeDivName;
var iTreeName;
var iTreeElementID;
var iTreeValue;
var iTreeNodeItemID;
var iTreeDoPostBack;
function ipjTreeNodeSel1(treeDivName, treeName, treeElementID, treeValue, treeNodeItemID, treeDoPostBack)
{
iTreeDivName=unescape(treeDivName);
iTreeName=unescape(treeName);
iTreeElementID=unescape(treeElementID);
iTreeValue=unescape(treeValue);
iTreeNodeItemID=unescape(treeNodeItemID);
iTreeDoPostBack=unescape(treeDoPostBack);
};
function ipjTreeAfterNodeSelection(treeID, nodeID)
{
setTimeout("ipjTreeAfterNodeSelectionFire('" + treeID + "','" + nodeID + "');",1)
}
function ipjTreeAfterNodeSelectionFire(treeID, nodeID)
{
var textbox=ipjFindObj(iTreeElementID);
var hiddenfield = ipjFindObj('ip_' + iTreeElementID);
if ((textbox) && (hiddenfield)){
textbox.value=iTreeValue;
hiddenfield.value=iTreeNodeItemID;
ipjTreeHide(iTreeDivName, iTreeName);
if(iTreeDoPostBack==1){
__doPostBack(iTreeElementID, iTreeNodeItemID)
}
}
};
function ipjTree_ChoosePageDef(value1, value2)
{
if (ipAddressTextBoxClientID){
value1=unescape(value1);
var textbox=ipjFindObj(ipAddressTextBoxClientID);
if (textbox){
textbox.value=value1;
}
}
if (ipTitleTextBoxClientID){
value2=unescape(value2);
var textbox=ipjFindObj(ipTitleTextBoxClientID);
if (textbox){
textbox.value=value2;
}
}
};
function ipjGrid_SetAltTag(altTag)
{
var altTag=unescape(altTag);
var textbox=ipjFindObj(ipAltTagOrTitleTextBoxClientID);
if (textbox && altTag){
textbox.value=altTag;
}
}
function ipjGrid_SetSelectedDAinfo(altTag,id,mimeType){
var altTag=unescape(altTag);
var textbox=ipjFindObj(ipAltTagOrTitleTextBoxClientID);
if (textbox && altTag){
textbox.value=altTag;
}
ipjSetDALinkControlState(mimeType,false);
}
var ipjActiveTabsIDs=new Array();
var ipjTabControlID = "";
function ipjRegisterTabControl(ctlID){
ipjTabControlID=ctlID;
}
function ipjRegisterTab(tabID){
ipjActiveTabsIDs.push(tabID);
}
function ipjSelectTab(tabID)
{
ipjClearScrollPosition();
if (tabID=="") return;
if (!document.getElementById('tabsLoadedIndicator')) return;
for (i=0; i<ipjActiveTabsIDs.length; i++){
if (ipjActiveTabsIDs[i]!=tabID) ipjDeSelectTab(ipjActiveTabsIDs[i]);
}
if (document.getElementById('div'+tabID)) document.getElementById('div'+tabID).style.display = "block";
if (document.getElementById('btn'+tabID)) document.getElementById('btn'+tabID).className = "ipb-tabitem-selected";
document.getElementById(ipjTabControlID+"_hdnCurrentSelectedTabID").value=tabID;
ipjSetEditorsVisible();
if(window[tabID+'_OnSelect']){
eval(tabID+'_OnSelect();');
}
}
function ipjDeSelectTab(tabID)
{
if (tabID=="") return;
if (!document.getElementById('tabsLoadedIndicator')) return;
if (document.getElementById('div'+tabID)) document.getElementById('div'+tabID).style.display = "none";
if (document.getElementById('btn'+tabID)) document.getElementById('btn'+tabID).className = "ipb-tabitem";
if(window[tabID+'_OnDeselect']){
eval(tabID+'_OnDeselect();');
}
}
function ipjSelectedTabID(){
if(document.getElementById(ipjTabControlID+"_hdnCurrentSelectedTabID")!=null){
return document.getElementById(ipjTabControlID+"_hdnCurrentSelectedTabID").value;
};
return "";
}
function ipjEnableContentActionButtons()
{
var strReadOnly = ipjFindObj("ipReadOnlyContentActionBar");
if(strReadOnly == null || strReadOnly != "True" || strReadOnly != "true")
{
var objButtonPrefix = ipjFindObj("ipActionButtonPrefix");
if((objButtonPrefix != null) && (objButtonPrefix.value != ""))
{
var strButtonPrefix=objButtonPrefix.value;
var oaInputElements = document.getElementsByTagName('input');
var element;
for (var i=0; i<oaInputElements.length ; i++)
{
element=oaInputElements[i]
if(element.id.indexOf(strButtonPrefix)>0)
{
element.disabled=false;
}
}
}
}
};
function ipjDisableContentActionButtons()
{
var strReadOnly = ipjFindObj("ipReadOnlyContentActionBar");
if(strReadOnly == null || strReadOnly != "True" || strReadOnly != "true")
{
var objButtonPrefix = ipjFindObj("ipActionButtonPrefix");
if((objButtonPrefix != null) && (objButtonPrefix.value != ""))
{
var strButtonPrefix=objButtonPrefix.value;
var oaInputElements = document.getElementsByTagName('input');
var element;
for (var i=0; i<oaInputElements.length ; i++)
{
element=oaInputElements[i]
if(element.id.indexOf(strButtonPrefix)>0)
{
element.disabled=true;
}
}
}
}
return true;
};
function ipjDisableContentActionButton(strValue){
var strReadOnly = ipjFindObj("ipReadOnlyContentActionBar");
if(strReadOnly == null || strReadOnly != "True" || strReadOnly != "true")
{
var objButtonPrefix = ipjFindObj("ipActionButtonPrefix");
if((objButtonPrefix != null) && (objButtonPrefix.value != ""))
{
var strButtonPrefix=objButtonPrefix.value;
var oaInputElements = document.getElementsByTagName('input');
var element;
for (var i=0; i<oaInputElements.length ; i++)
{
element=oaInputElements[i]
if(element.id.indexOf(strButtonPrefix)>0 && element.value==strValue)
{
element.disabled=true;
}
}
}
}
return true;
}
function ipInitQuestionBuffer()
{
document.getElementById('ctlHiddenUserAction').value='';
};
function ipEditQuestion(qid,qItemID)
{
document.getElementById('ctlHiddenUserAction').value='Edit;' + qItemID + ';' + qid;
__doPostBack('', '');
};
function ipCopyQuestion(qid,qItemID)
{
if (!confirm('Unsaved question grid changes will be lost.  Continue?'))
return;
document.getElementById('ctlHiddenUserAction').value='Copy;' + qItemID + ';' + qid;
__doPostBack('', '');
};
function ipPasteQuestion(qid,sortOrder)
{
if (!confirm('Unsaved question grid changes will be lost.  Continue?'))
return;
document.getElementById('ctlHiddenUserAction').value='Paste;' + sortOrder + ';' + qid;
__doPostBack('', '');
};
function ipDeleteQuestion(qid,qItemID,isVersioned)
{
var response;
if (isVersioned)
{
response = confirm("Unsaved question grid changes will be lost.  Click OK to confirm deletion.");
}
else
{
response = confirm("All responses related to this question and any unsaved question grid changes will be lost. Click OK to confirm deletion.");
}
if (response)
{
document.getElementById('ctlHiddenUserAction').value='Del;' + qItemID + ';' + qid;
__doPostBack('', '');
}
};
var ipjIsRadAjax=false;
var ipjFFAbsolutePositionFix;
var ipjActiveEditors=new Array();
function ipjRegisterEditor(editor){
ipjActiveEditors.push(editor);
if (ipjIsRadAjax){
editor.SetActive=function (){};
editor.SetFocus=editor.setFocus;
editor.SetVisible=editor.set_visible;
editor.GetHtml=editor.get_html;
editor.SetHtml=editor.set_html;
editor.Document=editor.get_document();
editor.ContentArea=editor.get_contentArea();
editor.ContentWindow=editor.get_contentWindow();
}
}
IPCustomDefaultFilter=function(editor){
IPCustomDefaultFilter.initializeBase(this);
this.set_isDom(false);
this.set_enabled(true);
this.set_name("CustomDefaultFilter");
this.set_description("Custom default filter");
this.set_id(editor.get_id()+'_CustomDefaultFilter');
}
IPCustomDefaultFilter.prototype=
{
getHtmlContent: function(html){
var newHtml=html;
return newHtml;
},
getDesignContent: function(content){
var newContent=content;
if(typeof(ipjRadAjaxDoReplaceEmptyNodeHack)!="undefined"){
newContent=ipjRadAjaxDoReplaceEmptyNodeHack(newContent);
}
return newContent;
}
}
IPCustomIndentFilter=function()
{
IPCustomIndentFilter.initializeBase(this);
this.set_isDom(false);
this.set_enabled(true);
this.set_name("CustomIndentationFilter");
this.set_description("Custom indentation filter");
this._indentPattern = "    ";
this._protectedData=null;
var tagsCol1 = "ADDRESS|TITLE|META|LINK|BASE|SCRIPT|AREA|PRE";
var tagsCol2 = "HTML|HEAD|BODY|STYLE|FORM|TABLE|TBODY|THEAD|TR|TD|TH|P|DIV|SPAN|H1|H2|H3|H4|H5|H6|OPTION|DL|DT|DD|OL|UL|LI";
var tagsCol3 = tagsCol2; // + "|DL|UL|OL";
this._ignoreTags = new RegExp("(<PRE[^>]*>|<!--|<SCRIPT[^>]*>)([\\s\\S]*?)(<\\/PRE>|-->|<\\/SCRIPT>)", "gi");
this._tagsNLBefore = new RegExp("<(" + tagsCol1 + ")[^>]*>", "gi");
this._tagsNLAfter = new RegExp("<\\/(" + tagsCol1 + ")[^>]*>", "gi");
this._tagsNLNoCloseAfter = new RegExp("<(BR|HR)[^>]*\\/?>", "gi");
this._tagsNLBeforeAndAfter = new RegExp("<\\/?(" + tagsCol2 + ")[^>]*>", "gi");
this._tagsIncIndent = new RegExp("^<(" + tagsCol3 + ")[\\s\\/>]", "i");
this._tagsDecIndent = new RegExp("^<\\/(" + tagsCol3 + ")[\\s\\>]", "i");
this._shrinkNL = new RegExp("\\s*\\n+\\s*", "gi");
}
IPCustomIndentFilter.prototype=
{
getHtmlContent: function(html)
{
var newHtml=html.trim();
if(newHtml.toUpperCase().indexOf("<BODY")==0){
newHtml = newHtml.substring(newHtml.indexOf(">") + 1, newHtml.length - 7);
}
this._protectedData=[];
var self=this;
var _matchFormattedContent=function(match, group1, group2, group3, offset, fullText)
{
Array.add(self._protectedData, group2);
return group1 + "RADEDITORFORMATTED_" + self._protectedData.length + group3;
}
newHtml=newHtml.replace(this._ignoreTags, _matchFormattedContent);
var wholeMatch = "$&";
if($telerik.isSafari2){
wholeMatch = "$0";
}
newHtml = newHtml.replace(this._tagsNLBefore, "\n" + wholeMatch);
newHtml = newHtml.replace(this._tagsNLAfter, wholeMatch + "\n");
newHtml = newHtml.replace(this._tagsNLNoCloseAfter, wholeMatch + "\n");
newHtml = newHtml.replace(this._tagsNLBeforeAndAfter, "\n" + wholeMatch + "\n");
var arrayHtml=newHtml.split(this._shrinkNL);
var sbHtml=new Telerik.Web.StringBuilder();
var indentString = "";
for (var i=0; i<arrayHtml.length; i++)
{
var line=arrayHtml[i];
if (line.length==0)
continue;
if (this._tagsDecIndent.test(line))
{
if (indentString.length>this._indentPattern.length)
indentString=indentString.substring(this._indentPattern.length);
else
indentString = "";
}
sbHtml.append(indentString);
sbHtml.append(line);
sbHtml.append("\n");
if (this._tagsIncIndent.test(line))
indentString+=this._indentPattern;
}
newHtml=sbHtml.toString();
for (var i=0; i<this._protectedData.length; i++)
{
var restoreTag = new RegExp("RADEDITORFORMATTED_" + (i + 1));
var restoreHtml = this._protectedData[i].replace(/\$/gi, "$$$$");
newHtml=newHtml.replace(restoreTag, restoreHtml);
}
return newHtml;
}
}
var ipjEditorSavedRange=null;
function ipjOnClientSelectionChange(editor, args){
if(false){
var elem=editor.getSelectedElement();
var tool=editor.getToolByName("Unlink");
if((tool)&&(elem.tagName=="A")){
tool.setState(0);
}else{
setTimeout(function(){
tool.setState(-1);
},100);
}
}
if(ipjIsiOS&&(editor.get_contentAreaMode()==2)){
ipjEditorSavedRange=editor.getSelection().getRange();
}
}
function ipjOnClientPasteHtml(sender, args)
{
var commandName=args.get_commandName();
var strHtml=args.get_value();
if(commandName=="Paste"){
var filter = new Telerik.Web.UI.Editor.StripPathsFilter([window.location.protocol + "//" + window.location.host]);
var contentElement = document.createElement("SPAN");
contentElement.innerHTML=strHtml;
filter.getHtmlContent(contentElement);
strHtml=contentElement.innerHTML;
if(!ipjIsIE){
strHtml = strHtml.replace(/\n/g, "");
strHtml = "<p>" + strHtml + "</p>";
strHtml = strHtml.replace(/<br[^>]*>[\s]*<br[^>]*>/gi, "</p>\n<p>");
strHtml = strHtml.replace(/<p><\/p>/gi, "<p>&nbsp;</p>");
}
args.set_value(strHtml);
}
}
function ipjSetEditorsVisible(){
if (document.all) return;
for (i=ipjActiveEditors.length-1; i>=0; i--){
ipjActiveEditors[i].SetVisible(true);
}
}
function ipjOnClientCommandExecutingEditor(editor, args, oTool)
{
var commandName;
if(!ipjIsRadAjax){
commandName=args;
}else{
try{
commandName=args.get_commandName();
}catch(err){
commandName=args.value;
}
}
if(ipjEditorSavedRange!=null){
editor.getSelection().selectRange(ipjEditorSavedRange);
ipjEditorSavedRange=null;
}
if(commandName=="StripNonHTML"){
window.setTimeout(function()
{
editor.fire("FormatStripper", {value : "WORD"});
editor.fire("FormatStripper", {value : "SPAN"});
editor.fire("FormatStripper", {value : "SPAN"});
editor.fire("FormatStripper", {value : "CSS"});
}, 100);
args.set_cancel(true);
return false;
}
if(commandName=="ToggleScreenMode"){
var elm=document.getElementById("tblACMAdminToolbar");
if (elm!=null){
var currentZindex=(ipjIsIE? elm.currentStyle.zIndex: document.defaultView.getComputedStyle(elm, null).zIndex);
if (currentZindex>0){
elm.style.zIndex=-1;
}
else{
elm.style.zIndex=2;
}
}
try{
elm = document.getElementById("divAsbToolBar");
if (elm !=null){
var currentZindex=(ipjIsIE ? elm.currentStyle.zIndex : document.defaultView.getComputedStyle(elm, null).zIndex);
if (currentZindex>0){
ipjAsbToolbarZindex=currentZindex;
elm.style.zIndex=-1;
$('#' + editor.get_id()).addClass("fullscreen");
}else{
if (ipjAsbToolbarZindex>0){
elm.style.zIndex=ipjAsbToolbarZindex;
}else{
elm.style.zIndex=1001;
}
$('#' + editor.get_id()).removeClass("fullscreen");
}
}
}catch (e){}
try{
var overlay = $('body').find("div[style*='ModalOverlay.png']");
if (overlay.length==1){
var elm=overlay[0];
var currentZindex=(ipjIsIE ? elm.currentStyle.zIndex : document.defaultView.getComputedStyle(elm, null).zIndex);
if (currentZindex > 0) elm.style.zIndex = -1;//overlay.css("z-index", -1);
else elm.style.zIndex = 9999; //overlay.css("z-index", 9999);
}
}catch (e){}
}
if((commandName=="SetLinkProperties")&&(!ipjIsRadAjax)){
ipjAddInternalLink(editor);
return false;
}
if((commandName=="InsertParagraph")&&(!ipjIsRadAjax)){
if (editor.GetText()=="")  editor.SetHtml("&nbsp;<p>.&nbsp;</p>"); //special case, empty editor
else editor.PasteHtml("<p>" + editor.GetSelectionHtml() + (document.all?".":" ") +"</p>");
var strRadEditorContainerClientID = "RadEContentDiv_" + editor.Id;
var editDoc;
if (editor.Document){
editDoc=editor.Document;
}else{
editDoc=ipjFindObj(strRadEditorContainerClientID);
}
editor.SetActive();
editor.SetFocus();
var range;
var isSelectionControl=false;
if (document.all){
if (editDoc.selection.type=="Control") {
isSelectionControl=true;
var el=editDoc.selection.createRange().commonParentElement();
range=editDoc.body.createTextRange();
range.moveToElementText(el);
range.select();
}
else{
range=editDoc.selection.createRange();
}
range.moveStart("character",-2);
range.collapse(true);
range.moveEnd("character",1);
range.select();
range.pasteHTML("");
}
else{
var sel=editor.ContentWindow.getSelection();
range=sel.getRangeAt(0);
range.setStart(range.startContainer.previousSibling,0);
sel.collapseToStart();
}
return false;
}
if(ipjIsFF&&(commandName=="AbsolutePosition")){
var bTogglePostion=false;
var elem=editor.getSelectedElement();
if (elem.nodeName == "IMG"){
bTogglePostion=true;
}else{
elem = Telerik.Web.UI.Editor.Utils.getElementParentByTag(elem, "TABLE");
if (elem){
bTogglePostion=true;
}
}
if (bTogglePostion)
elem.style.position = (elem.style.position != "absolute") ? "absolute" : "";
args.set_cancel(true);
}
}
function ipjAddDigitalAsset(RadEditor,isLiteEdit)
{
var strArgs = "";
var strRadEditorContainerClientID = "RadEContentDiv_" + RadEditor.Id;
var editDoc;
if (RadEditor.Document){
editDoc=RadEditor.Document;
}else{
editDoc=ipjFindObj(strRadEditorContainerClientID);
}
RadEditor.SetActive();
if(!ipjIsMobile){
RadEditor.SetFocus();
}
var range;
var isSelectionControl=false;
if (document.all && !ipjIsIE9){
if (editDoc.selection.type=="Control") {
isSelectionControl=true;
var el=editDoc.selection.createRange().commonParentElement();
range=editDoc.body.createTextRange();
range.moveToElementText(el);
range.select();
}
else{
range=editDoc.selection.createRange();
}
}
else{
try{
var sel=RadEditor.ContentWindow.getSelection();
range=sel.getRangeAt(0);
}catch(e){
range=null;
}
}
var rangeHtmlText="";
if(range!=null){
rangeHtmlText=(document.all && !ipjIsIE9 ? range.htmlText : ipjGetHtmlTextOfRangeGecko(range));
if (rangeHtmlText.toLowerCase().indexOf("<object")>-1)
{
range.collapse(true);
var intIndex = rangeHtmlText.toLowerCase().indexOf("assetfactory");
if (intIndex>-1)
{
strArgs += '&ObjectAsset=' + rangeHtmlText.substring(intIndex, intIndex + rangeHtmlText.substring(intIndex).toLowerCase().indexOf('"'));
}
}
}
if (isLiteEdit)
{
ipjEditorShowSelectImage(RadEditor, range, rangeHtmlText);
}
else
{
if (document.all && !ipjIsIE9){
strArgs+=ipjAnchorParseIE(editDoc, range, isSelectionControl);
}else{
strArgs+=ipjAnchorParseNN(editDoc, range, isSelectionControl);
}
if (range !=null){
strArgs = strArgs + "&SelectedHtmlText=" + escape(document.all && !ipjIsIE9 ? range.htmlText : ipjGetHtmlTextOfRangeGecko(range));
strArgs = strArgs + "&SelectedText=" + escape(document.all && !ipjIsIE9 ? range.text : ipjGetHtmlTextOfRangeGecko(range));
}
strArgs = strArgs + "&SiteID=" + ipjPageSiteID + "&SiteGroupID=" + ipjPageSiteGroupID;
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseAssetHostFrame.htm");
var dlgWidth=760;
var dlgHeight=690;
if (ipjIsRadAjax){
if(ipjIsChrome&&ipjIsAndroid){
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML2, RadEditor);
}else{
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML, RadEditor);
}
}else{
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML, range);
}
}
};
function ipjW3CValidation(RadEditor)
{
RadEditor.SetActive();
RadEditor.SetFocus();
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalW3CValidationHostFrame.htm");
var dlgWidth=790;
var dlgHeight=470;
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, '', null, null, null, RadEditor);
};
function ipjAddInternalLinkAnchor(addressTextBoxClientID)
{
var strArgs = "";
var addrtextbox=null;
if (addressTextBoxClientID){
var addrtextbox=ipjFindObj(addressTextBoxClientID);
if (addrtextbox){
strArgs = strArgs + "&Address=" + escape(addrtextbox.value);
};
};
if ((addrtextbox==null) || (!addrtextbox)){
alert('Parameter passed to ipjAddInternalLinkAnchor is invalid');
}
else
{
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseLinkAnchorHostFrame.htm");
var dlgWidth=350;
var dlgHeight=460;
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjAddInternalLinkAnchorCallback, addrtextbox);
};
};
function ipjAddInternalLinkAnchorCallback(dlgResult, addrtextbox){
if ((dlgResult != null) && (typeof(dlgResult) == "string")) {
dlgResult=unescape(dlgResult);
if ((dlgResult.length) && (dlgResult.toLowerCase() != "false")) {
addrtextbox.value=dlgResult;
};
};
}
function ipjAddInternalLink(RadEditor,oTool,isLiteEdit)
{
var strRadEditorContainerClientID = "RadEContentDiv_" + RadEditor.Id;
var editDoc;
if (RadEditor.Document){
editDoc=RadEditor.Document;
}else{
editDoc=ipjFindObj(strRadEditorContainerClientID);
}
RadEditor.SetActive();
if(!ipjIsMobile){
RadEditor.SetFocus();
}
var range;
var isSelectionControl=false;
if (document.all && !ipjIsIE9 && !ipjIsIE10){
if (editDoc.selection.type=="Control") {
isSelectionControl=true;
var el=editDoc.selection.createRange().commonParentElement();
range=editDoc.body.createTextRange();
range.moveToElementText(el);
range.select();
}else{
range=editDoc.selection.createRange();
}
}
else{
try{
var sel=RadEditor.ContentWindow.getSelection();
range=sel.getRangeAt(0);
}catch(e){
range=null;
}
}
var strArgs = "";
var rangeHtmlText="";
if(range!=null){
rangeHtmlText=(document.all && !ipjIsIE9 && !ipjIsIE10 ? range.htmlText : ipjGetHtmlTextOfRangeGecko(range));
if (rangeHtmlText.toLowerCase().indexOf("<object")>-1) range.collapse(true);
strArgs += "&ParentDocURL=" + escape(parent.document.URL);
if (document.all && !ipjIsIE9 && !ipjIsIE10){
strArgs+=ipjAnchorParseIE(editDoc, range, isSelectionControl);
}else{
strArgs+=ipjAnchorParseNN(editDoc, range, isSelectionControl);
}
}
if (isLiteEdit)
{
ipjEditorShowSelectLink(RadEditor, range, strArgs);
}
else
{
var strAnchorList = "Top" + ipjGetAllAnchorsNameList();
strArgs += "&AnchorList=" + escape(strAnchorList);
strArgs=ipjTruncateArgsList(strArgs);
if (oTool==null && strArgs.match(/&LinkHRef[^&]*%3Fdid%3D/gi)){
ipjAddDigitalAsset(RadEditor);
return;
}
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseLinkHostFrame.htm");
var dlgWidth=550;
var dlgHeight=600;
if (ipjIsRadAjax){
if(ipjIsChrome&&ipjIsAndroid){
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML2, RadEditor);
}else{
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML, RadEditor);
}
}else{
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjChangeRangeHTML, range);
}
}
};
function ipjTruncateArgsList(strArgs){
return strArgs;
}
function ipjChangeRangeHTML2(newHTML, range){
setTimeout(function(){
ipjChangeRangeHTML(newHTML,range);
},1000);
}
function ipjChangeRangeHTML(newHTML, range){
if ((newHTML != null) && (typeof(newHTML) == "string")) {
newHTML=unescape(newHTML);
if ((newHTML.length > 0) && (newHTML.toLowerCase() != "false")) {
if (ipjIsRadAjax){
if(newHTML.toLowerCase().indexOf("embed")>-1){
if((newHTML.toLowerCase().indexOf("quicktime")>-1)||(newHTML.toLowerCase().indexOf("mediaplayer")>-1)){
var filter=range.get_filtersManager().getFilterByName((ipjIsIE)?"IEKeepObjectParamsFilter":"MozillaKeepFlashString");
newHTML=(filter)?filter.getDesignContent(newHTML):newHTML;
}
}
range.pasteHtml(newHTML);
}else{
if(range.pasteHTML){
range.pasteHTML(newHTML);
}else{
range.deleteContents();
range.insertNode(range.createContextualFragment(newHTML));
}
}
}
}
};
function ipjGetAnchorsNameList(editDoc)
{
var arrAnchors;
if (editDoc.anchors){
arrAnchors=editDoc.anchors;
}else{
arrAnchors=editDoc.contentWindow.document.anchors;
}
var strAnchorList = "";
for (i=0; i<arrAnchors.length; i++){
if (arrAnchors[i].name.length){
strAnchorList += "," + arrAnchors[i].name;
}
}
return strAnchorList;
}
function ipjGetAllAnchorsNameList(){
var strAnchorList = "";
var i;
for (i=0; i<ipjActiveEditors.length; i++){
if (ipjActiveEditors[i] && ipjActiveEditors[i].Document){
strAnchorList+=ipjGetAnchorsNameList(ipjActiveEditors[i].Document);
}
}
return strAnchorList;
}
function ipjAnchorParseNN(editDoc, selrange, isSelectionControl)
{
var strArgs = "";
var selectedLinkPosition=-1;
var selectedLinksNumber=0;
var rngEndContainer=selrange.endContainer;
var rngEndOffSet=selrange.endOffset;
var rngStartContainer=selrange.startContainer;
var rngStartOffSet=selrange.startOffset;
var anchorTagCol = editDoc.getElementsByTagName("A");
var outerHTMLArray=new Array();
for (i=0; i<anchorTagCol.length; i++){
outerHTMLArray.push(ipjGetElementOuterHTMLGecko(anchorTagCol[i]));
}
selrange.setEnd(rngEndContainer, rngEndOffSet);
selrange.setStart(rngStartContainer, rngStartOffSet);
for (i=0; i<anchorTagCol.length; i++){
var linkRange=editDoc.createRange();
linkRange.selectNode(anchorTagCol[i]);
if ((selrange.compareBoundaryPoints(Range.END_TO_START, linkRange)==-1) &&
(selrange.compareBoundaryPoints(Range.START_TO_END, linkRange)==1)){
if(selrange.compareBoundaryPoints(Range.START_TO_START, linkRange)==1){
selrange.setStartBefore(anchorTagCol[i]);
}
if(selrange.compareBoundaryPoints(Range.END_TO_END, linkRange)==-1){
selrange.setEndAfter(anchorTagCol[i]);
}
selectedLinksNumber++;
selectedLinkPosition=i;
}
}
if (selectedLinksNumber==1){
var i=selectedLinkPosition;
strArgs = strArgs + "&LinkOuterHtml=" + escape(outerHTMLArray[i]);
strArgs = strArgs + "&LinkTarget=" + escape(anchorTagCol[i].target);
strArgs = strArgs + "&LinkCssText=" + escape((anchorTagCol[i].cssText)?anchorTagCol[i].cssText:""); // alert("undefined");
strArgs = strArgs + "&LinkClass=" + escape(anchorTagCol[i].className);
strArgs = strArgs + "&LinkName=" + escape(anchorTagCol[i].name);
strArgs = strArgs + "&LinkTitle=" + escape(anchorTagCol[i].title);
strArgs = strArgs + "&LinkInner=" + escape(selrange.toString());
strArgs = strArgs + "&LinkHRef=" + escape(anchorTagCol[i].href);
}else{
strArgs = "&LinkInner=" + escape(ipjGetHtmlTextOfRangeGecko(selrange));
}
editDoc.defaultView.getSelection().removeAllRanges();
editDoc.defaultView.getSelection().addRange(selrange);
return strArgs;
};
function ipjAnchorParseIE(editDoc, selrange, isSelectionControl)
{
var anchorTagCol= editDoc.all.tags("A");
var foundLink=false;
var linkTextRange;
var strArgs = "";
if(selrange == null) alert("selrange is null");
if(selrange.htmlText != "<SPAN></SPAN>")
{
for (i=0; i<anchorTagCol.length && !foundLink; i++){
linkTextRange=editDoc.body.createTextRange();
linkTextRange.moveToElementText(anchorTagCol[i]);
if ((selrange.compareEndPoints("EndToStart",linkTextRange)==1) &&
(selrange.compareEndPoints("StartToEnd",linkTextRange)==-1)) {
if(selrange.compareEndPoints("StartToStart",linkTextRange)==1) {
selrange.setEndPoint("StartToStart",linkTextRange);
}
if(selrange.compareEndPoints("EndToEnd",linkTextRange)==-1) {
selrange.setEndPoint("EndToEnd",linkTextRange);
}
selrange.select();
strArgs = strArgs + "&LinkOuterHtml=" + escape(anchorTagCol[i].outerHTML);
strArgs = strArgs + "&LinkTarget=" + escape(anchorTagCol[i].target);
strArgs = strArgs + "&LinkCssText=" + escape(anchorTagCol[i].cssText);
strArgs = strArgs + "&LinkClass=" + escape(anchorTagCol[i].className);
strArgs = strArgs + "&LinkName=" + escape(anchorTagCol[i].name);
strArgs = strArgs + "&LinkTitle=" + escape(anchorTagCol[i].title);
if (isSelectionControl){
strArgs = strArgs + "&LinkInner=" + escape(anchorTagCol[i].innerHTML);
}
else{
strArgs = strArgs + "&LinkInner=" + escape(anchorTagCol[i].innerText);
}
strArgs = strArgs + "&LinkHRef=" + escape(anchorTagCol[i].href);
foundLink=true;
}
}
}
if (!foundLink)
{
if (!selrange.htmlText.match(/<P>&nbsp;<\/P>$/))
strArgs = strArgs + "&LinkInner=" + escape(selrange.htmlText);
}
return strArgs;
};
function ipjAddDigitalAssetPlainText(textAreaElement)
{
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseAssetHostFrame.htm");
var dlgWidth=760;
var dlgHeight=690;
var strArgs = "SiteID=" + ipjPageSiteID + "&SiteGroupID=" + ipjPageSiteGroupID;
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjInsertAtCaret, textAreaElement);
};
function ipjAddInternalLinkPlainText(textAreaElement)
{
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseLinkHostFrame.htm");
var dlgWidth=550;
var dlgHeight=600;
var strArgs = "&AnchorList=Top" + escape(ipjGetAnchorsNameListPlainText(textAreaElement));
strArgs=ipjTruncateArgsList(strArgs);
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjInsertAtCaret, textAreaElement);
};
function ipjCopyDigitalAssetToClipboard(textAreaElement)
{
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseAssetHostFrame.htm");
var dlgWidth=760;
var dlgHeight=690;
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, null, null, ipjCopyTextToClipboard);
};
function ipjCopyInternalLinkToClipboard(textAreaElement)
{
var dlgUrl = iAppendVirtualPath(ipVirDir, "/CM/WebUI/ModalDialogs/ModalChooseLinkHostFrame.htm");
var dlgWidth=550;
var dlgHeight=600;
var strArgs = "&AnchorList=Top" + escape(ipjGetAnchorsNameListPlainText(textAreaElement));
strArgs=ipjTruncateArgsList(strArgs);
ipjShowModal(dlgUrl, dlgHeight, dlgWidth, strArgs, null, ipjCopyTextToClipboard);
};
function ipjGetAnchorsNameListPlainText(textAreaElement)
{
var strPattern = "<a [^<>]*name=[\"\']([^\"\']*)[\'\"][^>]*>"
var strAnchorList = "";
var htmlstr=textAreaElement.value;
var rx = new RegExp(strPattern,"gi");
var matches=rx.exec(htmlstr);
while (matches!=null && matches[1]!=null){
strAnchorList += "," + matches[1];
htmlstr=htmlstr.substring(matches.index+matches[0].length-1);
rx = new RegExp(strPattern,"gi");
matches=rx.exec(htmlstr);
}
return strAnchorList;
}
function ipjStoreCaret(textAreaElement){
if (textAreaElement.createTextRange) textAreaElement.caretPos=document.selection.createRange().duplicate();
}
function ipjInsertAtCaret(text, txtarea){
if (typeof text=="undefined") return;
text=unescape(text);
if (text!="false") {
if (txtarea.createTextRange && txtarea.caretPos){
var caretPos=txtarea.caretPos;
caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + text + ' ' : caretPos.text + text;
} else if (txtarea.selectionStart || txtarea.selectionStart == '0') { //Gecko
var startPos=txtarea.selectionStart;
var endPos=txtarea.selectionEnd;
txtarea.value=txtarea.value.substring(0, startPos)
+text
+txtarea.value.substring(endPos, txtarea.value.length);
txtarea.focus();
txtarea.selectionStart=startPos+text.length;
txtarea.selectionEnd=startPos+text.length;
}else{
txtarea.value+=text;
txtarea.focus();
}
}
}
function ipjCopyToClipboard(textAreaElement){
if (document.all){
window.clipboardData.setData("Text", textAreaElement.value);
}
else{
ipjGeckoSetClipboard(textAreaElement.value);
}
}
function ipjPasteFromClipboard(textAreaElement){
var text=""
if (document.all){
text = (window.clipboardData.getData('Text')==null?"":window.clipboardData.getData('Text'));
}
else{
text=ipjGeckoGetClipboard();
}
if (text!="") textAreaElement.value=text;
}
function ipjCopyTextToClipboard(text){
text=unescape(text);
if (text!="false") {
if (document.all){
window.clipboardData.setData("Text", text);
}
else{
ipjGeckoSetClipboard(text);
}
}
}
function ipjGeckoSetClipboard(text){
try{
netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
}
catch(e){
alert(e);
alert("To use clipboard functionality in Firefox:\nType \"about:config\" into the address bar.\nThen change the \"signed.applets.codebase_principal_support\" setting to true.");
return;
}
var str = Components.classes["@mozilla.org/supports-string;1"].
createInstance(Components.interfaces.nsISupportsString);
if (!str) return false;
str.data=text;
var trans = Components.classes["@mozilla.org/widget/transferable;1"].
createInstance(Components.interfaces.nsITransferable);
if (!trans) return false;
trans.addDataFlavor("text/unicode");
trans.setTransferData("text/unicode",str,text.length * 2);
var clipid=Components.interfaces.nsIClipboard;
var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
if (!clip) return false;
clip.setData(trans,null,clipid.kGlobalClipboard);
}
function ipjGeckoGetClipboard(){
try{
netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
}
catch(e){
alert(e);
alert("To use clipboard functionality in Firefox:\nType \"about:config\" into the address bar.\nThen change the \"signed.applets.codebase_principal_support\" setting to true.");
return;
}
var clip = Components.classes["@mozilla.org/widget/clipboard;1"].
getService(Components.interfaces.nsIClipboard);
if (!clip) return "";
var trans = Components.classes["@mozilla.org/widget/transferable;1"].
createInstance(Components.interfaces.nsITransferable);
if (!trans) return "";
trans.addDataFlavor("text/unicode");
clip.getData(trans,clip.kGlobalClipboard);
var str=new Object();
var strLength=new Object();
trans.getTransferData("text/unicode",str,strLength);
if (str) str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
if (str) return str.data.substring(0,strLength.value/2);
else return "";
}
var ipjModalChooseAsset_MediaURL = "";
var ipjModalChooseAsset_MediaType = "";
function ipjTree_ModalChooseAssetMainTab(queryStrParam, assetMediaType, altTag, desc, assetType, fileSize, width, height, previewWidth, previewHeight)
{
var queryStrParam=unescape(queryStrParam);
var assetMediaType=unescape(assetMediaType);
var altTag=unescape(altTag);
var desc=unescape(desc);
var assetType=unescape(assetType);
var fileSize=unescape(fileSize);
var width=unescape(width);
var height=unescape(height);
if (ipjFindObj(ipAltTagOrTitleLabelClientID)) ipjFindObj(ipAltTagOrTitleLabelClientID).innerHTML = "Title:";
if (ipjFindObj(ipAltTagOrTitleTextBoxClientID)) ipjFindObj(ipAltTagOrTitleTextBoxClientID).value=altTag;
ipjSetDALinkControlState(assetType,((ipjFindObj(ipChkClearClientID))&&(ipjFindObj(ipChkClearClientID).checked)));
ipjFindObj(ipLabelAltTagTitle).innerHTML = "Title:";
ipjFindObj(ipLabelWidthpxTitle).innerHTML = "";
ipjFindObj(ipLabelHeightpxTitle).innerHTML = "";
ipjFindObj(ipLabelAltTag).innerHTML=altTag;
ipjFindObj(ipLabelDescription).innerHTML=desc;
ipjFindObj(ipLabelAssetType).innerHTML=assetType;
ipjFindObj(ipLabelFileSize).innerHTML=fileSize;
ipjFindObj(ipLabelWidthpx).innerHTML = "";
ipjFindObj(ipLabelHeightpx).innerHTML = "";
ipjFindObj(ipImgMainClientID).src = ipAssetFactory + "?Mode=Thumbnail&Width=" + previewWidth + "&Height=" + previewHeight + "&" + queryStrParam;
ipjModalChooseAsset_ResetDetailsVisibility();
ipjModalChooseAsset_MediaType=assetMediaType;
switch(assetMediaType){
case "Document":
break;
case "Image":
if (ipjFindObj(ipAltTagOrTitleLabelClientID)) ipjFindObj(ipAltTagOrTitleLabelClientID).innerHTML = "Alt Tag:";
ipjFindObj(ipLabelAltTagTitle).innerHTML = "Alt Tag:";
ipjFindObj(ipLabelWidthpxTitle).innerHTML = "Width:";
ipjFindObj(ipLabelHeightpxTitle).innerHTML = "Height:";
ipjFindObj(ipLabelWidthpx).innerHTML=width;
ipjFindObj(ipLabelHeightpx).innerHTML=height;
break;
case "Flash":
ipjModalChooseAsset_MediaURL = ipAssetFactory + "?" + queryStrParam;
ipjModalChooseAsset_SetFlashDetailsVisible();
break;
case "WindowsMedia":
ipjModalChooseAsset_MediaURL = ipAssetFactory + "?" + queryStrParam;
ipjModalChooseAsset_SetAudioVideoDetailsVisible();
break;
case "QuickTime":
ipjModalChooseAsset_MediaURL = ipAssetFactory + "?" + queryStrParam;
ipjModalChooseAsset_SetAudioVideoDetailsVisible();
break;
case "RealMedia":
ipjModalChooseAsset_MediaURL = ipAssetFactory + "?" + queryStrParam;
ipjModalChooseAsset_SetAudioVideoDetailsVisible();
break;
}
}
function ipjModalChooseAsset_ResetDetailsVisibility()
{
ipjFindObj("divAssetDetailsStandard").style.display="block";
ipjFindObj("divAssetDetailsFlash").style.display="none";
ipjFindObj("divAssetDetailsFlashPreviewTag").innerHTML = "";
ipjFindObj("divAssetDetailsFlashPreviewTag").style.display = "none";
ipjFindObj("divAssetDetailsFlashProperties").style.display = "block";
ipjFindObj("chkAssetDetailsFlashPreview").checked=false;
ipjFindObj("divAssetDetailsAudioVideo").style.display="none";
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").innerHTML = "";
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").style.display = "none";
ipjFindObj("divAssetDetailsAudioVideoProperties").style.display = "block";
ipjFindObj("chkAssetDetailsAudioVideoPreview").checked=false;
if (ipjFindObj("rblOpenIn") && ipjFindObj("rblOpenIn_2").checked) {
ipjFindObj("rblOpenIn_0").checked=true;
ipjFindObj("rblOpenIn_1").checked=false;
ipjFindObj("rblOpenIn_2").checked=false;
}
}
function ipjModalChooseAsset_SetFlashDetailsVisible()
{
ipjFindObj("divAssetDetailsStandard").style.display="none";
ipjFindObj("divAssetDetailsAudioVideo").style.display="none";
ipjFindObj("divAssetDetailsFlash").style.display="block";
if (ipjFindObj("rblOpenIn")) {
ipjFindObj("rblOpenIn_0").checked=false;
ipjFindObj("rblOpenIn_1").checked=false;
ipjFindObj("rblOpenIn_2").checked=true;
}
}
function ipjModalChooseAsset_FlashPreviewChecked(chkPreview)
{
if (chkPreview.checked){
ipjFindObj("divAssetDetailsFlashProperties").style.display = "none";
ipjFindObj("divAssetDetailsFlashPreviewTag").style.display = "block";
ipjFindObj("divAssetDetailsFlashPreviewTag").innerHTML = ipjModalChooseAsset_GetFlashTag(true, false, ipjModalChooseAsset_MediaURL);
}
else{
ipjFindObj("divAssetDetailsFlashProperties").style.display = "block";
ipjFindObj("divAssetDetailsFlashPreviewTag").style.display = "none";
ipjFindObj("divAssetDetailsFlashPreviewTag").innerHTML = "";
}
}
function ipjModalChooseAsset_SetAudioVideoDetailsVisible()
{
ipjFindObj("divAssetDetailsStandard").style.display="none";
ipjFindObj("divAssetDetailsFlash").style.display="none";
ipjFindObj("divAssetDetailsAudioVideo").style.display="block";
if (ipjFindObj("rblOpenIn")) {
ipjFindObj("rblOpenIn_0").checked=false;
ipjFindObj("rblOpenIn_1").checked=false;
ipjFindObj("rblOpenIn_2").checked=true;
}
}
function ipjModalChooseAsset_AudioVideoPreviewChecked(chkPreview)
{
if (chkPreview.checked){
ipjFindObj("divAssetDetailsAudioVideoProperties").style.display = "none";
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").style.display = "block";
var strTag="";
switch(ipjModalChooseAsset_MediaType){
case "QuickTime":
strTag=ipjModalChooseAsset_GetQuickTimeTag(true, false, ipjModalChooseAsset_MediaURL);
break;
case "RealMedia":
strTag=ipjModalChooseAsset_GetRealMediaTag(true, false, ipjModalChooseAsset_MediaURL);
break;
default:
strTag=ipjModalChooseAsset_GetWindowsMediaTag(true, false, ipjModalChooseAsset_MediaURL);
break;
}
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").innerHTML = strTag;
}
else{
ipjFindObj("divAssetDetailsAudioVideoProperties").style.display = "block";
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").style.display = "none";
ipjFindObj("divAssetDetailsAudioVideoPreviewTag").innerHTML = "";
}
}
function ipjModalChooseAsset_GetFlashTag(isPreview, useDefaults, mediaURL,h,w){
if(!h){
h=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtFlashHeight).value>200?200:ipjFindObj(ipTxtFlashHeight).value):ipjFindObj(ipTxtFlashHeight).value));
}
if(!w){
w=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtFlashWidth).value>200?200:ipjFindObj(ipTxtFlashWidth).value):ipjFindObj(ipTxtFlashWidth).value));
}
var strTag = ""
strTag += "<object codeBase=http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " align=\"" + (useDefaults?"baseline":ipjFindObj(ipDdlFlashHtmlAlign).value) + "\"";
strTag += " classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\">\n";
strTag += " <param name=\"movie\" value=\"" + mediaURL + "\"/>\n";
if (window.ipTxtFlashBackgroundColor && ipjFindObj(ipTxtFlashBackgroundColor).value!="") {
strTag += " <param name=\"bgcolor\" value=\"" + (useDefaults?"":ipjFindObj(ipTxtFlashBackgroundColor).value) + "\"/>\n";
}
if (window.ipChkFlashTransparent && ipjFindObj(ipChkFlashTransparent).checked){
strTag += " <param name=\"wmode\" value=\"transparent\"/>\n";
}
else{
strTag += " <param name=\"wmode\" value=\"opaque\"/>\n";
}
strTag += " <param name=\"quality\" value=\"" + (useDefaults?"high":ipjFindObj(ipDdlFlashQuality).value) + "\"/>\n";
strTag += " <param name=\"menu\" value=\"" + (useDefaults?"false":ipjFindObj(ipChkFlashMenu).checked) + "\"/>\n";
strTag += " <param name=\"loop\" value=\"" + (useDefaults?"false":ipjFindObj(ipChkFlashLoop).checked) + "\"/>\n";
strTag += " <param name=\"play\" value=\"" + (useDefaults?"true":ipjFindObj(ipChkFlashPlay).checked) + "\"/>\n";
if (!(window.ipChkFlashInsertEmbedTag && !ipjFindObj(ipChkFlashInsertEmbedTag).checked)){
strTag += " <embed pluginspage=\"http://www.macromedia.com/go/getflashplayer\"";
strTag += " align=\"" + (useDefaults?"baseline":ipjFindObj(ipDdlFlashHtmlAlign).value) + "\"";
strTag += " src=\"" + mediaURL + "\"";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " type=\"application/x-shockwave-flash\"";
if (window.ipTxtFlashBackgroundColor && ipjFindObj(ipTxtFlashBackgroundColor).value!="") {
strTag += " bgcolor=\"" + (useDefaults?"":ipjFindObj(ipTxtFlashBackgroundColor).value) + "\"";
}
if (window.ipChkFlashTransparent && ipjFindObj(ipChkFlashTransparent).checked){
strTag += " wmode=\"transparent\"";
}
else{
strTag += " wmode=\"opaque\"";
}
strTag += " quality=\"" + (useDefaults?"high":ipjFindObj(ipDdlFlashQuality).value) + "\"";
strTag += " menu=\"" + (useDefaults?"false":ipjFindObj(ipChkFlashMenu).checked) + "\"";
strTag += " loop=\"" + (useDefaults?"false":ipjFindObj(ipChkFlashLoop).checked) + "\"";
strTag += " play=\"" + (useDefaults?"true":ipjFindObj(ipChkFlashPlay).checked) + "\">";
strTag += " <noembed><span/></noembed>";
strTag += " </embed>\n";
}
strTag += "</object>";
return strTag;
}
function ipjModalChooseAsset_GetWindowsMediaTag(isPreview, useDefaults, mediaURL,h,w){
if(!h){
h=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoHeight).value>200?200:ipjFindObj(ipTxtAudioVideoHeight).value):ipjFindObj(ipTxtAudioVideoHeight).value));
}
if(!w){
w=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoWidth).value>200?200:ipjFindObj(ipTxtAudioVideoWidth).value):ipjFindObj(ipTxtAudioVideoWidth).value));
}
var strTag ="";
strTag += "<object";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " align=\"" + (useDefaults?"baseline":ipjFindObj(ipDdlAudioVideoAlign).value) + "\"";
strTag += " classid=\"clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6\">\n";
strTag += " <param name=\"url\" value=\"" + mediaURL + "\"/>\n";
strTag += " <param name=\"windowlessVideo\" value=\"true\"/>\n"; //- this helps with player z-index in IE but not in chrome - ACM-6897
strTag += " <param name=\"autostart\" value=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoAutoStart).checked)) + "\"/>\n";
strTag += " <param name=\"uimode\" value=\"" + (useDefaults?"full":(ipjFindObj(ipChkAudioVideoShowControls).checked)?"full":"none") + "\"/>\n";
strTag += " <param name=\"wmode\" value=\"opaque\"/>\n";//acm-6896
if (!(window.ipChkAudioVideoInsertEmbedTag && !ipjFindObj(ipChkAudioVideoInsertEmbedTag).checked)){
strTag += " <embed ";
strTag += " pluginspage=\"http://www.microsoft.com/Windows/MediaPlayer\"";
strTag += " align=\"" + (useDefaults?"":ipjFindObj(ipDdlAudioVideoAlign).value) + "\"";
strTag += " src=\"" + mediaURL + "\"";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " windowlessvideo=\"true\"";//- this helps with player z-index in IE but not in chrome - ACM-6897
strTag += " wmode=\"opaque\"";//acm-6896
strTag += " type=\"application/x-mplayer2\"";
if (isPreview && !document.all && location.href.indexOf("ModalChooseAsset.aspx")>=0) {
strTag += " showcontrols=\"0\"";
strTag += " autostart=\"0\">";
}else{
strTag += " showcontrols=\"" + (useDefaults?"1":(ipjFindObj(ipChkAudioVideoShowControls).checked?1:0)) + "\"";
strTag += " autostart=\"" + (useDefaults?"1":(ipjFindObj(ipChkAudioVideoAutoStart).checked?1:0)) + "\">";
}
strTag += " <noembed><span/></noembed>";
strTag += " </embed>\n";
}
strTag += "</object>";
return strTag;
}
function ipjModalChooseAsset_GetQuickTimeTag(isPreview, useDefaults, mediaURL,h,w){
if(!h){
h=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoHeight).value>200?200:ipjFindObj(ipTxtAudioVideoHeight).value):ipjFindObj(ipTxtAudioVideoHeight).value));
}
if(!w){
w=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoWidth).value>200?200:ipjFindObj(ipTxtAudioVideoWidth).value):ipjFindObj(ipTxtAudioVideoWidth).value));
}
var strTag ="";
strTag += "<object codebase=\"http://www.apple.com/qtactivex/qtplugin.cab\"";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " classid=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\">\n";
strTag += " <param name=\"src\" value=\"" + mediaURL + "\"/>\n";
strTag += " <param name=\"autoplay\" value=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoAutoStart).checked)) + "\"/>\n";
strTag += " <param name=\"controller\" value=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoShowControls).checked)) + "\"/>\n";
if (!(window.ipChkAudioVideoInsertEmbedTag && !ipjFindObj(ipChkAudioVideoInsertEmbedTag).checked)){
strTag += " <embed ";
strTag += " pluginspage=\"http://www.apple.com/quicktime/download/\"";
strTag += " src=\"" + mediaURL + "\"";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " type=\"video/quicktime\"";
strTag += " controller=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoShowControls).checked)) + "\"";
strTag += " autoplay=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoAutoStart).checked)) + "\">";
strTag += " <noembed><span/></noembed>";
strTag += " </embed>\n";
}
strTag += "</object>";
return strTag;
}
function ipjModalChooseAsset_GetRealMediaTag(isPreview, useDefaults, mediaURL,h,w){
if(!h){
h=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoHeight).value>200?200:ipjFindObj(ipTxtAudioVideoHeight).value):ipjFindObj(ipTxtAudioVideoHeight).value));
}
if(!w){
w=(useDefaults?200:(isPreview?(ipjFindObj(ipTxtAudioVideoWidth).value>200?200:ipjFindObj(ipTxtAudioVideoWidth).value):ipjFindObj(ipTxtAudioVideoWidth).value));
}
var strTag ="";
strTag += "<object";
strTag += " width=\"" + w + "\"";
strTag += " height=\"" + h + "\"";
strTag += " classid=\"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA\">\n";
strTag += " <param name=\"src\" value=\"" + mediaURL + "\"/>\n";
strTag += " <param name=\"autostart\" value=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoAutoStart).checked)) + "\"/>\n";
strTag += " <param name=\"controls\" value=\"" + (useDefaults?"All":(ipjFindObj(ipChkAudioVideoShowControls).checked)?"All":"ImageWindow") + "\"/>\n";
if (!(window.ipChkAudioVideoInsertEmbedTag && !ipjFindObj(ipChkAudioVideoInsertEmbedTag).checked)){
strTag += " <embed ";
strTag += " pluginspage=\"http://www.real.com/products/player/\"";
strTag += " src=\"" + mediaURL + "\"";
strTag += " width=\"" + h + "\"";
strTag += " height=\"" + w + "\"";
strTag += " controls=\"" + (useDefaults?"All":(ipjFindObj(ipChkAudioVideoShowControls).checked)?"All":"ImageWindow") + "\"";
strTag += " autostart=\"" + (useDefaults?"true":(ipjFindObj(ipChkAudioVideoAutoStart).checked)) + "\">";
strTag += " <noembed><span/></noembed>";
strTag += " </embed>\n";
}
strTag += "</object>";
return strTag;
}
function ipjSetDALinkControlState(mimeType,doNotEnable){
if(mimeType.startsWith('image')){
if(!doNotEnable){
if (ipjFindObj(ipLinkCheckboxClientID)){
ipjFindObj(ipLinkCheckboxClientID).disabled=false;
}
if (ipjFindObj(ipLinkHyperlinkClientID)){
ipjFindObj(ipLinkHyperlinkClientID).disabled=false;
ipjFindObj(ipLinkHyperlinkClientID).style.color="";
}
if (ipjFindObj(ipLinkLabelClientID)){
ipjFindObj(ipLinkLabelClientID).style.color="";
}
}
}else{
if (ipjFindObj(ipLinkCheckboxClientID)){
ipjFindObj(ipLinkCheckboxClientID).disabled=true;
}
if (ipjFindObj(ipLinkHyperlinkClientID)){
ipjFindObj(ipLinkHyperlinkClientID).disabled=true;
ipjFindObj(ipLinkHyperlinkClientID).style.color="gray";
}
if (ipjFindObj(ipLinkLabelClientID)){
ipjFindObj(ipLinkLabelClientID).style.color="gray";
}
}
}
function ipEditLink(itemID)
{
document.getElementById('hdnUserAction').value='Edit;' + itemID;
__doPostBack('', '');
};
function ipAddLink(itemID)
{
document.getElementById('hdnUserAction').value='Add;' + itemID;
__doPostBack('', '');
};
var ipjUnlockPageCancel=false;
function ipjLockPage()
{
var objXMLHttp=iGetXmlHttpObject();
var strURL = iAppendVirtualPath(ipVirDir, "/CM/WebUI/Admin/ServerAction.aspx?action=lock_page&pagedefid=" + ipCurrentPageDefID*1 + "&dt=" + new Date().getTime());
objXMLHttp.open('GET', strURL, true);
objXMLHttp.send(null);
}
function ipjUnlockPage()
{
if (ipjUnlockPageCancel) return;
var objXMLHttp=iGetXmlHttpObject();
var strURL = iAppendVirtualPath(ipVirDir, "/CM/WebUI/Admin/ServerAction.aspx?action=unlock_page&pagedefid=" + ipCurrentPageDefID*1 + "&dt=" + new Date().getTime());
objXMLHttp.open('GET', strURL, true);
objXMLHttp.send(null);
}
function ipjUnlockPageByID(id)
{
var objXMLHttp=iGetXmlHttpObject();
var strURL = iAppendVirtualPath(ipVirDir, "/CM/WebUI/Admin/ServerAction.aspx?action=unlock_page&pagedefid=" + id*1 + "&dt=" + new Date().getTime());
objXMLHttp.open('GET', strURL, true);
objXMLHttp.send(null);
}
function ipjUnlockPageDoCancel()
{
ipjUnlockPageCancel=true;
}
function ipjUnlockPageDoCancelWithDoPostBack(eventTarget, eventArgument)
{
ipjUnlockPageCancel=true;
return __oldDoPostBack(eventTarget, eventArgument);
}
function ipjUnlockPageSelf()
{
ipjUnlockPage();
document.getElementById('cllLockedBySelf').style.display='none';
}
function ipjUnlockPageByIDSelf(id)
{
ipjUnlockPageByID(id);
document.getElementById('divLockedBySelf'+ id*1).style.display='none';
}
var ipjPageLockWarningCounter=0;
var ipjPageLockWarningTimer=null;
function ipjPageLockWarningSet(){
if (window.ipjPageLockWarningTimer) clearTimeout(ipjPageLockWarningTimer);
ipjPageLockWarningTimer = setTimeout("ipjShowPageLockWarning()", ipjPageLockWarningSecondsTo*1000);
}
function ipjShowPageLockWarning(){
ipjPageLockWarningCounter=ipjPageLockWarningCounterInitial;
ipjShowModalDialogPanel(ipjPageLockWarningModalID);
ipjPageLockWarningCountdown();
}
function ipjPageLockWarningCountdown(){
document.getElementById("divPageLockWarningSeconds").innerHTML=ipjPageLockWarningCounter+" seconds";
if (ipjPageLockWarningCounter<=0){
ipjUnlockPage();
document.getElementById("divPageLockWarningText").innerHTML="<img alt='Alert' src='"+ipSysImageDir+"/caution.gif'/> Your lock has expired.";
document.getElementById("divPageLockWarningButton").value="OK";
document.getElementById("divPageLockWarningButton").onclick=ipjHideModalDialogPanel;
}
else{
ipjPageLockWarningCounter--;
ipjPageLockWarningTimer = setTimeout("ipjPageLockWarningCountdown()", 1000);
}
}
function ipjPageLockWarningExtend(){
clearTimeout(ipjPageLockWarningTimer);
ipjHideModalDialogPanel();
ipjLockPage();
ipjPageLockWarningSecondsTo=(ipjPageLockWarningSecondsDuration-ipjPageLockWarningCounterInitial);
ipjPageLockWarningSet();
}
var ipjScrollForm=null;
var ipjScrollBody=null;
var ipjScrollPositionSet=false;
function ipjRestoreScrollPosition(){
if (ipjScrollForm && ipjScrollBody && ipjScrollForm.__FORMHEIGHT.value!=0){
if (ipjScrollBody.scrollTop==0) ipjScrollBody.scrollTop=ipjScrollForm.__SCROLLPOS.value;
}
}
function ipjReleaseScrollPosition(){
if (ipjScrollForm && ipjScrollBody){
ipjScrollBody.onscroll=ipjSaveScrollPosition;
}
}
function ipjSaveScrollPosition(){
if (ipjScrollForm && ipjScrollBody){
ipjScrollForm.__SCROLLPOS.value=ipjScrollBody.scrollTop;
ipjScrollForm.__FORMHEIGHT.value=ipjScrollForm.offsetHeight;
}
}
function ipjClearScrollPosition(){
if (ipjScrollForm && ipjScrollBody && ipjScrollPositionSet==true){
ipjScrollForm.style.height=null;
}
}
function ipjInitScrollPosition(){
if (!document.all) return;
ipjScrollForm = document.getElementById('IronPointForm');
ipjScrollBody = document.getElementById('thebody');
if (ipjScrollForm && ipjScrollBody && ipjScrollForm.__FORMHEIGHT){
ipjScrollBody.onscroll=ipjRestoreScrollPosition;
ipjScrollBody.onload=ipjReleaseScrollPosition;
if (ipjScrollForm.__FORMHEIGHT.value!=0) ipjScrollForm.style.height=ipjScrollForm.__FORMHEIGHT.value;
ipjRestoreScrollPosition();
ipjScrollPositionSet=true;
}
else{
setTimeout(ipjInitScrollPosition,50);
}
}
String.prototype.getFuncBody=function(){
var str=this.toString();
str=str.replace(/[^{]+{/,"");
str=str.substring(0,str.length-1);
str = str.replace(/\n/gi,"");
if(!str.match(/\(.*\)/gi))str += ")";
return str;
}
function IPApplyToChildren(link, callerID, command, updateControlID, updateValue)
{
var newlink = document.createElement('a');//ACM 5529, 5649
newlink.innerHTML = 'Saving...';
newlink.style.color = "blue";
newlink.onclick = new Function("javascript:alert('Save is in progress.'); return false;");
link.parentNode.appendChild(newlink);
link.style.display = "none";
var returnFunc=function (objXMLHTTP){
if (objXMLHTTP.responseText.charAt(0) == 's') {
if (updateControlID)
document.getElementById(updateControlID).value=updateValue;
if (objXMLHTTP.responseText.substring(1).length>0)
alert(objXMLHTTP.responseText.substring(1));
}
link.style.display = "";
if (newlink !=null)  link.parentNode.removeChild(newlink);
};
ipjDoXmlHttpRequest(callerID, document.forms['IronPointForm'].action, command, returnFunc);
}
function IPShowMembersModal(callerID, updatePanelID, dialogURL, siteGroupID, instanceID, nonPublicOnly)
{
var objAjaxReturnFunc=function(objXMLHTTP)
{
if (objXMLHTTP.responseText.charAt(0) == 's')
{
document.getElementById(updatePanelID).innerHTML=objXMLHTTP.responseText.substring(1);
}
};
var objModalReturnFunc=function(args)
{
if (args == 'true')
{
document.getElementById(updatePanelID).innerHTML = 'Updating...';
ipjDoXmlHttpRequest(callerID, document.forms['IronPointForm'].action, 'UpdateMembers', objAjaxReturnFunc);
}
};
ipjShowModal(dialogURL, 600, 800, 'SiteGroupID=' + siteGroupID + '&InstanceID=' + instanceID + '&NonPublicOnly=' + nonPublicOnly, null, objModalReturnFunc);
}
function ipjALRestoreDefault(szCallerID, textBoxID){
var strResponse = ipjDoXmlHttpRequestSynchronous(szCallerID, document.forms['IronPointForm'].action, 'restoreDefault');
if (strResponse.charAt(0) == 's') {
var strSuccess=strResponse.substring(1, 2);
if (strSuccess == '1') {
document.getElementById(textBoxID).value=strResponse.substring(2);
}
else{
alert(strResponse.substring(2));
}
}
}
function ipjToggleSelectDefaultPanel(show, divMainClientID, divSelectDefaultClientID){
var divMain=document.getElementById(divMainClientID);
var divSelectDefault=document.getElementById(divSelectDefaultClientID);
if (show){
divMain.style.display = 'none';
divSelectDefault.style.display = '';
}else{
divMain.style.display = '';
divSelectDefault.style.display = 'none';
}
}
function ipjALSelectDefault(szCallerID, textBoxID, divMainClientID, divSelectDefaultClientID){
var strResponse = ipjDoXmlHttpRequestSynchronous(szCallerID, document.forms['IronPointForm'].action, 'selectDefault');
if (strResponse.charAt(0) == 's') {
var strSuccess=strResponse.substring(1, 2);
if (strSuccess == '1') {
document.getElementById(textBoxID).value=strResponse.substring(2);
ipjToggleSelectDefaultPanel(false, divMainClientID, divSelectDefaultClientID);
}
else{
alert(strResponse.substring(2));
}
}
}
function ipjExtractFromString(s,tagName,szDefault){
var str=szDefault;
try{
var tag="<IP>"+tagName+"</IP>";
var iFirst=s.indexOf(tag);
var iLast=s.lastIndexOf(tag);
if((iFirst!=iLast)&&(iLast>-1)){
str=s.substring(iFirst+tag.length,iLast);
}
}catch(err){
}
return str;
}
function ipjStringContainsTag(s,tagName){
return (s.indexOf("<IP>"+tagName+"</IP>")>=0);
}