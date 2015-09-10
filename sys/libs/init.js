/*
    Copyright 2015 Brian Millar
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

function init() {
    consoleWrite("eXastum " + buildNo + " - " + codeName);
    if(!checkSetup()) startSetup();
    loadStrings(language);
    loadUserLibs();
    loadSettings();
    initGUI();
    clock();
    initAudioSystem();
    $("aboutText").innerHTML = "Version: " + buildNo + ", " + codeName;
}

function checkSetup() {
    if (lStore("setup") != null) return true;
    return false;
}

function startSetup() {
    consoleWrite("Setup is not compelete, starting setup...");
    installDefaultApps();
}

function loadUserLibs() {
}
