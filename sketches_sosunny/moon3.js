let randomSize = []
let img1, img2, img3, img4, img5, img6, img7, img8;
let textureIndex = 1;
let images = [];
let camX = -600;  // 
let camY = -600;
let camZ = -600;
let mic, micVol;

let speed = 3;
let xInterval = 4;
let yoff = 0;
let radius = 70;
let amplitude = 1.0;

function preload() {
  img1 = loadImage('includes/images/dalle1.png')
	img2 = loadImage('includes/images/dalle2.png');
	img3 = loadImage('includes/images/dalle3.png');
	img4 = loadImage('includes/images/dalle4.png');
	img5 = loadImage('includes/images/dalle5.png');
	img6 = loadImage('includes/images/dalle6.png');
	img7 = loadImage('includes/images/dalle7.png');
	img8 = loadImage('includes/images/dalle8.png');
}
// ttttxxxxxzyyyzzzzzzzzzzztttxxxxxxxxztttyyyyyyxzxtyttyy
function keyPressed() {
	switch(key) {
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
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(200);
	for(let i = 0; i < 600; i++){
	 randomSize.push(Math.floor(random(50, 500)));	
	 // textureIndex.push(int(random(0, 4));
	}
	angleMode(DEGREES)
	images.push(img1, img2, img3, img4, img5, img6, img7, img8);

	colorMode(RGB);
}

let amount = 0.0, step = 0.01

function draw() {
	background(0, 9, 41);
	orbitControl();
	ambientMaterial(50);
	
	let dirX = width * sin(frameCount*2) ;
    let dirY = height * cos(frameCount*2) ;
	
	camera(cos(camX*2)*width/2, 
	-height/2 + sin(camY)*height/2, 
	sin(frameCount/speed)*camZ*2);
  directionalLight(0,166,237, width/2, height/2, dirX/2);
  directionalLight(0,166,237, -dirX, -dirY, dirX/2);
	// 155, 177, 255
	// x, y is where the light is.
	// -x, -y is the direction
	// xxyyyzz
	
	pointLight(204, 197, 185, dirX, dirY, 0);
	// 226, 192, 223
	let dirX2 = width * sin(frameCount/speed) ;
  let dirY2 = height * cos(frameCount/speed) ;
  directionalLight(255, 214, 10, dirX2, dirY2, -dirX/2);
	directionalLight(203, 192, 211, dirX2, dirY2, dirY/2);

  // 97, 226, 148
	
	noStroke()
	
	// ambientMaterial(255)
	texture(images[textureIndex]);
	
	let i = 0
	for(let x = -width; x < width; x += 90){
		for(let z = -height; z < height; z += 90) {
			let h = randomSize[i]
			let realH = lerp(h/2, h, amount);
			push()
			translate(x, -realH/2, z);
			// rotateY(sin(frameCount * 0.01));
			// rotateZ(cos(frameCount * 0.01));
			box(20 + h/6, realH,50);
			pop()
			i+=1
		}
	}
  
	if(amount > 1.0 || amount < 0.0) {
		step *= -1
	}
	amount += step/5
	
	push();
	translate(0, -700);
	sphere(100);
	pop();
}
