let xInterval = 4;
let yoff = 0;
let radius = 70;
let amplitude = 1.0;
let mic;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	noFill();

	// 마이크 연결
	mic = new p5.AudioIn();
	mic.start();

	// 색상 모드 변경
	colorMode(RGB);
}
function mouseClicked() {
	console.log(micVolume);
}

function draw() {
	// 마이크 소리 크기
	micVolume = mic.getLevel() * 100;
	let vol = map(micVolume, 0, 100, 10, 600);

	radius = vol + sin(frameCount / 3) * 30 

	let param1 = {
		segments: 700 + vol / 2, 
		intensity: 1, 
		amplitude: 2.0, 
		rotationSpeed: 20, 
		radius: radius + 50, 
		col: color("#ffe97f"),
		strokeW: 0.1 
	}
	noiseCircleVertex(param1);

	let param2 = {
		segments: 700 + vol / 2,
		intensity: 1,
		amplitude: 2.0,
		rotationSpeed: 40,
		radius: radius + 100, 
		col: color("#ffd400"), // 
		strokeW: 0.1 // 선 두께
	}
	noiseCircleVertex(param2);

	let param3 = {
		segments: 800,
		intensity: 1, 
		amplitude: 2.0, 
		rotationSpeed: 10,
		radius: radius + 150, 
		col: color(255, 238, 153, 100), // 
		strokeW: 0.1 // 선 두께
	}
	noiseCircleVertex(param3);

	
	let param4 = {
		segments: 800,
		intensity: 1,
		amplitude: 2.0, 
		rotationSpeed: 10,
		radius: radius + 200, 
		col: color(255, 225, 76, 50), // 
		strokeW: 0.1 // 선 두께
	}
	noiseCircleVertex(param4);
	
		// 검정 원
	let paramBlack = {
		segments: 800,
		intensity: 1, 
		amplitude: 2.0, 
		rotationSpeed: 40,
		radius: 100 + vol/80 + sin(frameCount/2) * 120, 
		col: color("#000000"), // 검정색
		strokeW: 0.3 // 선 두께
	}
	noiseCircleVertex(paramBlack);

	
	// 검정 원
	let paramBlack2 = {
		segments: width-100,
		intensity: 1, 
		amplitude: 2.0, 
		rotationSpeed: 40,
		radius: 150 + vol/80 + sin(frameCount/2) * 120, 
		col: color("#000000"), // 검정색
		strokeW: 0.3 // 선 두께
	}
	noiseCircleVertex(paramBlack2);

	yoff += 0.002;
	// customFilter();
}

function customFilter() {
    drawingContext.shadowColor = "#000000";
    drawingContext.shadowOffsetX = -5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
}

function noiseCircleVertex(params) {
const {
    segments, intensity, amplitude, rotationSpeed, 
    radius, col, strokeW
} = params
let segmentStep = 360 / segments;
push();
    translate(width/2, height/2);  // center of canvas
    rotate(sin(frameCount/4)*rotationSpeed);

    beginShape();
    for (let i = 0; i <= segments; i += 1) {
        let theta = i * segmentStep;
        
        let n = map(noise(cos(theta)*intensity+1,
            sin(theta)*intensity, yoff), 
            0.0, 1.0, 
            amplitude, 5.4)
        
        let x = radius * cos(theta) * n
        let y = radius * sin(theta) * n
  
        if(col) stroke(col);
        else stroke(250, 100, 80);
        
        if(strokeW) strokeWeight(strokeW);
        else strokeWeight(0.01);
        
        vertex(x, y);
        // curveVertex(x + rand1, y + rand2);
        // curveVertex(x + rand4, y + rand3);

    }
    endShape(CLOSE);
pop();

}

function perlinVertex(params){
const {
    startY, endY, xGap, xOffset = 0.05, strokeW, col
} = params
    
push();
    beginShape();
    let xoff = 0;
    let extra = map(noise(xoff, yoff) * endY, 0, endY, 0, 250);
    
     if(strokeW) strokeWeight(strokeW);
    else strokeWeight(0.4);

    if(col) stroke(col);
  else stroke(51, 140, 152 + extra + endY/20);

    for (let x = -100; x < width+100; x += xGap) {
            let y = map(noise(xoff, yoff), 0, 1, startY, endY);
            vertex(x, y);
            xoff += xOffset;
        }
    vertex(width+100, height+40); 
    vertex(-30, height+30); 
    endShape(CLOSE);
pop();
}

function mousePressed() {
rand1 = random(-25, 25);
rand2 = random(-50, 50);
rand3 = random(-25, 25);
rand4 = random(-50, 50);
}
