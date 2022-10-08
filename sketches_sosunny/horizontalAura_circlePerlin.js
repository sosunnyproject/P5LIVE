let libs = [ 'includes/libs/midi.js']
let xInterval = 4;
let yoff = 0;
let radius = 70;
let amplitude = 1.0;
let strokeW1 = 1.0;

// window.SIN_0, SIN_8, SIN_16, : notes true or false;
// window.KNOB_48 ... 55 : 0 ~ 127 velocity
window.coolors = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"];

function setup() {
	createCanvas(windowWidth, windowHeight)
	setupMidi();
	
	background(0);
	strokeWeight(10);
	angleMode(DEGREES);
	noFill();
	blendMode(HARD_LIGHT); 
	colorMode(RGB);
	
	randomSeed(Math.random() * 1341);
}


function draw() {
	background(0, 20);                               //*** CHANGE
	let left = createVector(width/3-120, height/2);
	let middle = createVector(width/2, height/2);
	let right = createVector(width/3*2, height/2);
	
	let seg_num = window.KNOB_48;   // sharp or round edges
    let inten_num = window.KNOB_49/10; // 울퉁불퉁
    let amp_num = window.KNOB_50/10;
    strokeW1 = map(window.KNOB_52, 0, 127, 0.2, 10.0);
	// radius: sin, cos, tan
	
	let r_speed = 2;                                //*** CHANGE
	let r_base = sin(frameCount/r_speed);
	if(window.SIN_0) r_base = sin(frameCount/(r_speed*4));
	if(window.COS_0) r_base = cos(frameCount/(r_speed*2));
	if(window.TAN_0) r_base = tan(frameCount*2);

	radius = r_base*10 + window.KNOB_51;

	let param1 = {
		segments: 300 + seg_num,
		intensity: inten_num, 
		amplitude: amp_num,  
		// 1~10 사이: 숫자가 작을수록 울퉁불퉁하고 크기가 작음.
		rotationSpeed: 10, 	// 회전 속도
		radius: radius+10, // 원의 지름 
		col: color(window.coolors[0]), // 색깔
		strokeW: strokeW1    	// 선 두께
	}
	noiseCircleVertex(param1);
	
	let param2 = {
		segments: 400 + seg_num,  
		intensity: inten_num,    					
		// 위 param1의	intensity 값과 똑같이 쓰기
		amplitude: amp_num, 				 
		// 위 param1의 amplitude 값과 똑같이 쓰기
		rotationSpeed: 40,
		radius: radius + 40, 				
		// 위 param1의 radius 값과 똑같이 쓰기
		col: color(window.coolors[1]),  
		strokeW: strokeW1       // 선 두께
	}
	noiseCircleVertex(param2);
	
	let param3 = {
		segments: 800, 
		intensity: inten_num,    					
		amplitude: amp_num, 				 
		rotationSpeed: 10,
		radius: radius+60, 				
		col: color(window.coolors[2]),  
		strokeW: strokeW1          
		// 선 두께
	}
	noiseCircleVertex(param3);
	
	let param4 = {
		segments: 600, 
		intensity: inten_num,    					
		amplitude: amp_num, 				 
		rotationSpeed: 10,
		radius: radius+100, 				
		col: color(window.coolors[3]),  
		strokeW: strokeW1          
	}
	noiseCircleVertex(param4);
	
	// 검정 원
	let paramBlack = {
		segments: 800, 
		intensity: 1,    				
		amplitude: 2.0, 				 
		rotationSpeed: 100,
		radius: radius+60, 			
		col: color("#000000"),  // 검정색
		strokeW: 2.0       // 선 두께
	}
	noiseCircleVertex(paramBlack); 

    // perlinVertex(startY, endY, xGap, strokeW, col)
    let lineParam1 = {
    	startY: 100, 
    	endY: 300, 
    	xGap: 2, 
    	xOffset: 0.2, 
    	strokeW: 0.5, 
    	col: color("#cdb4db")
    }
	// perlinVertex(lineParam1);
	
	 let lineParam_black= {
    	startY: height/2, 
    	endY: height, 
    	xGap: 5,
    	xOffset: 0.5, 
    	strokeW: 0.5,
    	col: color(255, 0, 0)
    }
	// perlinVertex(lineParam_black);
	// perlinVertex(0, 350, 10, 1, color(0, 0, 0));
	// perlinVertex(0, 350, 10, 1, color(0, 0, 0));
	
	yoff += 0.005;
	
	customFilter();
	
}

function customFilter() {
		drawingContext.shadowColor = "#222222";
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
