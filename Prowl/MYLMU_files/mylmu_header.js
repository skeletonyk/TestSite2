/* mylmu_header.js */

function getParent(element, parent){
	if(typeof element=="string") {
		element=document.getElementById(element);
	};
	
	if(!element) {
		return null;
	};
	
	var elements=[];
	
	if(typeof parent!="string") {/*no parent: gets all parents till #document*/
		while(element.parentNode) {
		element=element.parentNode;
		elements.unshift(element);
			if (element==parent) {
				return elements;
			};
		}
	}
	else{/*string, presumes you want to locate the first parent node that is such TAG*/
		parent=parent.toUpperCase();
	
		while(element.parentNode){
			element=element.parentNode;
			elements.unshift(element);
			if (element.nodeName && element.nodeName.toUpperCase()==parent) {
				return element;
			};
		}
	};
	return element;
	/* keep this comment to reuse freely: 	http://www.fullposter.com/?1 */
}

function hideParent(element, parent){
	var panel = getParent(element, parent);
	
	panel.style.display = "none";
	panel.style.visibility = "hidden";		
}
