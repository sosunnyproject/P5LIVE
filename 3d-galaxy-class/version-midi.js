let globalRotate = false;
let orbitRadius = 100;
let mic, micVolume, vol = 12;
let planetColors = [];
let sateliteColors = [];
let obj, textureImg;

window.KNOB_1 = 2; // planets angle
window.KNOB_2 = 2; // planets orbit
window.KNOB_3 = 2; // rotation speed change
window.KNOB_4 = 2; // shapes scale
window.KNOB_5 = 2; // translation speed
window.KNOB_6 = 2; // tangent function
window.KNOB_7 = 2; // cam speed
window.KNOB_8 = 100; // fade black size

let trSpeed = window.KNOB_5;
let changeToTangent = window.KNOB_6;
let camSpeed = window.KNOB_7;
let blackSize = window.KNOB_8/10;


function preload() {
	obj = loadModel('./assets/pink-rabbit.obj');
	textureImg = loadImage('./assets/rabbitCol.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	background(0);
	// 마이크 연결 
	mic = new p5.AudioIn();
	mic.start();
	planetColors = window.colors1;

    setupMidi();
}
function mouseClicked() {
	globalRotate = true;
}
function draw() {
	//background(0);
	orbitControl();
	fadeToBlack();
	noStroke();
	strokeWeight(1);
	// 마이크 소리 크기 
	micVolume = mic.getLevel() * 100;
	vol = map(micVolume, 0, 50, 1, 25);
	// midi
	planetColors = window.colors1;
	trSpeed = window.KNOB_5;
	changeToTangent = window.KNOB_6;
	camSpeed = window.KNOB_7;
	blackSize = window.KNOB_8/10;

    // center
	texture(textureImg);
	textureMode(NORMAL);
	
    // model
	push();
	noStroke();
	translate(0, 380, 0)
	rotateX(180);
	rotateY(sin(frameCount)*180);
	scale(vol*80);
	fill(sin(frameCount/2)*50);
	stroke(255);
	strokeWeight(0.05);
	model(obj);
	pop();
	
    camera(cos(frameCount/camSpeed)*(width), sin(frameCount/camSpeed)*height, 100+tan(frameCount)*150);  // *** CHANGE

    // planets
    push()
	translate(cos(frameCount/trSpeed)*width/6, sin(frameCount/trSpeed)*height/6, 300 + sin(frameCount)*200); // *** CHANGE
	rotateX(cos(frameCount/window.KNOB_3)*window.KNOB_2*6);
	// rotateZ(sin(frameCount/window.KNOB_3)*window.KNOB_2*6);
	// rotateY(cos(frameCount/window.KNOB_3)*window.KNOB_2*6);
    scale(window.KNOB_4/100);
    geometricShapeMovement();
    pop();

}


function fadeToBlack() {
	push();
	// translate(0, 0, 0);
	translate(0, 0, -800);
	rotateX(cos(frameCount/5)*360);
	rotateY(sin(frameCount/5)*360);
	fill(0, 30); 
	noStroke();
	beginShape();
	plane(width*blackSize, height*blackSize);
	endShape(CLOSE);
	pop();
}

function geometricShapeMovement() {
	
	// addCircleLines();
	
	addGroup1(0, 0);
	addGroup2(-20, orbitRadius*2 + window.KNOB_2*3);
	addGroup3(-80, orbitRadius*4 + window.KNOB_2*3);
	addGroup4(-140, orbitRadius*6 + window.KNOB_2*3);
	addGroup2(75 , orbitRadius*6 + window.KNOB_2*3);
	// addGroup3(85, orbitRadius*4);
	addGroup4(95, orbitRadius*2 + window.KNOB_2*3);
	addGroup2(165 + window.KNOB_1*3, orbitRadius*6 );
	addGroup3(185 + window.KNOB_1*3, orbitRadius*4);
	// addGroup4(195, orbitRadius*2);
	// addGroup2(255, orbitRadius*6);
	addGroup3(245+ window.KNOB_1*3, orbitRadius*4);
	addGroup4(275+ window.KNOB_1*3, orbitRadius*2);

}


function addGroup1(angle, radius) {
	let x = cos(angle)*radius;
	let y = sin(angle)*radius;
	push();
	fill(planetColors[0]);
	stroke("#bcbcbc");
	noStroke();
	translate(x, y, 0);
	rotateZ(sin(frameCount)*180);
	rotateY(sin(frameCount)*180);
	box(50+vol);
	
	fixSpherePlanet(60, 30, 10, planetColors[0]);
	fixSpherePlanet(60, 60, 10, planetColors[1]);
	fixSpherePlanet(60, 90, 10, planetColors[2]);
	fixSpherePlanet(60, 120, 10, planetColors[3]);
	fixSpherePlanet(60, 150, 10, planetColors[4]);
	fixSpherePlanet(60, 180, 10, planetColors[0]);
	fixSpherePlanet(60, 210, 10, planetColors[1]);
	fixSpherePlanet(60, 240, 10, planetColors[2]);
	fixSpherePlanet(60, 270, 10, planetColors[3])
	fixSpherePlanet(60, 300, 10, planetColors[4]);
	fixSpherePlanet(60, 330, 10, planetColors[0]);
	fixSpherePlanet(60, 360, 10, planetColors[1]);
	
	pop();
}
function addGroup2(angle, radius) {
	let x = cos(angle)*radius;
	let y = sin(angle)*radius;

	if(changeToTangent > 60) {
		y = tan(angle)*radius;
	} else {
		y = sin(angle)*radius;
	}
	push();
	noStroke();
	fill(planetColors[1]);
	// rotateX(sin(frameCount)*180);
	translate(x, y, 0);
	box(25+vol);
	
	addBoxPlanet(50+vol/4, 5, 10, planetColors[0]);
	addBoxPlanet(50+vol/4, 10, 10, planetColors[1]);
	addBoxPlanet(50+vol/4, 15, 10, planetColors[2]);
	addBoxPlanet(50+vol/4, 20, 10, planetColors[3]);
	addBoxPlanet(50+vol/4, 25, 10, planetColors[0]);
	
	pop();
}
function addGroup3(angle, radius) {
	let x = cos(angle)*radius;
	let y = sin(angle)*radius;
	if(changeToTangent > 60) {
		x = tan(angle)*radius;
	} else {
		x = cos(angle)*radius;
	}
	push();
	fill(planetColors[2]);
	translate(x, y, 0);
	rotateY(cos(frameCount)*180);
	box(20+vol, 10);
	
	addBoxPlanet(40, 5, 10, planetColors[0]);
	addBoxPlanet(50, 10, 10, planetColors[1]);
	addBoxPlanet(60, 15, 10, planetColors[2]);
	addBoxPlanet(70, 20, 10, planetColors[3]);
	addBoxPlanet(80, 25, 10, planetColors[0]);

	pop();
}
function addGroup4(angle, radius){
	let x1 = cos(angle)*radius;
	let y1 = sin(angle)*radius;
	if(changeToTangent > 60) {
		y = tan(angle)*radius;
	} else {
		y = sin(angle)*radius;
	}
	push();
	fill(planetColors[3]);
	translate(x1, y1, 0);
	rotateZ(sin(frameCount)*180);
	rotateY(cos(frameCount)*360);
		push();
		rotateX(180);
		fill(planetColors[3]);
		box(45+vol, 70);

		rotateX(90);
		fill(planetColors[2]);
		box(70, 0.5, 4, 10);

		rotateX(90);
		fill(planetColors[1]);
		box(70+vol, 0.5);
		pop();
	pop();
}
function addBoxPlanet(orbit, speed, radius, col) {
	let x = cos(frameCount*speed)*orbit;
	let y = sin(frameCount*speed)*orbit;
	if(changeToTangent > 60) {
		x = tan(frameCount*speed)*orbit;
	} else {
		x = cos(frameCount*speed)*orbit;
	}
	push();
	fill(color(col));
	translate(x, 0, y);
	box(radius+vol);
	pop()
}

function fixSpherePlanet(orbit, angle, radius, col) {
	let x = cos(angle)*orbit;
	let y = sin(angle)*orbit;
	push();
	fill(color(col));
	translate(x, y, 0);
	box(radius);
	pop();
}
function addSpherePlanet(orbit, speed, radius, col) {
	let x = cos(frameCount*speed)*orbit;
	let y = sin(frameCount*speed)*orbit;
	push();
	fill(color(col));
	translate(x, y, 0);
	box(radius);
	pop();
}

function addConePlanet(orbit, speed, radius, col) {
	let x = cos(frameCount*speed)*orbit;
	let y = sin(frameCount*speed)*orbit;
	push();
	fill(color(col));
	translate(x, y, 0);
	box(radius, radius+10);
	pop();
}

function addTorusPlanet(orbit, speed, radius, col) {
	let x = cos(frameCount*speed)*orbit;
	let y = sin(frameCount*speed)*orbit;
	push();
	fill(color(col));
	translate(x, y, 0);
	box(radius, radius+10);
	pop();
}
function addCircleLines() {
	push();
	noFill();
	stroke("#eeeeee");
	strokeWeight(0.1);
	ellipse(0, 0, orbitRadius, orbitRadius);
	ellipse(0, 0, orbitRadius*2, orbitRadius*2);
	ellipse(0, 0, orbitRadius*3, orbitRadius*3);
	ellipse(0, 0, orbitRadius*4, orbitRadius*4);
	ellipse(0, 0, orbitRadius*5, orbitRadius*5);
	ellipse(0, 0, orbitRadius*6, orbitRadius*6);
	pop();
}


// midi setting

let coolors1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let coolors2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d"];
let coolors3 = ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];
let coolors4 = ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"];

window.colors1 = coolors1;
window.colors2 = coolors2;


// midi programs
const MIDI_CLOCK = 248;
const TYPE_NOTE_ON = 144;
const TYPE_NOTE_OFF = 128;
const CHANNEL_KEYBOARD = 1;
const CHANNEL_PAD = 0;
const CHANNEL_2 = 2;
const CHANNEL_3 = 3;
const TYPE_KNOB = 176;
const PAD1 = 36, PAD2 = 37, PAD3 = 38, PAD4 = 39, PAD5 = 40, PAD6 = 41;

// 미디 연결
function setupMidi() {
    if (navigator.requestMIDIAccess) console.log('이 브라우저는 WebMIDI를 지원합니다!')
    else console.log('WebMIDI가 실행되지 않습니다.')
    // ask for MIDI access
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
// 미디 연결
function onMIDISuccess(midiAccess) {
    const midi = midiAccess
    const inputs = midi.inputs.values()
    const input = inputs.next()
    input.value.onmidimessage = onMIDIMessage
}

// 미디 키보드 눌렀을 때 발생하는 이벤트
function onMIDIMessage(message) {
    const data = message.data // [command/channel, note, velocity]
    const cmd = data[0] >> 4
    channel = data[0] & 0xf
    type = data[0] & 0xf0
    note = data[1]
    velocity = data[2]
    
    // console.log(data);
	// console.log(channel, type, note);
    // 248 is midi clock
    if (data[0] != MIDI_CLOCK) {    
        if(type === TYPE_NOTE_ON) {
        	console.log(channel, type, note, velocity);
            if(channel === CHANNEL_KEYBOARD) {
                keyboardPressed(channel, note, velocity);
            } else if(channel === CHANNEL_PAD) { 
                padPressed(channel, note, velocity);
            } else { 
                console.log(`etc: channel: ${channel}, note: ${note}, vel: ${velocity}`);
            }
        } else if(type === TYPE_KNOB) {
            knobChanged(channel, note, velocity);
        }
    }
}
// AKAI Laptop Pad Controller 8
// PAD5.NOTE40  PAD6.NOTE41  PAD7.NOTE42  PAD8.NOTE43
// PAD1.NOTE36  PAD2.NOTE37  PAD3.NOTE38  PAD4.NOTE39
function padPressed() {
    console.log(`PAD: channel: ${channel}, note: ${note}, vel: ${velocity}`);
    changeColors(note);
}
function keyboardPressed() {
    console.log(`KEYBOARD: channel ${channel}, note: ${note}, vel: ${velocity}`);
}
function knobChanged(channel, note, velocity){
    console.log(`KNOBS: channel ${channel}, note: ${note}, vel: ${velocity}`);
	changeKnobValues();
}
function changeKnobValues() {
	switch(note) {
        case 1:
            window.KNOB_1 = velocity;
            break;
        case 2:
            window.KNOB_2 = velocity;
            break;
        case 3:
            window.KNOB_3 = velocity;
            break;
        case 4:
            window.KNOB_4 = velocity;
            break;
        case 5:
            window.KNOB_5 = velocity;
            break;
        case 6:
            window.KNOB_6 = velocity;
            break;
        case 7:
            window.KNOB_7 = velocity;
            break;
        case 8:
            window.KNOB_8 = velocity;
            break;
    }
}

function changeColors(note) {
    switch(note){
        case PAD1:
            window.colors1 = coolors1;
            break;
        case PAD2:
            window.colors1 = coolors2;
            break;
        case PAD3:
            window.colors1 = coolors3;
            break;
        case PAD4:
            window.colors1 = coolors4;
            break;
    }
}
function checkNoteOnOFF(type) {
    switch (type) {
        case TYPE_NOTE_ON: // noteOn message type (always 144 no matter what channel)
            noteOn(channel, note, velocity);
            break;
        case TYPE_NOTE_OFF: //noteOff message type (always 128)
            noteOff(channel, note, velocity);
            break;
    }
}

function noteOn(channel, note, velocity) {
    console.log(channel, note, velocity);

}

function noteOff(channel, note, velocity) {
    console.log(channel, note, velocity);

}

function onMIDIFailure(e) {
    console.log('Could not access your MIDI devices: ', e)
}