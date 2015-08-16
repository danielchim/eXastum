/* GLOBALS */
var buildNo		= "3.0.0.1";
var codeName	= "Pre-Alpha";
var language	= "english"

function init() {
	consoleWrite("eXastum build " + buildNo + " - " + codeName);
	if(!checkSetup())
		startSetup();
	loadStrings(language);
	loadSettings();
	initGUI();
	clock();
}

function checkSetup() {
	if (lStore("setup")!=null)
		return true;
	return false;
}

function clock() {
	$("sysClock").innerHTML = fDate()+"  -  "+fTime();
	setTimeout("clock()",500);
}

function updateInfoBar(text) {
	$("infoBar").value = text;
}

function startSetup() {
	consoleWrite("Setup is not compelete, starting setup...");
}

function loadStrings(lang) {
	//Load language pack and parse strings
}

function loadTheme() {
	//Load CSS
	$("Sheet").href="skins/"+lStore("skin")+"/main.css";
	//Load Images
	var skin = "skins/"+lStore("skin")+"/";
	$("bootsplash").src = skin+"ui/bootsplash.jpg";
	$("wallpaper").src	= skins+"wallpaper/default.jpg";
	
}

function changeTheme(x) {
	lStore("skin",x);
	loadTheme();
}

function loadSettings() {

}

function installApp(appData) {
	lStore();
}

function launchApp(app) {
	newWindow(lStore(app));
}

function sysDialog(error,message) {
	var dialog	=newWindow(400,50,error,null,"none",false,false);
	var msg		=generate("span",dialog);
	$(msg).innerHTML	=message;
	$(msg).setAttribute("class","sysDialog");
	$(dialog).setAttribute("class","sysDialog");
}

function showDock() {
	$("dock").style.MozTransform="translateY(0px)";
	
	
	//VERIFY THESE EXIST
	$("dock").style.transform="translateY(0px)";
	$("dock").style.webkitTransform="translateY(0px)";
	$("dock").style.msTransform="translateY(0px)";
	$("dock").style.OTransform="translateY(0px)";
}

function hideDock() {
	$("dock").style.MozTransform="translateY(140px)";
	
	//VERIFY THESE EXIST
	$("dock").style.transform="translateY(140px)";
	$("dock").style.webkitTransform="translateY(140px)";
	$("dock").style.msTransform="translateY(140px)";
	$("dock").style.OTransform="translateY(140px)";
}

function initGUI() {
	$("buildNum").innerHTML			= "eXastum "+buildNo+"<br/>"+codeName;
	$("bootsplash").style.display	= "none";
	$("login").style.display		= "block";
	loadTheme();
}

function clickDesktop() {
	$("mainMenu").style.display="none";
	$("menuButton").src = "skins/"+lStore("skin")+"/ui/menu.png";
}

function loadUiColors() {
	$("styleSystem").innerHTML =
	"#buildNum {color:"+uiColor+";}"+
	"#bar {color:"+uiColor+";}"+
	"#barUnderlay {background-color:"+uiColor+"; border-color:"+uiColor+";}"+
	"button {color:"+uiColor+"; border-color:"+uiColor+";}"+
	"div.window {border-color:"+uiColor+";}"+
	"div.window:hover {box-shadow:0px 0px 5px "+uiColor+";}"+
	"@-moz-keyframes window {0% {opacity:0.0; box-shadow:0px 0px 400px 50px "+uiColor+"; -moz-transform: scale(0.0) translateY(150px) rotateY(45deg) rotateX(45deg);} 100% {opacity:1.0;-moz-transform:scale(1.0) translateY(0px) rotateY(0deg) rotateX(0deg);}}";
}

function updateUiColor(newColor) {
	lStore("uiColor",newColor);
	uiColor = lStore("uiColor");
	loadUiColors();
}

function newConsole() {
	var console		=	newWindow(450,350,"Console",null,"both",true,true);
	var cli			=	generate("textarea",console);
	$(cli).setAttribute("class","cli");
	$(cli).setAttribute("spellcheck","false");
	$(cli).setAttribute("placeholder","eXastum Studio v1.0 - JavaScript Console>_");
	consoleInit(cli);
}

function consoleInit(txtArea) {
	//Excute the commands when enter key is pressed (handled by macgril JS)
	$(txtArea).setAttribute("onkeypress","onStrikeEnter(this.value,event,false)");
	$(txtArea).focus();
}

function consoleWrite(message) {
	$("console").innerHTML = $("console").innerHTML + message + "\n";
	log(message);
}


//UI Controls

function showHideMainMenu() {
	if ($("mainMenu").style.display == "none") {
		$("mainMenu").style.display = "block";
		$("menuButton").src = "skins/"+lStore("skin")+"/ui/menuPress.png";
	}
	else {
		$("menuButton").src = "skins/"+lStore("skin")+"/ui/menu.png";
		$("mainMenu").style.display="none";
	}
}

//Theme Functions

function setTheme(text, color, opacity) {
	if (text == "default") {
		lStore("themeText",		"#e3e3e3");
		lStore("themeColor",	"0,0,0");
		lStore("themeOpacity",	"0.8");
		}
		else {
			lStore("themeText",		text);
			lStore("themeColor",	color);
			lStore("themeOpacity",	opacity);
		}
	loadTheme();
}

function loadTheme() {
	var themeText			=		lStore("themeText");
	var themeColor			=		lStore("themeColor");
	var themeOpacity		=		lStore("themeOpacity");
	var currentStyle		=		document.getElementById("styleSystem").innerHTML;
	var themeValues			=		"rgba("	+	themeColor	+	", "		+	themeOpacity	+	")";
		document.body.style.color											=	themeText;
		document.getElementById("styleSystem").innerHTML					=	currentStyle + "button {background-color: " + themeValues + "; color: " + themeText + ";}";
	document.getElementById("mainMenu").style.display="none";
}

function login() {
	$("login").style.display="none";
	$("loggedIn").style.display="block";
	lStore("skin","default");
}

