var BRNAME_OPERA		= "opera";
var BRNAME_MSIE		= "msie";
var BRNAME_MSIE_8		= "msie 8";
var BRNAME_MSIE_7		= "msie 7";
var BRNAME_MSIE_6		= "msie 6";
var BRNAME_SAFARI		= "safari";
var BRNAME_MOZILLA		= "mozilla";
var BRNAME_FIREFOX		= "firefox";
var BRNAME_SEAMONKEY	= "seamonkey";
var isSafari2 = false;
var AJAX_ERROR_RESPONSE = false;
var xmlHttp;

// application specific

function setCalendarContent() {
	setCallbackContent("calendarContent");
}

function setDayContent() {
	setCallbackContent("dayViewOverlay");
}

function setCallbackContent(id) {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		var responseText = xmlHttp.responseText;
		document.getElementById(id).innerHTML = responseText;
		return true;
	}
	return false;
}

function appendCallbackContent(id) {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		var element = document.getElementById(id);
		element.innerHTML += xmlHttp.responseText;
		return true;
	}
	return false;
}

function clearInnerHTMLContent(id) {
	var element = document.getElementById(id);
	if (element != null) {
		element.innerHTML = "";
	}
}

function checkForAJAXError() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		AJAX_ERROR_RESPONSE = false;
		if (xmlHttp.responseText.length > 0) {
			var xml = toXML(xmlHttp.responseText);
			var root = xml.getElementsByTagName("errors")[0];
			if (root != null) {
				AJAX_ERROR_RESPONSE = true;
				var errors = root.childNodes;
				var inner = "";
				for (var i=0; i<errors.length; i++) {
					inner += "<h2>"+errors[i].attributes[0].nodeValue+"</h2>";
					var messages = errors[i].childNodes;
					for (var j=0; j<messages.length; j++) {
						inner += messages[j].firstChild.nodeValue+"<br/>";
					}
				}
				document.getElementById("errorMessageSection").innerHTML = inner;
				Element.show("errorMessageSection"); 
				Effect.Pulsate("errorMessageSection", {pulses: 3, from: .5, to: 1});
			}
		}
	}
}

// utility
function getChildElementById(node, id) {
	if (node.nodeType == 1) {
		if (node.id.toLowerCase() == id.toLowerCase()) {
			return node;
		}
		var children = node.childNodes;
		var child = null;
		for (var i=0; i<children.length; i++) {
			child = getChildElementById(children[i], id);
			if (child != null)
				return child;
		}
	}
	return null;
}

function getChildElementsById(parent, id) {
	if (parent != null && id != null && id != '') {
		var childrenFound = new Array();
		var children = parent.childNodes;
		var counter = 0;
		var child = null;
		for (var i=0; i<children.length; i++) {
			child = getChildElementById(children[i],id);
			if (child != null) {
				childrenFound[counter++] = children[i];
			}
		}
		return childrenFound;
	}
	return null;
}

function doAjax(url, data, functionCall) {
	xmlHttp = GetXmlHttpObject();
	if (xmlHttp == null) {
		alert("Please refer to Technical FAQ for currently supported browsers.");
		return;
	}
	
	xmlHttp.open("POST", url, false);
	
	if (browserName() == BRNAME_MSIE || 
		browserName() == BRNAME_MSIE_8 || 
	    browserName() == BRNAME_MSIE_7 ||
		browserName() == BRNAME_MSIE_6 ||
		browserName() == BRNAME_SAFARI) {
		if (functionCall != null) {
			xmlHttp.onreadystatechange = functionCall;
		}
	}
	
	xmlHttp.setRequestHeader("Method", "POST "+url+" HTTP/1.1");
	xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	
	if (data != null) {
		xmlHttp.send(data);
	} else {
		xmlHttp.send("");
	}
	
	if (browserName() == BRNAME_FIREFOX ||
		browserName() == BRNAME_OPERA ||
		browserName() == BRNAME_SEAMONKEY ||
		browserName() == BRNAME_MOZILLA) {
		// Firefox does not invoke onreadystatechange call
		// that's why we must call the function directly
		if (functionCall != null) {
			functionCall();
		}
	} 
}

//This function creates the XMLHTTP Object
//
function GetXmlHttpObject() {
	var xmlHttpLocal = null;	
	if (browserName() == BRNAME_FIREFOX ||
		browserName() == BRNAME_SAFARI ||
		browserName() == BRNAME_OPERA ||
		browserName() == BRNAME_MOZILLA ||
		browserName() == BRNAME_SEAMONKEY) {
	
		xmlHttpLocal = new XMLHttpRequest();
	} else {
		if (browserName() == BRNAME_MSIE ||
		    browserName() == BRNAME_MSIE_8 ||
		    browserName() == BRNAME_MSIE_7 ||
			browserName() == BRNAME_MSIE_6) {
			try {
				xmlHttpLocal = new ActiveXObject("MSXML.ServerXMLHTTP.3.0");
			} catch (e) {
				xmlHttpLocal = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
	}
	return xmlHttpLocal;
}

function toXML(xmlString) {
	var xmlDoc;
	if (window.ActiveXObject) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.loadXML(xmlString);
	} else {
		var parser=new DOMParser();
		xmlDoc =parser.parseFromString(xmlString,"text/xml");
	}	
	return xmlDoc;
}

function browserName() {
	var bwsrName = "";
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf(BRNAME_OPERA) > -1) {
		bwsrName = BRNAME_OPERA;
	} else if (ua.indexOf(BRNAME_MSIE_8) > -1) {
		bwsrName = BRNAME_MSIE_8;
	} else if (ua.indexOf(BRNAME_MSIE_7) > -1) {
		bwsrName = BRNAME_MSIE_7;
	} else if (ua.indexOf(BRNAME_MSIE_6) > -1) {
		bwsrName = BRNAME_MSIE_6;
	} else if (ua.indexOf(BRNAME_MSIE) > -1) {
		// ie 9 & up
		bwsrName = BRNAME_MSIE;
	} else if (ua.indexOf(BRNAME_SAFARI) > -1) {
		bwsrName = BRNAME_SAFARI;
		var index = ua.indexOf(BRNAME_SAFARI);
		var version = ua.substring(index+7,index+8);
		if (version == "4")
			isSafari2 = true;
	} else if (ua.indexOf(BRNAME_FIREFOX) > -1) {
		bwsrName = BRNAME_FIREFOX;
	} else {
		bwsrName = BRNAME_MOZILLA;
	}

	return bwsrName;
}

function showOverlay(overlayToShow) {
	showDeadCenterDiv('modal');
	
	Element.show(overlayToShow);
	Element.toggle('modal_bg');
	var nodeToClone = $(overlayToShow).cloneNode(true);
	Element.remove(overlayToShow);
	new Insertion.After('closeModalButton', nodeToClone);
	Effect.Appear('modal', {duration: 0.2});
}

function closeOverlay(overlayToClose) {
	Element.toggle(overlayToClose);
	Element.toggle('modal_bg');
	Effect.toggle('modal', 'appear', {duration: .2});
	return false;
}

function encode(string) {
	string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }

    return utftext;
}

function showDeadCenterDiv(divid) {
	var div = document.getElementById(divid);
	if (div != null) {
		var divStyle = div.style;
		var width = divStyle.width;
		var height = divStyle.height;
		// First, determine how much the visitor has scrolled
		var scrolledX, scrolledY;
		if(self.pageYoffset) {
			scrolledX = self.pageXoffset;
			scrolledY = self.pageYoffset;
		} else if(document.documentElement && document.documentElement.scrollTop ) {
			scrolledX = document.documentElement.scrollLeft;
			scrolledY = document.documentElement.scrollTop;
		} else if( document.body ) {
			scrolledX = document.body.scrollLeft;
			scrolledY = document.body.scrollTop;
		}
	
		// Next, determine the coordinates of the center of browser's window
		var screenWidth, screenHeight;
		if( self.innerHeight ) {
			screenWidth = self.innerWidth;
			screenHeight = self.innerHeight;
		} else if( document.documentElement && document.documentElement.clientHeight ) {
			screenWidth = document.documentElement.clientWidth;
			screenHeight = document.documentElement.clientHeight;
		} else if( document.body ) {
			screenWidth = document.body.clientWidth;
			screenHeight = document.body.clientHeight;
		}
		
		if (width.indexOf('%') > -1) {
			width = width.substring(0, width.indexOf("%"));
			width = screenWidth * (width/100);
		} else if (width.indexOf('px')) {
			width = width.substring(0, width.indexOf("px"));
		}
		
		if (height.indexOf("%") > -1) {
			height = height.substring(0, height.indexOf("%"));
			height = screenHeight * (height/100);
		} else if (height.indexOf("px")) {
			height = height.substring(0, height.indexOf("px"));
		}
		
		// width is the width of the div, height is the height of the
		// div passed as arguments to the function:
		var leftoffset = scrolledX + (screenWidth - width) / 2;
		var topoffset = scrolledY + (screenHeight - height) / 2;
		// The initial width and height of the div can be set in the
		// style sheet with display:none; divid is passed as an argument to // the function
		divStyle.position='absolute';
		if (topoffset < 0)
			topoffset = 0;
		divStyle.top = topoffset + 'px';
		divStyle.left = leftoffset + 'px';
	}
}
