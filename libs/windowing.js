
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
	document.onmousemove  = function() {return false};
	$(winID).style.top    = "22px";
	$(winID).style.left   = "0px";
	$(winID).style.width  = "100%";
	$(winID).style.height = "calc(100% - 44px)";
}

function restoreWindow(winID) {
	$(winID).style.width  = lStore(winID+"Width");
	$(winID).style.height = lStore(winID+"Height");
	$(winID).style.top    = lStore(winID+"Top");
	$(winID).style.left   = lStore(winID+"Left");
	lStore(winID+"Width","del");
	lStore(winID+"Height","del");
	lStore(winID+"Left","del");
	lStore(winID+"Top","del");
}

function maxRestoreWindow(winID) {
	document.onmousemove = function() {return false};
	if(lStore(winID+"Width")!=null)
		restoreWindow(winID);
	else
		maxWindow(winID);
}

//Window Movemovement

function dragWindow(appWindow,ev) {
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
