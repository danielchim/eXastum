/*
Copyright 2014,2015 Brian Millar
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


function newWindow(x,y,title,content,resize,min,max) {
	if((max==null)||(max==undefined)) max=true;
	if((min==null)||(min==undefined)) min=true;
	var newWindow	=generate("div","windowSystem");
	var titleBar	=generate("span",newWindow);
	var windowTab	=newTab(title);
	$(newWindow).setAttribute("class","window");
	$(newWindow).style.width	= x + 2	 + "px";
	$(newWindow).style.height	= y + 32 + "px";
	$(newWindow).style.resize	= resize;
	$(newWindow).style.left		= randNum(600,0) + "px";
	$(newWindow).style.top		= randNum(300,0) + "px";
	$(newWindow).style.display	= "block";
	$(titleBar).style.width		= x;
	if(content!=null) {
		var appContent	=generate("iframe",newWindow);
		$(appContent).setAttribute("src",content);
		$(appContent).setAttribute("class","app");
	}
	var minString	= "";
	var maxString	= "";
	if(min)
		minString="<img draggable=\"false\" ondragstart=\"return false;\" src=\"skins/"+lStore("skin")+"/ui/min.png\" onmouseover=\"this.src='skins/"+lStore("skin")+"/ui/minHover.png';\" onmouseout=\"this.src='skins/"+lStore("skin")+"/ui/min.png';\" onmousedown=\"this.src='skins/"+lStore("skin")+"/ui/minDown.png';\" onmouseup=\"this.src='skins/"+lStore("skin")+"/ui/min.png';\" class=\"minButton\" onclick=\"minMaxWindow('" + newWindow + "')\"/>";
	if(max)
		maxString="<img draggable=\"false\" ondragstart=\"return false;\" src=\"skins/"+lStore("skin")+"/ui/max.png\" onmouseover=\"this.src='skins/"+lStore("skin")+"/ui/maxHover.png';\" onmouseout=\"this.src='skins/"+lStore("skin")+"/ui/max.png';\" onmousedown=\"this.src='skins/"+lStore("skin")+"/ui/maxDown.png';\" onmouseup=\"this.src='skins/"+lStore("skin")+"/ui/max.png';\" class=\"maxButton\" onclick=\"maxRestoreWindow('" + newWindow + "')\"/>";
	$(titleBar).innerHTML	="<span class='titleBarText'>" + title + "</span>" + "<img draggable=\"false\" ondragstart=\"return false;\" src=\"skins/"+lStore("skin")+"/ui/close.png\" onmouseover=\"this.src='skins/"+lStore("skin")+"/ui/closeHover.png';\" onmouseout=\"this.src='skins/"+lStore("skin")+"/ui/close.png';\" onmousedown=\"this.src='skins/"+lStore("skin")+"/ui/closeDown.png';\" onmouseup=\"this.src='skins/"+lStore("skin")+"/ui/close.png';\" class=\"closeButton\" onclick=\"destroyWindow('" + newWindow + "','" + windowTab + "')\"/>"+maxString+minString;
	$(titleBar).setAttribute("class","titleBar");

	$(titleBar).setAttribute("onmousedown","dragWindow('" + newWindow + "',event);");
	$(windowTab).setAttribute("onclick","minMaxWindow('" + newWindow + "')");
	return newWindow;
}

function destroyWindow(winID,tabID) {
	$(winID).remove();
	$(tabID).remove();
}

function minMaxWindow(winID) {
	if ($(winID).style.display == "block") {
		$(winID).style.display = "none";
		document.onmousemove = function() {return false};
	}
	else
		$(winID).style.display = "block";
}

function maxWindow(winID) {
	lStore(winID+"Width",$(winID).style.width);
	lStore(winID+"Height",$(winID).style.height);
	lStore(winID+"Left",$(winID).style.left);
	lStore(winID+"Top",$(winID).style.top);
	document.onmousemove = function() {return false};
	$(winID).setAttribute("style","opacity:1.0; display:block; top:22px; left:0px; width:100%; height:calc(100% - 44px); border-style:none; border-radius:0px; z-index:10;");
}

function restoreWindow(winID) {
	document.onmousemove = function() {return false};
	$(winID).setAttribute("style","opacity:1.0; display:block; top:"+lStore(winID+"Top")+"; left:"+lStore(winID+"Left")+"; width:"+lStore(winID+"Width")+"; height:calc"+lStore(winID+"Height")+"; z-index:8;");
	lStore(winID+"Width","del");
	lStore(winID+"Height","del");
	lStore(winID+"Left","del");
	lStore(winID+"Top","del");
}

function maxRestoreWindow(winID) {
	if((lStore((winID+"Width")!=null))&&(lStore((winID+"Width")!=undefined)))
		restoreWindow(appWindow);
	else
		maxWindow(winID);
}

//Window Movemovement

function dragWindow(appWindow,ev) {
	if((lStore((appWindow+"Width")!=null))&&(lStore((appWindow+"Width")!=undefined)))
		restoreWindow(appWindow);
	positionLeft	= parseInt($(appWindow).style.left);
	positionTop		= parseInt($(appWindow).style.top);
	xcoor			= ev.clientX;
	ycoor			= ev.clientY;
	document.onmousemove	= function(ev) {
		if(($(appWindow)) == undefined) return false;
		var leftdist	= positionLeft	+ ev.clientX - xcoor;
		var topdist		= positionTop	+ ev.clientY - ycoor;
		if(topdist  < 33) topdist   = "23";
		if(leftdist < 10) leftdist  = "0";
		if((leftdist==0)&&(topdist==23))
			$(appWindow).style.borderTopLeftRadius = "0px";
		else
			$(appWindow).style.borderTopLeftRadius = "20px";
		$(appWindow).style.opacity	= 0.7;
		$(appWindow).style.top		= topdist	+ "px";
		$(appWindow).style.left		= leftdist	+ "px";
		document.onmouseup			= function(ev) {
			$(appWindow).style.opacity	= 1.0;
			document.onmousemove		= function() {return false};
			document.onmouseup			= function() {return false};
			leftdist					= null;
			topdist						= null;
			xcoor						= null;
			ycoor						= null;
			return false;
		}
	}
}


//Generates tabs to go with new windows, window generation and movement is handled by macgril.js
function newTab(title) {
	var newTab				=	generate("span","sysTasks");
	$(newTab).innerHTML		=	title;
	$(newTab).setAttribute("class","workTab");
	return newTab;
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
