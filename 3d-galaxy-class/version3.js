let coolors2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d"];
let coolors1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let coolors3 = ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];
let coolors4 = ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"];
let globalRotate = false;
let orbitRadius = 100;
let mic, micVolume, vol;
let planetColors = [];
let sateliteColors = [];
let obj, textureImg;

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
	planetColors = coolors3;
	sateliteColors = coolors3;
}
function mouseClicked() {
	globalRotate = true;
}
function draw() {
	// background(0);
	orbitControl();
	fadeToBlack();
	noStroke();
	strokeWeight(1);
	// 마이크 소리 크기 
	micVolume = mic.getLevel() * 100;
	vol = map(micVolume, 0, 50, 10, 160);

    // center
	texture(textureImg);
	textureMode(NORMAL);
	
	push();
	// fill(planetColors[0]);
	// stroke("#bcbcbc");
	noStroke();
	translate(0, 200, 0)
	rotateX(180);
	rotateY(sin(frameCount)*180);
	scale(60 + vol/10);
	fill(sin(frameCount/2)*50);
	stroke(255);
	strokeWeight(0.1);
	model(obj);
	pop();
	
     camera(cos(frameCount)*(width), cos(frameCount)*(height), -200+tan(frameCount)*100);  // *** CHANGE

    // others
    push()
	translate(cos(frameCount)*width/2, tan(frameCount)*height/2 , -300 + sin(frameCount)*400); // *** CHANGE
	// rotateX(sin(frameCount/5)*360);
	// rotateZ(sin(frameCount/5)*180);
	// rotateY(cos(frameCount/8)*10);
    // scale(0.5);
    geometricShapeMovement();
    pop();
}


function addSphereSatelite(orbit, slowness, radius, col) {
	let x1 = cos(frameCount/slowness)*orbit*2;
	let y1 = sin(frameCount/slowness)*orbit*2;
	
	push();
	fill(color(col));
	translate(x1, y1, 0);
	sphere(radius + vol/40);
	pop();
}


function addBoxSatelite(orbit, slowness, radius, col) {
	let x1 = cos(frameCount/slowness)*orbit*2;
	let y1 = sin(frameCount/slowness)*orbit*2;
	
	push();
	fill(color(col));
	translate(x1, y1, 0);
	box(radius + vol/40);
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
	plane(width*2, height);
	endShape(CLOSE);
	pop();
}


function geometricShapeMovement() {
	
	push();
	noFill();
	stroke("#eeeeee");
	strokeWeight(0.1);
	// ellipse(0, 0, orbitRadius, orbitRadius);
	// ellipse(0, 0, orbitRadius*2, orbitRadius*2);
	// ellipse(0, 0, orbitRadius*3, orbitRadius*3);
	// ellipse(0, 0, orbitRadius*4, orbitRadius*4);
	// ellipse(0, 0, orbitRadius*5, orbitRadius*5);
	// ellipse(0, 0, orbitRadius*6, orbitRadius*6);
	pop();
	

	
	let r = orbitRadius / 2;
	let x = cos(frameCount)*r;
	let y = tan(frameCount)*r;
	push();
	noStroke();
	fill(planetColors[1]);
	translate(x, y, 0);
	rotateX(sin(frameCount)*180);
	box(25);
	pop();
	
	let x2 = tan(frameCount)*r*3;
	let y2 = sin(frameCount)*r*3;
	push();
	fill(planetColors[2]);
	translate(x2, y2, 0);
	rotateY(cos(frameCount)*360);
	// torus(20, 10);
	box(50);
	addBoxSatelite(70, 0.2, 10, sateliteColors[0]);
	addBoxSatelite(90, 0.3, 10, sateliteColors[1]);
	addBoxSatelite(120, 0.4, 10, sateliteColors[2]);
	addBoxSatelite(140, 0.5, 20, sateliteColors[3]);
	addBoxSatelite(160, 0.6, 20, sateliteColors[4]);

	pop();
	
	let x1 = cos(frameCount/2)*r*2;
	let y1 = sin(frameCount/2)*r*2;
	push();
	fill(planetColors[3]);
	translate(x1, y1, 0);
	rotateZ(cos(frameCount)*180);
	// cone(25,  40);
	box(40);
	addBoxSatelite(50, 0.6, 10, sateliteColors[0]);
	addBoxSatelite(250, 0.7, 10, sateliteColors[1]);
	addBoxSatelite(300, 0.8, 10, sateliteColors[2]);
	addBoxSatelite(100, 0.2, 5, sateliteColors[3])
	addBoxSatelite(150, 0.3, 5, sateliteColors[4])
	addBoxSatelite(200, 0.4, 5, sateliteColors[0])
	pop();
	
	
	let x3 = tan(frameCount/1.5)*r*4;
	let y3 = sin(frameCount/1.5)*r*4;
	push();
	fill(planetColors[4]);
	translate(x3, y3, 0);
	rotateZ(cos(frameCount)*180);
	// cone(25, 40);
	box(40);
	addBoxSatelite(50, 0.6, 10, sateliteColors[0]);
	addBoxSatelite(100, 0.7, 10, sateliteColors[1]);
	addBoxSatelite(150, 0.8, 10, sateliteColors[2]);
	addBoxSatelite(200, 0.2, 5, sateliteColors[3])
	addBoxSatelite(250, 0.3, 5, sateliteColors[4])
	addBoxSatelite(300, 0.4, 5, sateliteColors[0])
	pop();
}