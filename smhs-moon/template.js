let randomSize = []
let img1, img2, img3, img4, img5, img6, img7, img8;
let textureIndex = 1;
let images = [];
let camX = -600;  // 
let camY = -600;
let camZ = -600;
let mic, micVol;

let canvas;
let sceneNum = 1;
let pg1, pg2, pg3d;

// scene1, 2
let radius = 70;
let amplitude = 1.0;
let speed = 4;
let xInterval = 4;
let yoff = 0;

function preload() {
  img1 = loadImage('dalle1.png')
	img2 = loadImage('dalle2.png');
	img3 = loadImage('dalle3.png');
	img4 = loadImage('dalle4.png');
	img5 = loadImage('dalle5.png');
	img6 = loadImage('dalle6.png');
	img7 = loadImage('dalle7.png');
	img8 = loadImage('dalle8.png');
}

function deleteCanvas() {
	canvasElement = document.getElementsByTagName("main");
	let canvases = document.getElementsByTagName("canvas");
	console.log(canvases);
	console.log(canvasElement)
	canvasElement = null;
	canvases = null;
}
function keyPressed() {
	console.log(key);
	switch(key) {
		case "1":
			deleteCanvas()
			sceneNum = 1;
			console.log('first scene');
			setupScene1();
			break;
		case "2":
			deleteCanvas();
			sceneNum = 2;
			console.log('second scene');
			setupScene2();
			break;
		case "3":
			deleteCanvas();
			sceneNum = 3;
			console.log("third scene");
			setupScene3();
			break;
		case "x":
			camX += 50;
			break;
		case "y":
			camY += 50;
			break;
		case "z":
			camZ += 50;
			break;
		case "ArrowUp":
			speed += 1;
			break;
		case "ArrowDown":
			speed -= 1;
			break;
		case "t":
			textureIndex++;
			break;
	}

	if(camX > 600) camX = -600;
	if(camY > 600) camY = -600;
	if(camZ > 600) camZ = -600;
	if(textureIndex > 7) textureIndex = 0;
	// up: 38, down: 40;
	
	if(speed === 0) speed = 1;
	console.log(speed);
}
function setup() {
	// common
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    background(0)
	noFill();
	background(0);
	angleMode(DEGREES);
	// 마이크 연결
	mic = new p5.AudioIn();
	mic.start();
	// 색상 모드 변경
	colorMode(RGB); // RGB: red, green, blue, HSB: 0 ~ 360 빨주노초파남보 순서대로.

	for(let i = 0; i < 600; i++){
		randomSize.push(Math.floor(random(50, 500)));	
		// textureIndex.push(int(random(0, 4));
	}
	images.push(img1, img2, img3, img4, img5, img6, img7, img8);
}
function setupScene1() {
	canvas = createCanvas(windowWidth, windowHeight, P2D);
    background(0)
	noFill();
}
function setupScene2() {
	canvas = createCanvas(windowWidth, windowHeight, P2D);

	// blendMode(SCREEN);  // HARD_LIGHT : 어두운 느낌, SCREEN: 점점 밝아짐, BLEND: 일반
}

function setupScene3() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);

}

function mousePressed() {
	console.log(micVol);
}

let amount = 0.0, step = 0.01

function draw() {
	switch(sceneNum) {
		case 1: 
			drawScene1();
			
			break;
		case 2:
			drawScene2();
			break;
		case 3:
			drawScene3();
			break;
	}
}