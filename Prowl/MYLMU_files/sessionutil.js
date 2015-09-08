/* sessionutil.js */

var MAX_LOOP = 40; /* private timeout : public timeout */
var TIMEOUT_WARNING_MS = 60 * 1000;
var TIMEOUT_MS = 15 * 60 * 1000; /* set to public timeout */
var DEBUG = false;

var displayWarningOn = false;

var loginaccess = "";
var counter = MAX_LOOP;
var logout = true;
var time0 = new Date();

var timeoutTime = (new Date()).getTime();

var projectedWarningTime = null;
var tolerance_ms = 2500;

//var publictimeout = 2 * 60 * 1000 - 5; 

function doResetTimeout() {
	doPrint('doResetTimeout');
	doSesssionTimeout();
	doRefreshSession();
}

function getTime() {
  var now = new Date();
  return now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
}
	
function doSesssionTimeout() {
	doPrint(document.cookie);
	loginaccess = getCookie('MYLMU_LOGIN_ACCESS');
	doPrint(loginaccess + "|" + getTime());

	if (loginaccess == null) {
		loginaccess = 'public';
	}

	if (loginaccess.toLowerCase() == 'private') {
		tolerance_ms = 10000; 
		doPrivate();
	}
	else {
		tolerance_ms = 2500; 
		doPublic();
	}
}

function doPublic() {
	doPrint('doPublic' + '|' + getTime());
	
	projectedWarningTime = (new Date()).getTime() + TIMEOUT_MS - TIMEOUT_WARNING_MS;
	setTimeout("doSessionTimeoutWarning()", TIMEOUT_MS - TIMEOUT_WARNING_MS);
}

function doPrint(print) {
    if (DEBUG) {
        doAjax("/LmuUtil/printconsole.jsp", "print=" + print , doNothing);
    }
}

function doRefreshSession() {
	doAjax("/portal/page/portal/mylmu/dummy", "", doNothing);
}


function doSessionTimeoutWarning() {
	var currentTime = (new Date()).getTime();
	
	tolerance_ms = 2000;  /* NEED TO CHANGE */
	if (projectedWarningTime - currentTime > tolerance_ms) {
		doPrint('doSessionTimeoutWarning ' + getTime() + ' - cancelled: ' + (projectedWarningTime - currentTime));
		return;
	}
	
	logout = true;
	
	timeoutTime = (new Date()).getTime() + TIMEOUT_WARNING_MS;
	setTimeout("doLogout()", TIMEOUT_WARNING_MS);
	time0 = new Date();

	showSessionTimeoutWarning();
}

/*
function doPrivateWarning() {
	logout = true;
	timeoutTime = (new Date()).getTime() + TIMEOUT_WARNING_MS;
	setTimeout("doLogout()", TIMEOUT_WARNING_MS);
	time0 = new Date();

	showSessionTimeoutWarning();
}
*/

function doPrivate() {
	counter = MAX_LOOP;
	doPrint('doPrivate - counter: ' + counter + '|' + getTime());
	
	doPrivateTimer();
}

function doPrivateTimer() {
	projectedWarningTime = (new Date()).getTime() + TIMEOUT_MS;
	
	setTimeout("extendSession()", TIMEOUT_MS);
}

function extendSession() {
    doRefreshSession();
	
	var currentTime = (new Date()).getTime();
	
	tolerance_ms = 2000;  /* NEED TO CHANGE */
	
	if (projectedWarningTime - currentTime > tolerance_ms) {
		doPrint('extendSession ' + getTime() + ' - cancelled: ' + (projectedWarningTime - currentTime));
		return;
	}	
	
	counter = counter - 1;
	
	if (counter > 1) {
        doPrint("" + counter + " --> private timer");
		doPrivateTimer(); 
	}
	else {
        doPrint("" + counter + " -->  private warning" );
		projectedWarningTime = (new Date()).getTime() + TIMEOUT_MS  - TIMEOUT_WARNING_MS;
	
		setTimeout("doSessionTimeoutWarning()", TIMEOUT_MS - TIMEOUT_WARNING_MS);
	}
}

function doCancelLogout() {
	logout = false;
}

function doLogout() {
	doPrint("logout=" + logout);
	if (logout) {
		doPrint("logging out ... " + getTime());
        doPortalLogout();
	}
}

function doPortalLogout() {
     doPrint('doPortalLogout - ' + getTime());
     var portalLogoutUrlElement = document.getElementById('portalLogoutUrl');
     self.location.href= portalLogoutUrlElement.href;
}

function doNothing() {
}	

function showSessionTimeoutWarning() {
	displayWarningOn = true;
	displayRemainingTime();
	showSessionTimeoutOverlay();
}

function displayRemainingTime() {
	var sessionexpirationtime = document.getElementById('sessionexpirationtime');
	var currentTime = (new Date()).getTime();
	var remainingSeconds = Math.round((timeoutTime - currentTime) / 1000) - 1;
	if (remainingSeconds < 0) {
		remainingSeconds = 0;
	}
	
	doPrint("remaining: " + remainingSeconds);
	sessionexpirationtime.innerHTML = remainingSeconds + " seconds";
	if (displayWarningOn) {
		setTimeout('displayRemainingTime()', 1000);
	}
}

function closeSessionTimeoutWarning() {
	closeSessionTimeoutOverlay('sessionTimeoutOverlay');
	displayWarningOn = false;
}

function XshowSessionTimeoutWarningX() {
	var obj = document.getElementById("stretchbar");
	var x = parseInt(obj.offsetLeft);
	var y = parseInt(obj.offsetTop);
	var height = parseInt(obj.clientHeight);
	var width = parseInt(obj.clientWidth);
	var modal = document.getElementById("announcement_modal");

	var popup_width = 300;
	var x_offset = (width - popup_width) / 2;
	
	modal.style.top = (y + height + 50) + "px";
	modal.style.left = (x + x_offset) +"px";
	modal.style.width = popup_width + "px"; 
	
	Element.show('sessionTimeoutOverlay');
	
	Element.toggle('announcement_modal_bg');
	var nodeToClone = $('sessionTimeoutOverlay').cloneNode(true);
	Element.remove('sessionTimeoutOverlay');
	new Insertion.After('announcement_closeModalButton', nodeToClone);
	Effect.Appear('announcement_modal', {duration: 0.2});

	Element.addClassName(modal, 'announcementModal');
}

function continueSession() {
	doPrint('continue session');
	//closeSessionTimeoutOverlay('sessionTimeoutOverlay');
	closeSessionTimeoutWarning();
	
	var time1 = new Date();
	var diff = time1.getTime()-time0.getTime();
	doPrint(diff + " ms");
	
	if (diff > TIMEOUT_WARNING_MS) {
		logout = true;
		doPrint("exceeds");
	}
	else {
		logout = false;
		doRefreshSession();
		doPrint('overlay closed');
		
		// doPrivate();
		if (loginaccess.toLowerCase() == 'private') {
			//alert('PRIVATE ...');
			
			doPrivate();
		}
		else {
			doPublic();
		}		
	}
	
}
		
