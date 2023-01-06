// Press 0~9 number keys to see some (slight) visual difference: 0, 1 are the most dramatic.
// You can also use Mouse to rotate the sphere and black fadeout plane. 
// inspiration: three body problem (sf novel), the concept of constantly disappearing and evoloving planets in the outerspace 

let libs = [ 'includes/libs/midi.js'];

let ambientBrightness = 100;
let cubes = [];
let theta = 30;
let colors = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let sectorCount = 60
let sectorStep = 360 / sectorCount;
let stackCount = 60
let stackStep = 180 / stackCount; 
let radius = 20;
let stackAngle, sectorAngle;

window.KNOB_1 = 10; // angle
window.KNOB_2 = 2; //speed rotateZ
window.KNOB_3 = 4; // speed rotateY
window.KNOB_4 = 4; // numkey, change gap
window.KNOB_5 = 1; // rotate cube
window.KNOB_6 = 20; // cube size
// window.KNOB_7 = 1;
// window.KNOB_8 = 1;

let numKey = 1;
// window.coolors = colors;
let rotateCube = 10;
let cubeSize = 4;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	// rectMode(CENTER);
	  noStroke();
	  setupMidi();
	
	let index = 0;
	
	// 3d sphere: http://www.songho.ca/opengl/gl_sphere.html
	for(let stAngle = 0; stAngle < 360; stAngle += 10) {
		let xy = radius*cos(stAngle);  
		let z = radius*sin(stAngle);
		
		for(let secAngle = -30; secAngle < 30; secAngle += 10) {
			let x = xy*cos(secAngle);
			let y = xy*sin(secAngle);
			
			let vec = createVector(x, y, z);
			let c = new Cube(vec, index, stAngle/10, secAngle/10, 0);
			index++;
			cubes.push(c);
		}		
	}

}

function draw() {
	background(0);        // **CHANGE
	// fadeToBlack();       // **CHANGE
	lights();
	ambientMaterial(120);
	ambientLight(ambientBrightness);
	orbitControl();
	
	// ***DISABLE ENABLE DISABLE
	// camera(sin(frameCount)*(width), cos(frameCount)*(height), 100+tan(frameCount)*50);  // *** CHANGE
	
	// *** MIDI
	let knobAngle = window.KNOB_1/10 || 10; 
	numKey = window.KNOB_4 ? Math.floor(map(window.KNOB_4, 0, 127, 1, 9)) : 1;   // *** DRAMATIC
	rotateCube = Math.floor(map(window.KNOB_5, 0, 127, 5, 105));
	cubeSize = Math.floor(map(window.KNOB_6, 0, 127, 2, 20));
	// *** overall rotate
	
    push()
	// translate(cos(frameCount)*100, sin(frameCount)*100 , tan(frameCount)*100); // *** CHANGE
 
	for(let i = 0; i < cubes.length; i++) {
		cubes[i].render();
		cubes[i].rotate(knobAngle);
		cubes[i].changeColors(window.coolors)	// **** CHANGE MIDI COLORS
	}
	pop();
	
}

function keyPressed() {
	numKey = Number(key);

}

class Cube {
	constructor(pos, ind, stIndex, secIndex, angle) {
		this.index = ind
		this.angle = angle;
		this.pos = pos;
		this.gap = 30;
		this.stIndex= stIndex;
		this.secIndex = secIndex;
		this.col = color(random(colors));
	}
	
	changeColors(palette) {
		this.col = color(palette[this.index%palette.length]);
	}
	
	render() {
	
	// **CHANGE KNOB_3, 2 for SPEED.. tan, 30 => 10
	 rotateY(cos(frameCount/(window.KNOB_3*15))*(rotateCube*this.index));
	 rotateZ(sin(frameCount/(window.KNOB_2*15))*(rotateCube*this.index));
    
		push();
		translate(this.pos.x*this.gap, this.pos.y*this.gap, this.pos.z*this.gap);
		if(this.index%3 === 0) { 
			rotateX(this.angle);
		} else if(this.index%3 === 1) {
			rotateY(this.angle);
		} else if(this.index%3 === 2) {
			rotateZ(this.angle);
		}
		ambientMaterial(this.col);
		box(cubeSize);
		pop();
		
		if(this.index%numKey === 0) {
			this.gap = sin(frameCount/10) * 30; // **** CHANGE ***** 
			
		} else {
			this.gap = 10 + 20 * cos(frameCount/4);
		}
	}
	
	rotate(t) { 
	  this.angle += t;
	}
	
}

// ref: https://openprocessing.org/sketch/1587239  
function fadeToBlack() {
	// translate(0, 0, 0);
	rotateX(cos(frameCount/4)*100);
	rotateY(sin(frameCount/4)*100); //*** CHANGE to TAN
  // fill(250, 250, 230, 40);
	fill(0, 10); 
	beginShape();
	vertex(-width/2, -height/2, 0);
	vertex( width/2, -height/2, 0);
	vertex( width/2, height/2, 0);
	vertex(-width/2, height/2, 0);
	endShape(CLOSE);
}