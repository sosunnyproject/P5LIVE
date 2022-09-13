let pg;
let textInput = "hello";
let textInput2 = "lights";
let textInput3 = "drive"; 

// audio
let mic, micLevel = 10;
let fontEN, fontKR;
let t = 0
let speed = 50;

let libs = ['https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js']

function preload() {
  fontEN = loadFont('includes/fonts/SFPROREGULAR.OTF');
  // fontKR= loadFont('includes/fonts/NotoSansKR-Bold.otf');
}

function setup() {
	createCanvas(windowWidth/2, windowHeight/2, WEBGL);
  pg = createGraphics(100, 100);
	colorMode(HSB);
	
  textFont(fontEN);
	// textFont(fontKR);
	textSize(20)
	//audio
  mic = new p5.AudioIn();
  mic.start();
	
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);

}

function draw() {
	background(0);
	orbitControl();
	t = sin(frameCount / speed);
	let camVar = cos(frameCount/100)*10;
	
	camera(100 + camVar * 25, camVar * 15, camVar * 20, // position
				0, 0, 0,  // center XYZ
				sin(frameCount/100)*10,
				sin(frameCount/100)*10, 
			 sin(frameCount/100)*10);   // up
	
	push()
  rotateY(t/5)

	let col1 = Math.abs(Math.floor(sin(frameCount/100)*360));
	let col2 = (360-col1);
	
  // first text
  for (let i = 0; i < 100; i += 1) {
    rotateY(t)  // spiral
    rotateZ(t*0.005)
  
    push()
		fill(frameCount%360, 60, 100)
    translate(100, 100, i * 2)
		noStroke();
    // rotateX(sin(t) * 10)
    // rotateY(sin(t) * 10)
    // rotateZ(sin(frameCount/100)*40)
    text(textInput, 10, 20)
    pop()
  }
  pop()
	fill(col1, 100, 100)
	textRotate(30, textInput2,
		0, sin(frameCount/100), t,
		10, 100*sin(frameCount/100), 10)
  
	fill(col2, 60, 100)
  textRotate(30, textInput3, 
             0, noise(frameCount/100), -t,  
            -30*sin(frameCount/100), -10, 10)
  
}



function textRotate(numText, inputText, rx, ry, rz, tx, ty, tz){
  
  for (let i = 0; i < numText; i += 1) {
    // translate(50, 50, i)
    rotateZ(rz)
    push()
    translate(tx, ty, i * tz)
    rotateY(ry)
    // rotateZ(sin(micLevel) * 10)
    text(inputText, 40, 20)
    pop()
  } 
}


//-------------------------------------------------------//
class RotatingText {
	constructor(inputText, textNums, index, rVec, tVec) {
		this.text = inputText;
		this.textNums = textNums;
		this.rVector = rVec || createVector(0, 0, 0);  // rotation
		this.tVector = tVec || createVector(0, 0, 0);  // translation
		this.index = index
	}
	
	render(rVec, tVec) {
		let hue = Math.abs(Math.floor(sin(frameCount/(30*this.index))*360));
		fill(hue, 60 + sin(frameCount/10)*20, 100);
		
		if(rVec) {
			this.rVector = rVec;
		}
		if(tVec) {
			this.tVector = tVec;
		}
		
		for (let i = 0; i < this.textNums; i += 1) {
			rotateZ(this.rVector.z);
			rotateY(this.rVector.y)
			rotateX(this.rVector.x);
			
			push()
			translate(this.tVector.x, this.tVector.y, i * this.tVector.z)
			text(this.text, 40, 20)
			pop()
		} 
	}
	
	setText(newText) {
		this.text = newText;
	}
	
}