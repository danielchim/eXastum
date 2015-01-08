/*
Copyright 2014 Brian Millar
Macgril JS is free software:
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
Macgril JS is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Macgril JS. If not, see <http://www.gnu.org/licenses/>

In addition to these terms I also add (under the GNU GPL Version 3
Section 7) the condition that in modified versions of this library
you must give credit to me for the original and provide an original
Macgril JS download link from one of my sources. You must also state
that you have made changes. This can be done in comments at the top of
your library. Redistrubuted exact copies should be left as is. If no code
was modified then you may not modify these notices.

_______________________________________________________________________
|>--------------------------LIBRARY--NOTES---------------------------<|
|- Macgril.js replaces the eXastum.js library for general use and is -|
|- now the primary library of the eXastum project itself. eXastum.js -|
|- now exists only as eXastum specific functions that are not really -|
|- useful outside of the eXastum project and Macgril.js takes over   -|
|- as my main general purpose library. Macgril JS will also replace  -|
|- JS_Prompt and EZasPI.js projects as well as many others.          -|
|- By reducing all this functionality into a single, multipurpose,   -|
|- very useful library I hope that it can be useful to many more     -|
|- people and gain more recognition than a bunch of single, somewhat -|
|- useful libraries ever could.                                      -|
|-                                                                   -|
|-->CHANGELOG<--------------------------------------------------------|
|- Version 0.1 -->                                                   -|
|- Initial Release - No Changes                                      -|
-----------------------------------------------------------------------
*/

//Global Variables

var mgID	=	0;
var mgDate	=	new Date();


function fDate() {
	mgDate				=	new Date();
	var day				=	mgDate.getDate();
	var month			=	mgDate.getMonth() + 1;
	var year			=	mgDate.getFullYear().toString();

	//Add a leading 0 to numbers less than 10
	
	if (day < 10) {
		day = "0" + day;
	}
	
	if (month < 10) {
		month = "0" + month;
	}

	//Return the formatted date, the year has been formatted to 2 digit form
	return day + "/" + month + "/" + year.charAt(2) + year.charAt(3);
}


function fTime() {
	mgDate				=	new Date();
	var hours			=	mgDate.getHours();
	var minutes			=	mgDate.getMinutes();
	var seconds			=	mgDate.getSeconds();

	//Add a leading 0 to numbers less than 10
	
	if (hours < 10) {
		hours = "0" + hours;
	}
	
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	//return the formatted string, I used '.' because ':' looks bad in the font I used
	return hours + "." + minutes + "." + seconds;
}


//init
function macgrilInit() {
	$("macgril").style.display = "none";
}


//Function to use print() instead of document.write()
function print(x) {
	document.write(x);
}


//Shorter way to do a console log
function log(x) {
	console.log(x);
}


/*Allows use of $ in place of a document.getElementById(), returns the reference
  to the element*/

function $(element) {
	var id = document.getElementById(element);
	if ((id != null) && (id != undefined)) {
		return id;
	}
}


/*lStore function for HTML5 Local Storage interaction; set, get or delete items,
  takes x as key, y as value. If y is "del" then entry is deleted. If no value
  if given then the existing value of key x is returned if it exists*/

function lStore(x,y) {
	if ((y != null) && (y != "del")) {
		window.localStorage.setItem(x, y);
	}
	else if (y == "del") {
		window.localStorage.removeItem(x);
	}
	else {
		return window.localStorage.getItem(x);
	}
}


//fOpen function returns a URL of a user selected file using a file open dialog
function fOpen(accept) {
	if (($("fOpen") != 0) && ($("fOpen") != undefined)) {
		$("macgril").removeChild($("fOpen")); 
	}
	generate("input","macgril","fOpen"); //Creates a file input element
	$("fOpen").setAttribute("type","file");
	if ((accept != null) && (accept != undefined)) {
		$("fOpen").setAttribute("accept", accept);
	}
	$("fOpen").click(); //Opens the file dialog for user file selection
	var x = window.confirm("Are you sure you want to load this file from disk?");
	/* The confirm box blocks the JS execution thread to prevent the function
	 * falling off the end and returning prematurely while the user selects the
	 * file they want, it also gives them an opportunity to cancel the import,
	 * other solutions to this problem resulted in UI hangs or 'too much
	 * recursion' errors. */
	if (x) {
		if ($('fOpen').files[0] != undefined) {
			return window.URL.createObjectURL($('fOpen').files[0]);
			/* Checks if the user hit OK on the confirm box and if they did 
			 * generates and returns the URL to the file. */
		}
	}
}


/*generate HTML elements on the fly, takes x as the tag name, y as the id of the
  element to append the new element as a child of and optional z option as the
  id of the new element, if none is defined macgrilJS will give it one. The new
  element's id is returned allowing access to that element after it is generated
  in a single line. Example: $(generate('p','container')).innerHTML="ohio!";*/

function generate(x,y,z) {
	var el = document.createElement(x);
	var id;
	if (z != null) {
		id = z;
	}
	else {
		id = "macgrilID" + (mgID++);
	}
	el.setAttribute("id",id);
	$(y).appendChild(el);
	return id;
}


/*Checks if the event was a strike of the enter key and executes code given as
  the first argument if it is. A 3rd parameter prvnt, if not passed as false
  prevents the default action of the enter key.*/ 

function onStrikeEnter(func,ev,prvnt) {
	if (ev.which === 13 || ev.keyCode === 13) {
		if (prvnt != false) {
			ev.preventDefault();
		}
		return (eval(func)); //'Eval is Evil' does not apply here
	}
}


/* The Macgril windowing system used for the eXastum Project */

//Generates a new "window" (draggable floating div) with width x and height y

function newWindow(x,y,title) {
	var newWindow		=	generate("div","windowSystem");
	var titleBar		=	generate("span",newWindow);
	//Create a tab to go with the new window (used for minimizing etc.)
	var windowTab		=	newTab(title);
	
	$(newWindow).setAttribute("class","window");
	$(newWindow).setAttribute("onmouseover","$('" + newWindow + "').style.zIndex = 30");
	$(newWindow).setAttribute("onmouseout","$('" + newWindow + "').style.zIndex = 20");

	//Set window dimentions
	$(newWindow).style.width	=	x;
	$(newWindow).style.height	=	y;

	//Spawn the window in a random location (within logical boundaries)
	$(newWindow).style.left		=	randNum(600,0) + "px";
	$(newWindow).style.top		=	randNum(300,0) + "px";

	$(newWindow).style.display	=	"block";
	$(titleBar).style.width		=	x;

	//Populate the titlebar contents
	$(titleBar).innerHTML		=	"<span class='titleBarText'>" + title + "</span>" + "<img draggable=\"false\" ondragstart=\"return false;\" src=\"images/close.png\" onmouseover=\"this.src='images/closeHover.png';\" onmouseout=\"this.src='images/close.png';\" onmousedown=\"this.src='images/closeDown.png';\" onmouseup=\"this.src='images/close.png';\" class=\"closeButton\" onclick=\"destroyWindow('" + newWindow + "','" + windowTab + "')\"/><img draggable=\"false\" ondragstart=\"return false;\" src=\"images/min.png\" onmouseover=\"this.src='images/minHover.png';\" onmouseout=\"this.src='images/min.png';\" onmousedown=\"this.src='images/minDown.png';\" onmouseup=\"this.src='images/min.png';\" class=\"minButton\" onclick=\"minMaxWindow('" + newWindow + "')\"/>";
	//All those escape sequences were fun...
	
	$(titleBar).setAttribute("class","titleBar");

	//Handle dragging and minimizing events
	$(titleBar).setAttribute("onmousedown","dragWindow('" + newWindow + "',event);");
	$(windowTab).setAttribute("onclick","minMaxWindow('" + newWindow + "')");

	//Return the new window ID
	return newWindow;
}


//Destroys a generated window and it's tab using ID references to both

function destroyWindow(winID,tabID) {
	$(winID).remove();
	$(tabID).remove();
}


//Shows or hides a window for minimizing windows

function minMaxWindow(winID) {
	if ($(winID).style.display == "block") {
		$(winID).style.display	=	"none";

		/* Prevents a bug when minimizing, the click on the minimize button is a
		 * mousedown on the titlebar therefore dragging is started, the mouse is]
		 * tracked and when the window is brought back it appears under the
		 * mouse rather than in its origninal location. This line prevents the
		 * tracking and fixes the bug, tracking still works when a new mousedown
		 * occurs */
		document.onmousemove	=	function() {return false};
	}
	else {
		$(winID).style.display	=	"block";
	}
}


//Window Movemovement

function dragWindow(appwindow,ev) {
	positionLeft	=	parseInt($(appwindow).style.left);
	positionTop		=	parseInt($(appwindow).style.top);
	xcoor			=	ev.clientX;
	ycoor			=	ev.clientY;
	document.onmousemove	=	function(ev) {
		var leftdist		= 	positionLeft + ev.clientX - xcoor;
		var topdist			= 	positionTop	+ ev.clientY - ycoor;
		$(appwindow).style.opacity	=	0.7;
		$(appwindow).style.top		=	topdist		+ "px";
		$(appwindow).style.left		=	leftdist	+ "px";
		document.onmouseup			=	function(ev) {
			$(appwindow).style.opacity	=	1.0;
			document.onmousemove		=	function() {return false};;
			document.onmouseup			=	function() {return false};;
			leftdist					=	null;
			topdist						=	null;
			xcoor						=	null;
			ycoor						=	null;
			return false;
		}
	}
}


function knobLogic(knob,ev,func) {
	var startPos	=	ev.clientY;
	var newPos		=	startPos;
	var startingRot =	knob.style.MozTransform;
	var startRot			=	"";
	
	for (var i = 0; i < startingRot.length; i++) {
		if (!isNaN(startingRot[i])) {
			startRot = startRot + startingRot[i];
		}
	}
	
	document.onmousemove	=	function(ev) {
		var rotation		=	parseInt(startRot);
		newPos				=	rotation + parseInt(startPos - ev.clientY);
		if (newPos > 120) {
			newPos = 120;
		}
		if (newPos < -120) {
			newPos = -120;
		}
		knob.style.MozTransform		=	"rotate(" + newPos + "deg)";
		rotation = 0;
		if ((func != null) && (func != undefined)) {
			eval(func); //Yeah, I know 'eval is evil' but its useful here
		}

		document.onmouseup	=	function(ev) {
			newPos		=	null;
			startPos	=	null;
			document.onmousemove	=	null;
			document.onmouseup		=	null;
			return newPos;
		}
	}
}


//Hides one element and shows another (useful for tab switching)
function switchTabs(id1,id2) {
	$(id1).style.display	=	"none";
	$(id2).style.display	=	"block";
}


//Hide or Show all elements in an array
function showHideIDs(idArray,x) {
	for (var i = 0; i < idArray.length; i++) {
		if (x=="show") {
			$(idArray[i]).style.display		=	"block";
		}
		else {
			$(idArray[i]).style.display		=	"none";
		}
	}
}


function randNum(x,y) {
	return (Math.random() * x).toFixed(y);
}
