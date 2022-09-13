// Press 0~9 number keys to see some (slight) visual difference: 0, 1 are the most dramatic.
// You can also use Mouse to rotate the sphere and black fadeout plane. 
// inspiration: three body problem (sf novel), the concept of constantly disappearing and evoloving planets in the outerspace 

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
let numKey = 1;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	// rectMode(CENTER);
  noStroke();
	
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
	fadeToBlack();
	lights();
	ambientMaterial(120);
	ambientLight(ambientBrightness);
	orbitControl();
	// camera(sin(frameCount)*(width*2), cos(frameCount)*(height*2), 1000+cos(frameCount)*1000);
	
	for(let i = 0; i < cubes.length; i++) {
		cubes[i].render();
	}
	
}

function keyPressed() {
	numKey = Number(key);
	for(let i = 0; i < cubes.length; i++) {
		cubes[i].rotate(30);
	}
}

class Cube {
	constructor(pos, ind, stIndex, secIndex, angle) {
		this.index = ind
		this.angle = angle;
		this.pos = pos;
		this.gap = 20;
		this.stIndex= stIndex;
		this.secIndex = secIndex;
		this.col = color(random(colors));
	}
	
	render() {
	
	  rotateY(sin(frameCount/2)*(10*this.index));
		rotateZ(cos(frameCount/2)*(10*this.index));

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
		box(4);
		pop();
		
		if(this.index%numKey === 0) {
			this.gap = tan(frameCount/4) * 40;
		} else {
			this.gap = 10 + 20 * cos(frameCount/10);
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
	rotateY(sin(frameCount/4)*100);
  // fill(250, 250, 230, 40);
	fill(0, 10); 
	beginShape();
	vertex(-width/2, -height/2, 0);
	vertex( width/2, -height/2, 0);
	vertex( width/2, height/2, 0);
	vertex(-width/2, height/2, 0);
	endShape(CLOSE);
}