/*	Copyright 2015 Brian Millar
	This file is part of eXastum.
	eXastum is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	eXastum is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with eXastum.  If not, see <http://www.gnu.org/licenses/>
*/

var mgID = 0;

function macgrilInit() {
	$("macgril").style.display = "none";
}

function print(x) {
	document.write(x);
}

function log(x) {
	console.log(x);
}


//DOM Functions

function $(element) {
	var id = document.getElementById(element);
	if ((id != null) && (id != undefined)) return id;
}

function generate(x,y,z) {
	var el = document.createElement(x);
	var id;
	if (z != null) id = z;
	else id = "macgrilID" + (mgID++);
	el.setAttribute("id",id);
	$(y).appendChild(el);
	return id;
}


//File Access & Storage

function lStore(x,y) {
	if (y == "del")
		window.localStorage.removeItem(x);
	else if (y != null)
		window.localStorage.setItem(x,y);
	else
		return window.localStorage.getItem(x);
}

function fOpen(accept) {
	if (($("fOpen") != 0) && ($("fOpen") != undefined))
		$("macgril").removeChild($("fOpen"));
	generate("input","macgril","fOpen");
	$("fOpen").setAttribute("type","file");
	if ((accept != null) && (accept != undefined))
		$("fOpen").setAttribute("accept", accept);
	$("fOpen").click();
	var x = window.confirm("Are you sure you want to load this file from disk?");
	if (x) if ($('fOpen').files[0] != undefined)
			return window.URL.createObjectURL($('fOpen').files[0]);
}


//Date & Time Functions

var mgDate = new Date();

function fDate() {
	mgDate    = new Date();
	var day   = mgDate.getDate();
	var month = mgDate.getMonth() + 1;
	var year  = mgDate.getFullYear().toString();
	if (day   < 10) day   = "0"+day;
	if (month < 10) month = "0"+month;
	return day + "/" + month + "/" + year.charAt(2) + year.charAt(3);
}

function fTime() {
	mgDate      = new Date();
	var hours   = mgDate.getHours();
	var minutes = mgDate.getMinutes();
	var seconds = mgDate.getSeconds();
	if (hours < 10)   hours   = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;
	return hours + ":" + minutes + ":" + seconds;
}


//Input Functions

function onStrikeEnter(func,ev,prvnt) {
	if ((ev.which === 13) || (ev.keyCode === 13)) {
		if (prvnt) ev.preventDefault();
		return (eval(func));
	}
}

function knobLogic(knob,ev,func) {
	var startPos    = ev.clientY;
	var newPos      = startPos;
	var startingRot = knob.style.MozTransform;
	var startRot    = "";
	for (var i = 0; i < startingRot.length; i++)
		if (!isNaN(startingRot[i]))
			startRot = startRot+startingRot[i];
	document.onmousemove = function(ev) {
		var rotation = parseInt(startRot);
		newPos       = rotation + parseInt(startPos - ev.clientY);
		if (newPos > 120)  newPos = 120;
		if (newPos < -120) newPos = -120;
		knob.style.MozTransform   = "rotate(" + newPos + "deg)";
		rotation = 0;
		if ((func != null) && (func != undefined)) eval(func);
		document.onmouseup = function(ev) {
			newPos   = null;
			startPos = null;
			document.onmousemove = null;
			document.onmouseup   = null;
			return newPos;
		}
	}
}

function switchTabs(id1,id2) {
	$(id1).style.display = "none";
	$(id2).style.display = "block";
}

function showHideIDs(idArray,x) {
	for (var i = 0; i < idArray.length; i++) {
		if (x == "show")
			$(idArray[i]).style.display = "block";
		else
			$(idArray[i]).style.display = "none";
	}
}


//Mathematics Functions

function randNum(x,y) {
	return (Math.random() * x).toFixed(y);
}
