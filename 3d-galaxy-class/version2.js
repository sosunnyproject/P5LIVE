let coolors2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d"];
let coolors1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let coolors3 = ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];
let coolors4 = ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"];

let globalRotate = true;
let mic, micVolume, vol;
let orbitRadius = 100;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	background(0);
	// 마이크 연결 
	mic = new p5.AudioIn();
	mic.start();
}
function mouseClicked() {
	globalRotate = true;
}
function draw() {
	background(0);
	orbitControl();
	// fadeToBlack();
	noStroke();
	strokeWeight(1);
	// 마이크 소리 크기 
	micVolume = mic.getLevel() * 100;
	vol = map(micVolume, 0, 50, 10, 360);
	// camera(sin(frameCount)*(width), cos(frameCount)*(height), -200+tan(frameCount)*1050);  // *** CHANGE
	// translate(sin(frameCount)*width/2, cos(frameCount)*height/2 , -300 + sin(frameCount)*400); // *** CHANGE
    scale(0.5);
    
    // rotateX(sin(frameCount/6)*360);
	// rotateZ(cos(frameCount/6)*360);
	// rotateY(sin(frameCount/5)*10);

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
	
	push();
	fill(coolors1[0]);
	stroke("#bcbcbc");
	noStroke();
	rotateZ(cos(frameCount + vol)*180);
	rotateX(sin(frameCount + vol)*180);
	box(30 + vol/4);
	pop();
	
	let r = orbitRadius / 2;
	let x = cos(frameCount)*r*4;
	let y = sin(frameCount)*r*4;
	push();
	noStroke();
	fill(coolors1[1]);
	rotateX(sin(frameCount)*180);
	translate(x, y, 0);
	sphere(25);
	addBoxSatelite(20, 0.25, 10);
	addBoxSatelite(30, 1, 10);
	addBoxSatelite(40, 0.5, 15);
	pop();
	
	let x2 = cos(frameCount*2)*r*3;
	let y2 = sin(frameCount*2)*r*3;
	push();
	fill(coolors1[2]);
	translate(x2, y2, 0);
	rotateY(cos(frameCount)*180);
	torus(20+ vol/16, 10);
	addBoxSatelite(50, 0.25, 10);
	addBoxSatelite(70, 1, 10);
	addBoxSatelite(20, 0.5, 15);
	pop();
	
	let x1 = cos(frameCount/2)*r*6;
	let y1 = sin(frameCount/2)*r*6;
	push();
	fill(coolors1[3]);
	translate(x1, y1, 0);
	rotateZ(sin(frameCount)*180);
	cone(25 + vol/16, 40);
	addBoxSatelite(10, 0.5, 5);
	addBoxSatelite(20, 0.25, 10);
	addBoxSatelite(25, 1, 15);
	pop();
	
	let x3 = cos(frameCount/1.5)*r*5;
	let y3 = sin(frameCount/1.5)*r*5;
	push();
	fill(coolors1[4]);
	translate(x3, y3, 0);
	rotateZ(cos(frameCount)*180);
	// cone(25, 40);
	box(40 + vol/8);
	addBoxSatelite(50, 0.25, 10);
	addBoxSatelite(10, 1, 10);
	addBoxSatelite(15, 0.5, 15);
	pop();
	
	
}


function addSphereSatelite(orbit, slowness, radius) {
	let x1 = cos(frameCount/slowness)*orbit*2;
	let y1 = sin(frameCount/slowness)*orbit*2;
	
	push();
	translate(x1, y1, 0);
	sphere(radius);
	pop();
}


function addBoxSatelite(orbit, slowness, radius) {
	let x1 = cos(frameCount/slowness)*orbit*2;
	let y1 = sin(frameCount/slowness)*orbit*2;
	
	push();
	translate(x1, y1, 0);
	box(radius);
	pop();
}


function fadeToBlack() {
	push();
	translate(0, 0, -800);
	rotateX(cos(frameCount)*180);
	rotateZ(sin(frameCount)*360);
	fill(0, 25); 
	noStroke();
	beginShape();
	plane(width, height);
	endShape(CLOSE);
	pop();
}