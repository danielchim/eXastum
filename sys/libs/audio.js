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

function initAudioSystem() {
	context		=	new AudioContext();
	analyser	=	context.createAnalyser();
	gainnode	=	context.createGain();
	gainnode.gain.value				=	0.5;
	analyser.fftSize				=	128;
	analyser.smoothingTimeConstant	=	0.4;
	analyser.connect(gainnode);
	gainnode.connect(context.destination);
	fbc_array	=	new Uint8Array(analyser.frequencyBinCount);
	fbd_array	=	new Uint8Array(analyser.fftSize);
	startCanvas();
}

function addAudioSource(src) {
	var audio = context.createMediaElementSource(src);
	audio.connect(analyser);
}

function setSysVol(level) {
	gainnode.gain.value = (level + 120) * 0.004166667;
}


function startCanvas() {
	scene		=	new THREE.Scene();
	camera		=	new THREE.PerspectiveCamera(45,200/200,49,50);
					camera.position.set(0,0,50);
					camera.lookAt(scene.position);
					scene.add(camera);

	renderer	=	new THREE.WebGLRenderer({alpha:true, antialias:true});
					renderer.setSize(250,200);
					$("audioPanelVisualizer").appendChild(renderer.domElement);

	cubes		=	[];
	cubes2		=	[];

	for (var i = 0; i < 40; i++) {
		cubes[i]	=	new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1,0.5), new THREE.MeshBasicMaterial({color:0x00796C}));
		cubes2[i]	=	new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1,0.5), new THREE.MeshBasicMaterial({color:0x6EFFF1}));
		cubes[i].position.set((i - 20),0,0);
		cubes2[i].position.set((i - 19.5),0,0);
		scene.add(cubes[i]);
		scene.add(cubes2[i]);
	}
	animate();
}


function animate() {
	analyser.getByteTimeDomainData(fbd_array);
	analyser.getByteFrequencyData(fbc_array);

	for (var i = 0; i < 40; i++) {
		var cubeHeight1 = fbc_array[i] * 0.2;
		var cubeHeight2 = fbd_array[i] - 128;

		if (!(cubeHeight1 < 1)) cubes[i].scale.y = cubeHeight1;
		else cubes[i].scale.y = 0.1;
		
		if (!(cubeHeight2 < 1)) cubes2[i].scale.y = cubeHeight2;
		else cubes2[i].scale.y = 0.1;
	}
	
	setTimeout	(function() {requestAnimationFrame(animate);});
	renderer.render(scene,camera);
}

