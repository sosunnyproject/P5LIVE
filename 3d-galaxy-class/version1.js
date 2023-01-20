let coolors2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d"];
let coolors1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(100);
	angleMode(DEGREES);
}
let orbitRadius = 100;
function draw() {
	background(0);
	orbitControl();
	noStroke();
	strokeWeight(1);
	// fadeToBlack();
	
	// global roate
	rotateX(sin(frameCount/2)*360);
	rotateZ(sin(frameCount/2)*360);
	rotateY(tan(frameCount/3)*30);
		
	// orbits
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
	rotateZ(sin(frameCount)*180);
	rotateX(sin(frameCount)*180);
	box(50);
	pop();
	
	let r = orbitRadius * 2 / 2;
	let x = cos(30)*r;
	let y = sin(30)*r;
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
	
	let x2 = cos(240)*r*3;
	let y2 = sin(240)*r*3;
	push();
	fill(coolors1[2]);
	translate(x2, y2, 0);
	rotateY(sin(frameCount)*180);
	torus(20, 10);
	addBoxSatelite(20, 0.25, 10);
	addBoxSatelite(30, 1, 10);
	addBoxSatelite(40, 0.5, 15);
	pop();
	
	let x1 = cos(175)*r*2;
	let y1 = sin(175)*r*2;
	push();
	fill(coolors1[3]);
	translate(x1, y1, 0);
	rotateZ(sin(frameCount)*180);
	cone(25, 40);
	addSphereSatelite(25, 0.5, 5);
	addSphereSatelite(30, 0.25, 10);
	addSphereSatelite(35, 1, 15);
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
	// translate(0, 0, 0);
	translate(0, 0, -800);
	rotateX(cos(frameCount)*180);
	rotateZ(sin(frameCount)*360);
  // fill(250, 250, 230, 40);
	fill(0, 20); 
	noStroke();
	beginShape();
	plane(width*2, height*2);
	endShape(CLOSE);
	pop();
}


