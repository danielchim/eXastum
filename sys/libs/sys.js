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

var buildNo  = "3.0.0.5";
var codeName = "Silverfish - Beta";
var language = "english";
var skin     = lStore("skin");


function updateInfoBar(text) {
	$("infoBar").value = text;
}

function loadStrings(lang) {
}

function loadTheme() {
	$("Sheet").href     = "sys/skins/" + skin + "/main.css";
	$("bootsplash").src = "sys/skins/" + skin + "/ui/bootsplash.jpg";
	$("wallpaper").src  = "sys/skins/" + skin + "/wallpaper/default.jpg";
}

function changeTheme(x) {
	lStore("skin",x);
	loadTheme();
}

function showAbout() {
	sysDialog("About eXastum","eXastum build " + buildNo + " - " + codeName,false);
}

function loadSettings() {

}

function installApp(appData) {
	lStore();
}

function launchApp(app) {
	var appData = lStore(app).split(",");
	newWindow(appData[0],appData[1],appData[2],appData[3],appData[4],appData[5],appData[6]);
}

function sysDialog(error,message,urgent) {
	var dialog = newWindow(400,50,error,null,"none",false,false);
	var msg    = generate("span",dialog);
	$(msg).innerHTML = message;
	$(msg).setAttribute("class","sysDialog");
	if(urgent)
		$(dialog).setAttribute("class","sysDialogUrgent");
	else
		$(dialog).setAttribute("class","sysDialog");
}

function showDock() {
	$("dock").style.transform       = "translateY(0px)";
	$("dock").style.MozTransform    = "translateY(0px)";
	$("dock").style.WebkitTransform = "translateY(0px)";
	$("dock").style.msTransform     = "translateY(0px)";
}

function hideDock() {
	$("dock").style.transform       = "translateY(140px)";
	$("dock").style.MozTransform    = "translateY(140px)";
	$("dock").style.WebkitTransform = "translateY(140px)";
	$("dock").style.msTransform     = "translateY(140px)";
}

function initGUI() {
	$("buildNum").innerHTML       = "eXastum " + buildNo + "<br/>" + codeName;
	$("bootsplash").style.display = "none";
	$("login").style.display      = "block";
	loadTheme();
}

function clickDesktop() {
	$("mainMenu").style.display = "none";
	$("menuButton").src         = "sys/skins/" + lStore("skin") + "/ui/menu.png";
	updateInfoBar("eXastum 3.0");
}

function loadUiColors() {
	$("styleSystem").innerHTML = "#buildNum {color:" + uiColor + ";}" + "#bar {color:" + uiColor + ";}" + "#barUnderlay {background-color:" + uiColor + "; border-color:" + uiColor + ";}" + "button {color:" + uiColor + "; border-color:" + uiColor + ";}" + "div.window {border-color:" + uiColor + ";}" + "div.window:hover {box-shadow:0px 0px 5px " + uiColor + ";}" + "@-moz-keyframes window {0% {opacity:0.0; box-shadow:0px 0px 400px 50px " + uiColor + "; -moz-transform: scale(0.0) translateY(150px) rotateY(45deg) rotateX(45deg);} 100% {opacity:1.0;-moz-transform:scale(1.0) translateY(0px) rotateY(0deg) rotateX(0deg);}}";
}

function updateUiColor(newColor) {
	lStore("uiColor",newColor);
	uiColor = lStore("uiColor");
	loadUiColors();
}

function newConsole() {
	var console = newWindow(450,350,"Console",null,"both",true,true);
	var cli     = generate("textarea",console);
	$(cli).setAttribute("class","cli");
	$(cli).setAttribute("spellcheck","false");
	$(cli).setAttribute("placeholder","eXastum Studio v1.0 - JavaScript Console>_");
	consoleInit(cli);
}

function consoleWrite(message) {
	$("console").innerHTML = $("console").innerHTML + message + "\n";
	log(message);
}

function showHideMainMenu() {
	if ($("mainMenu").style.display == "none") {
		$("mainMenu").style.display =  "block";
		$("menuButton").src = "sys/skins/" + lStore("skin") + "/ui/menuPress.png";
	}
	else {
		$("menuButton").src         = "sys/skins/" + lStore("skin") + "/ui/menu.png";
		$("mainMenu").style.display = "none";
	}
}

function setTheme(text, color, opacity) {
	if (text == "default") {
		lStore("themeText",    "#e3e3e3");
		lStore("themeColor",   "0,0,0");
		lStore("themeOpacity", "0.8");
	}
	else {
		lStore("themeText",    text);
		lStore("themeColor",   color);
		lStore("themeOpacity", opacity);
	}
	loadTheme();
}

function loadTheme() {
	var themeText    = lStore("themeText");
	var themeColor   = lStore("themeColor");
	var themeOpacity = lStore("themeOpacity");
	var currentStyle = $("styleSystem").innerHTML;
	var themeValues  = "rgba(" + themeColor + ", " + themeOpacity + ")";
	document.body.style.color   = themeText;
	$("styleSystem").innerHTML  = currentStyle + "button {background-color: " + themeValues + "; color: " + themeText + ";}";
	$("mainMenu").style.display = "none";
}

function installDefaultApps() {
	lStore("Browser","500,300,Browser,sys/browser.html,true,true,true");
}

function showTimePanel() {
	$("timePanel").style.display = "block";
}

function hideTimePanel() {
	$("timePanel").style.display = "none";
}
