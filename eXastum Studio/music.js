//Close the login/create user box and start the important functions

function exitOverlay() {
	$("overlay").style.display = "none";
	dateTime(); //Start the clock
	webAudio(); //Start the audio 'engine' so to speak (web audio api init)
	startCanvas(); //Start the visualizer
	addTrack("Default",100,false); //Add a default track to the editor
	loadKeys(); //Load piano keys
}


function dateTime() {
	$("dateTimeDisplay").innerHTML	=	"<span style='font-size:16px;'>User: " + lStore("userName") + "</span><br/>" + fDate() + "<br/>" + fTime(); //fDate and fTime are in macgril JS
	setTimeout("dateTime()",500);
}


function webAudio() {
	context		=	new AudioContext(); //Create the audio context
	analyser	=	context.createAnalyser(); //Create a new Analyser Node
	//Add an audio source (an audio tag in the html)
	gainnode	=	context.createGain();
	 //Limit the fft Size (no point having it huge when my vizualiser has so few bars)
	analyser.fftSize				=	128;
	 //Smooth the changes a bit to make it less jerky and flow more like a nice wave
	analyser.smoothingTimeConstant	=	0.4;
	//Connect it up to the audio output (speakers/headphones)
	analyser.connect(gainnode);
	gainnode.connect(context.destination);
	gainnode.gain.value				=	0.5;
	//Create the two arrays containing the data to be shown in the two waveforms
	fbc_array	=	new Uint8Array(analyser.frequencyBinCount);
	fbd_array	=	new Uint8Array(analyser.fftSize);
}


var sources		=	[];
var srcs		=	0;
var longestDur	=	0.00;
var longestTrack;

function addSource(src,demo) {
	sources[srcs]			=	new Audio();
	var audio				=	context.createMediaElementSource(sources[srcs]);
	if ((src != null) && (src != undefined)) { 
		sources[srcs].src	=	src;
		audio.connect(analyser);
		var trackLength		=	0;
		alert("New Track Created"); //Blocks the UI to allow metadata to load, also gives the user feedback
		addTrack($("fOpen").files[0].name,Math.floor((sources[srcs].duration)/3),true);
		
		if (sources[srcs].duration > longestDur) {
			longestDur		=	sources[srcs].duration;
			longestTrack	=	sources[srcs];
		}
		srcs++;
	}
	else {
		return 0;
	}
}


function demoMode() {
	alert("You will need to choose a compatible music track from your machine (You can use demo.ogg in the project folder if you like)");
	addSource(fOpen("audio"));
	pausePlay();
}


function userInfo() {
	alert("ARTIST INFORMATION\n\nUsername: " + lStore("userName") + "\nFull Name: " + lStore("firstName") + " " + lStore("lastName") + "\nExperience: " + lStore("experience") + "\nGender: " + lStore("gender") + "\nPhone Num: " + lStore("phone") + "\nEmail: " + lStore("email"));
}


var mediaSourceState	=	false;

function playPauseMediaSources() {
	if (mediaSourceState == false) {
		for (var i = 0; i < sources.length; i++) {
			sources[i].play();
			$("playPause").src	=	"images/pause.png";
		}
		mediaSourceState	=	true;
	}
	else {
		for (var i = 0; i < sources.length; i++) {
			sources[i].pause();
			$("playPause").src	=	"images/play.png";
		}
		mediaSourceState	=	false;
	}
}


var oscillators		=	[];
var osc				=	0;


/*
function loadKeys() {
	var blackKeys				=	[2,5,7,10,12,14,17,19,22,24,26,29,31,34,36,28,41,43,46,48,50,53,55,58,60,62,65,67,70,72,74,77,79,82,84,86];
	var marginCounter;
	
	for (var i = 0; i < 88; i++) {
		
		if (isNaN(blackKeys[i + 1])) {
			var key					=	generate("img","whiteKeys");
			$(key).src				=	"images/key.png";
			$(key).style.height		=	"75px";
			$(key).className		=	"pianoKeyWhite";
			$(key).setAttribute("onmousedown", "playKey(" + (i + 1) + ", 1);");
			$(key).setAttribute("onmouseup", "playKey(" + (i + 1) + ",0);");
			$(key).setAttribute("onmouseout", "playKey(" + (i + 1) + ",0);");
			//Make sure the keys can't be dragged causing note locks
			$(key).setAttribute("draggable", "false");
			$(key).setAttribute("ondragstart", "return false;");
			$(key).setAttribute("id", "pianoKey" + (i + 1));
		}
		else {
			var keyBlack				=	generate("img","blackKeys");
			$(keyBlack).src				=	"images/keyBlack.png";
			$(keyBlack).style.height	=	"50px";
			$(keyBlack).className		=	"pianoKeyBlack";
			$(keyBlack).setAttribute("onmousedown", "playKey("	+ (i + 1) + ", 1);");
			$(keyBlack).setAttribute("onmouseup", "playKey("	+ (i + 1) + ",0);");
			$(keyBlack).setAttribute("onmouseout", "playKey("	+ (i + 1) + ",0);");
			$(keyBlack).setAttribute("draggable", "false");
			$(keyBlack).setAttribute("ondragstart", "return false;");
			
			if (marginCounter == 0) {
				$(keyBlack).style.marginLeft	=	"18px";
				marginCounter++;
			}
			else if (marginCounter == 1) {
				$(keyBlack).style.marginLeft	=	"3px";
				marginCounter++;
			}
			else if (marginCounter == 2) {
				$(keyBlack).style.marginLeft	=	"19px";
				marginCounter++;
			}
			else if (marginCounter == 3) {
				$(keyBlack).style.marginLeft	=	"3px";
				marginCounter++;
			}
			else if (marginCounter == 4) {
				$(keyBlack).style.marginLeft	=	"3px";
				marginCounter = 0;
			}
			else {
				$(keyBlack).style.marginLeft	=	"8px";
				marginCounter = 0;
			}
		
			$(keyBlack).setAttribute("id", "pianoKey" + i);
		}
	}
}

*/


function playKey(x,y) {
	addOsc("SINE",findKeyFreq(x),y);
}

function findKeyFreq(x) {
	return Math.pow(1.059463094, (x - 49)) * 440;
}

function findKeyNote(x) {
	var pianoNotes		=	["A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8"];
	
	return pianoNotes[x - 1];
}

function addOsc(type,freq,gain) {
		oscillators[osc]			=	context.createOscillator();
		var	gainYoke				=	context.createGain();
		gainYoke.gain.value			=	gain;
		oscillators[osc].type		=	oscillator.type;
		oscillators[osc].frequency.value	=	freq;
		oscillator.connect(gainYoke);
		gainYoke.connect(analyser);
		oscillators[osc].start(0);
		osc++;
		return osc;
}


function adjustVolume(x) {
	gainnode.gain.value		=	(x + 120) * 0.004166667;
}


//Generates tabs to go with new windows, window generation and movement is handled by macgril.js
function newTab(title) {
	var newTab				=	generate("span","navTabs");
	$(newTab).innerHTML		=	title;
	$(newTab).setAttribute("class","workTab");
	return newTab;
}


//Checks if a user has already been set up and if so hides the create user stuff
function checkCanLogin() {
	//Form Init
	document.forms[0].onchange = function() {
		if (document.forms[0].gender.value == "Custom") {
			$("customGender").style.display	=	"inline";
		}
		else {
			$("customGender").style.display	=	"none";
		}
	}

	//Check for existing login details
	if (lStore("userName") != null) {
		document.forms[0].firstname.style.display	=	"none";
		document.forms[0].lastname.style.display	=	"none";
		document.forms[0].email.style.display		=	"none";
		document.forms[0].phone.style.display		=	"none";
		$("genderSelect").style.display				=	"none";
		$("customGender").style.display				=	"none";
		$("termsBox").style.display					=	"none";
		$("expLabel").style.display					=	"none";
		$("experience").style.display				=	"none";
		$("xpLabel").style.display					=	"none";
		$("createUserForm").setAttribute("onsubmit","event.preventDefault(); checkLogin();");
	}
}


function checkLogin() {
		if ((document.forms[0].username.value == lStore("userName")) && (document.forms[0].password.value == lStore("password"))) {
			exitOverlay();
			return true;
		}

		else {
			alert("Login Failed");
			return false;
		}
}


//We only want the fun to show once
var funRun	=	false;

//Handler for the fundial master control, such fun :)
function adjustFun(x) {
	if ((x == 120) && (funRun == false)) {
		$("editorTitle").innerHTML		=	"The fun has been maxed out!";
		$("editorTitle").style.color	=	"pink";
		$("funDial").setAttribute("onmousedown","return:false;"); //Prevent rerunning
		funRun	=	true;
	}
	else {
		return false;
	}
}


//Validate the user creation form
function validateForm() {

	var userName	=	document.forms[0].username.value;
	var password	=	document.forms[0].password.value;
	var firstName	=	document.forms[0].firstname.value;
	var lastName	=	document.forms[0].lastname.value;
	var email		=	document.forms[0].email.value;
	var phone		=	document.forms[0].phone.value;
	var gender		=	document.forms[0].gender.value;
	var experience	=	document.forms[0].experience.selectedIndex;

	if (!isNaN(userName.charAt(0))) {
		alert("Your username cannot start with a number");
		document.forms[0].username.focus();
		return false;
	}

	var noNumCount	= 0;
	var numCount	= 0;
	
	for (var i = 0; i < password.length; i++) {
		if (isNaN(password.charAt(i))) {
			noNumCount++;
		}
		else {
			numCount++;
		}
	}

	if ((noNumCount < 1) || (numCount < 1)) {
		alert("Your password must contain numbers and letters");
		document.forms[0].password.focus();
		return false;
	}

	for (var i = 0; i < firstName.length; i++) {
		if (!isNaN(firstName.charAt(i))) {
			alert("Your name cannot contain numbers");
			document.forms[0].firstname.focus();
			return false;
		}
	}

	for (var i = 0; i < lastName.length; i++) {
		if (!isNaN(lastName.charAt(i))) {
			alert("Your name cannot contain numbers");
			document.forms[0].lastname.focus();
			return false;
		}
	}

	if ((!isNaN(email.charAt(0))) || (email.charAt(0) == "@")) {
		alert("Your email cannot start with a number or @");
		document.forms[0].email.focus();
		return false;
	}

	if ((email.indexOf('@') == -1) || (email.indexOf('@') != email.lastIndexOf('@'))) {
		alert("There should be one @ symbol in an email address");
		document.forms[0].email.focus();
		return false;
	}

	if ((email.charAt(email.length - 3) != ".") && (email.charAt(email.length - 2) != ".")) {
		alert("Email does not belong to a vaild website");
		document.forms[0].email.focus();
		return false;
	}

	if ((email.lastIndexOf(".") - email.lastIndexOf("@")) < 3) {
		alert("Email does not belong to a vaild website");
		document.forms[0].email.focus();
		return false;
	}

	if (phone.length != 10) {
		alert("Valid phone numbers contain 10 digits");
		document.forms[0].phone.focus();
		return false;
	}

	for (var i = 0; i < phone.length; i++) {
		if (isNaN(phone.charAt(i))) {
			alert("Valid phone numbers only contain digits");
			document.forms[0].phone.focus();
			return false;
		}
	}

	if (gender == "Custom") {
		if ($("customGender").value.length > 140) {
			alert("Your gender description is so long it would not even fit in a tweet");
			$("customGender").focus();
			return false;
		}
		else if ($("customGender").value.length == 0) {
			alert("Please enter your gender");
			$("customGender").focus();
			return false;
		}
	}

	if ($("termsBox").checked == false) {
		alert("You must accept the licence terms");
		return false;
	}

	if (experience == 0) {
		lStore("experience","Beginner");
	}
	else if (experience == 1) {
		lStore("experience","Intermediate");
	}
	else {
		lStore("experience","Professional");
	}

	lStore("userName",userName);
	lStore("password",password);
	lStore("phone",phone);
	lStore("email",email);
	lStore("firstName",firstName);
	lStore("lastName",lastName);
	

	if (gender == "Custom") {
		lStore("gender",$("customGender").value);
	}
	else if (gender == "Male") {
		lStore("gender","Male");
	}
	else {
		lStore("gender","Female");
	}
	exitOverlay();
}


//In case the user creation form has a bug or something this will allow viewing the rest of the project
function skipValidation() {
	document.forms[0].username.required		=	false;
	document.forms[0].password.required		=	false;
	document.forms[0].firstname.required	=	false;
	document.forms[0].lastname.required		=	false;
	document.forms[0].email.required		=	false;
	document.forms[0].phone.required		=	false;
	document.forms[0].onsubmit				=	function () {return false};
	exitOverlay();
}


//Adds a new track to the song editor
function addTrack(name,cells,fill) {
	//Generate the rows and cells needed
	var row			=	generate("tr","trackDeck");
	var row2		=	generate("tr","trackCtrlTable");
	var trackCtrl	=	generate("td",row2);

	//Set the needed attributes and such
	$(row).setAttribute("class","track");
	$(row2).setAttribute("class","track");
	$(trackCtrl).setAttribute("class","track");
	$(trackCtrl).innerHTML	=	"<span class='trackTitle'>" + name + "</span>";

	//Generates 100 cells and adds them to the new track row
	for (var y = 0; y < cells; y++) {
		var cell = generate("td",row);
		$(cell).innerHTML = "&#160;";
		if (fill) {
			$(cell).setAttribute("class","trackFilled");
		}
		else {
			$(cell).setAttribute("class","track");
		}
		//When a cell is clicked spawn a new piano roll window
		$(cell).setAttribute("onclick","newWindow('600px','400px','Piano Roll (\"" + cell + "\")')"); 
	}
}


//Open new console windows
function newConsole() {
	var console		=	newWindow("450px","350px","Console");
	var cli			=	generate("textarea",console);
	$(cli).setAttribute("class","cli");
	$(cli).setAttribute("spellcheck","false");
	$(cli).setAttribute("placeholder","eXastum Studio v1.0 - JavaScript Console>_");
	consoleInit(cli);
}


function newFiles() {
	var files		=	newWindow("500px","300px","Project Files");
}


function newNotes() {
	var notes		=	newWindow("400px","300px","Project Notes");
	var note		=	generate("textarea",notes);
	$(note).setAttribute("class","cli");
	$(note).setAttribute("spellcheck","false");
	$(note).focus();
}


function consoleInit(txtArea) {
	//Excute the commands when enter key is pressed (handled by macgril JS)
	$(txtArea).setAttribute("onkeypress","onStrikeEnter(this.value,event,false)");
	$(txtArea).focus();
}


function checkKey(ev,x,piano) {
	//Use spacebar to pause or play
	if (ev.which === 32 || ev.keyCode === 32) {
		pausePlay();
	}


	//Play the piano using asdfgh keys
	if (piano == true) {
		if (ev.which === 65 || ev.keyCode === 65) {
			ev.preventDefault();
			if (x != "up") {
				playKey(36,1);
			}
			else {
				playKey(-1,0);
			}
		}
		else if (ev.which === 83 || ev.keyCode === 83) {
			ev.preventDefault();
			if (x != "up") {
				playKey(38,1);
			}
			else {
				playKey(-1,0);
			}
		}
		else if (ev.which === 68 || ev.keyCode === 68) {
			ev.preventDefault();
				if (x != "up") {
				playKey(39,1);
			}
			else {
				playKey(-1,0);
			}
		}
		else if (ev.which === 70 || ev.keyCode === 70) {
			ev.preventDefault();
			if (x != "up") {
				playKey(41,1);
			}
			else {
				playKey(-1,0);
			}
		}
		else if (ev.which === 71 || ev.keyCode === 71) {
			ev.preventDefault();
			if (x != "up") {
				playKey(43,1);
			}
			else {
				playKey(-1,0);
			}
		}
		else if (ev.which === 72 || ev.keyCode === 72) {
			ev.preventDefault();
			if (x != "up") {
				playKey(44,1);
			}
		}
	}
}


function pausePlay() {
	playPauseMediaSources();
	//more to be added
}


//Three.js code for 3D music visualization

function startCanvas() {
	scene		=	new THREE.Scene(); //Create new Three JS scene

	//Setting up the camera
	camera		=	new THREE.PerspectiveCamera(45,200/200,49,50);
					camera.position.set(0,0,50);
					camera.lookAt(scene.position);
					scene.add(camera);

	renderer	=	new THREE.WebGLRenderer({alpha:true, antialias:true});
					renderer.setSize(200,200);
					$("renderer").appendChild(renderer.domElement);

	//Create empty arrays to store the two collections of bars
	cubes		=	[];
	cubes2		=	[];

	//Create all the bars and add them to the scene
	for (var i = 0; i < 40; i++) {
		cubes[i]	=	new THREE.Mesh(new THREE.PlaneGeometry(0.1,0.5), new THREE.MeshBasicMaterial({color:0x00796C}));
		cubes2[i]	=	new THREE.Mesh(new THREE.PlaneGeometry(0.1,0.5), new THREE.MeshBasicMaterial({color:0x6EFFF1}));
		cubes[i].position.set((i - 20),0,0);
		cubes2[i].position.set((i - 19.5),0,0);
		scene.add(cubes[i]);
		scene.add(cubes2[i]);
	}
	animate();
}


//Animation loop
	
function animate() {
	analyser.getByteTimeDomainData(fbd_array);
	analyser.getByteFrequencyData(fbc_array);

	//Set bar heights based on values from audio analyser
	for (var i = 0; i < 40; i++) {
		var cubeHeight1		=	fbc_array[i] * 0.2;
		var cubeHeight2		=	fbd_array[i] - 128;

		if (!(cubeHeight1 < 1)) {
			cubes[i].scale.y	=	cubeHeight1;
		}
		else {
			cubes[i].scale.y	=	0.1;
		}

		if (!(cubeHeight2 < 1)) {
			cubes2[i].scale.y	=	cubeHeight2;
		}
		else {
			cubes2[i].scale.y	=	0.1;
		}

		//Flash the LED for values above 185 in the data wave
		if (fbd_array[i] > 185) {
			$("flashy").style.backgroundImage = "radial-gradient(circle 25px, #17bceb 0%, rgba(0,0,0,0) 95%)";
		}
		else {
			$("flashy").style.backgroundImage = "radial-gradient(circle 25px, #000000 0%, rgba(0,0,0,0) 95%)";
		}
	}
	if (longestTrack != undefined) {
		var currentSecs			=	(Math.floor(longestTrack.currentTime	% 60)).toString();
		var durationSecs		=	(Math.floor(longestDur					% 60)).toString();
		var durationMins		=	Math.floor(longestDur					/ 60);
		if (parseInt(currentSecs) < 10) {
			currentSecs = "0" + currentSecs;
		}
	
		if (parseInt(durationSecs) < 10) {
			durationSecs = "0" + durationSecs;
		}
		else if (isNaN(parseInt(durationSecs))) {
			durationSecs = "00";
			durationMins = "0";
		}
		
	//var progressRatio				=	$("testAudio").duration / $("testAudio").currentTime;
	
	//if (($("testAudio").currentTime != NaN) && ($("testAudio").currentTime != null) && 
	//$("progress").style.width 	=	((window.innerWidth - 445) / progressRatio) + "px";
		$("currentTime").innerHTML	=	"<span style='float:left;'>" + Math.floor(longestTrack.currentTime / 60) + "<span style='margin-left:2px; margin-right:3px;'>:</span>" + currentSecs + "</span>&#160;<span style='float:right;'>/ " + durationMins + "<span style='margin-left:2px; margin-right:3px;'>:</span>" + durationSecs + "</span>";
	}
	
	setTimeout	(function() {requestAnimationFrame(animate);});
	renderer.render(scene,camera);
}
