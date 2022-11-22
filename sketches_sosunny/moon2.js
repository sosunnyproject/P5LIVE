// https://www.google.com/search?q=flow+field&tbm=isch&ved=2ahUKEwjG5aiBhLf6AhVJTPUHHe51AFwQ2-cCegQIABAA&oq=flow+field&gs_lcp=CgNpbWcQAzIFCAAQgAQyBAgAEB4yBAgAEB4yBAgAEB4yBAgAEB4yBAgAEB4yBggAEB4QBTIGCAAQHhAFMgYIABAeEAUyBggAEB4QBToICAAQgAQQsQM6CAgAELEDEIMBUABY3AdgpQpoAHAAeACAAZgBiAGfC5IBBDAuMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=uwA0Y4acE8mY1e8P7uuB4AU&bih=1038&biw=2240#imgrc=O-0w_1tFPU1sGM&imgdii=L-qpxwJ2pZogwM
// https://editor.p5js.org/sosunnyproject/sketches/K8nB6pFM9

let xInterval = 4;
let yoff = 0;
let radius = 70;
let amplitude = 1.0;
let mic;
let cnv;

function mouseClicked() {
	cnv = createCanvas(windowWidth, windowHeight, WEBGL);
}
function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	noFill();
	// blendMode(SCREEN);  // HARD_LIGHT : 어두운 느낌, SCREEN: 점점 밝아짐, BLEND: 일반

	// 마이크 연결
	mic = new p5.AudioIn();
	mic.start();
	
	// 색상 모드 변경
	colorMode(RGB); 
	customFilter();
}

function draw() {
	background(0, 10);
	// 마이크 소리 크기
	let micVolume = mic.getLevel()*100;
	let vol = map(micVolume, 0, 1, 10, 40);
	
	radius = sin(frameCount/3) * 10 + vol/20 
	
	let param1 = {
		segments: 700 + vol/10,   	
		intensity: 1,     				
		amplitude: 2.0,   					
		rotationSpeed: 20, 			
		radius: radius+10,        			
		col: color("#fff2b2"),  
		strokeW: 0.1     			
	}
	noiseCircleVertex(param1);
	
	let param2 = {
		segments: 700 + vol/10, 
		intensity: 1,    					
		amplitude: 2.0, 			
		rotationSpeed: 40,
		radius: radius+10, 			
		col: color("#ffe97f"),  
		strokeW: 0.1 
	}
	noiseCircleVertex(param2);
	
	let param3 = {
		segments: 800, 
		intensity: 1,    				
		amplitude: 2.0, 				 
		rotationSpeed: 10,
		radius: radius+15, 			
		col: color("#ffd400"),  
		strokeW: 0.1     
	}
	noiseCircleVertex(param3);
	
		// 검정 원
	let paramBlack = {
		segments: 800, 
		intensity: 1,    	
		amplitude: 2.0, 	
		rotationSpeed: 40,
		radius: radius, 
		col: color("#000000"),  
		strokeW: 0.1 
	}
	noiseCircleVertex(paramBlack);

	
	const lineParam = {
		startY: height/3*2, 
		endY: height, 
		xGap: 25, 
		strokeW: 0.5,
		yoffset: yoff/2,
		col: color(255, 238, 153, 100),  
	}
	perlinVertex(lineParam);
	
	const lineParam2 = {
		startY: height/2, 
		endY: height, 
		xGap: 15, 
		strokeW: 0.5,
		yoffset: yoff/5,
		col: color(255, 225, 76, 50),  
	}
	perlinVertex(lineParam2);
	
	push()
	translate(0, 200)
	perlinVertex(lineParam2);
	pop()

	push()
	translate(0, 100)
	perlinVertex(lineParam2);
	pop()
	
	perlinVertex(lineParam2);
  
	yoff += 0.005;
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
    translate(width/3*2, 100);  // center of canvas
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
    startY, endY, xGap, xOffset = 0.05, yoffset, strokeW, col
} = params
    
push();
    beginShape();
    let xoff = 0;
    let extra = map(noise(xoff, yoffset) * endY, 0, endY, 0, 250);
    
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
