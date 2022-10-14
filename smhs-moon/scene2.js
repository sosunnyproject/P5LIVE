function drawScene2() {
    background(0, 10);
    customFilter();
    noFill();
	// 마이크 소리 크기
	let micVolume = mic.getLevel()*100;
	let vol = map(micVolume, 0, 1, 10, 40);
	
	radius = sin(frameCount/3) * 100 + vol/20  // 큰 숫자를 곱할수록 원의크기가 커짐.
	
	let param1 = {
		segments: 700 + vol/10,   	// 숫자가 작을수록 뾰족한 모서리가 많고, 클수록 둥그런 모서리가 많음.
		intensity: 1,     					// 1~10 사이: 울퉁불퉁한 정도가 달라짐.
		amplitude: 2.0,   					// 1~10 사이: 숫자가 작을수록 울퉁불퉁하고 크기가 작음.
		rotationSpeed: 20, 			// 회전 속도
		radius: radius+10,        			// 원의 지름 
		col: color("#fff2b2"),   // 색깔
		strokeW: 0.1     			// 선 두께
	}
	noiseCircleVertex2(param1);
	
	let param2 = {
		segments: 700 + vol/10, 
		intensity: 1,    					// 위 param1의	intensity 값과 똑같이 쓰기
		amplitude: 2.0, 				 // 위 param1의 amplitude 값과 똑같이 쓰기
		rotationSpeed: 40,
		radius: radius+10, 				// 위 param1의 radius 값과 똑같이 쓰기
		col: color("#ffe97f"),  // 
		strokeW: 0.1           // 선 두께
	}
	noiseCircleVertex2(param2);
	
	let param3 = {
		segments: 800, 
		intensity: 1,    					// 위 param1의	intensity 값과 똑같이 쓰기
		amplitude: 2.0, 				 // 위 param1의 amplitude 값과 똑같이 쓰기
		rotationSpeed: 10,
		radius: radius+15, 				// 위 param1의 radius 값과 똑같이 쓰기
		col: color(255, 100, 100),  // 
		strokeW: 0.1           // 선 두께
	}
	noiseCircleVertex2(param3);
	
		// 검정 원
	let paramBlack = {
		segments: 800, 
		intensity: 1,    					// 위 param1의	intensity 값과 똑같이 쓰기
		amplitude: 2.0, 				 // 위 param1의 amplitude 값과 똑같이 쓰기
		rotationSpeed: 40,
		radius: radius, 				// 위 param1의 radius 값과 똑같이 쓰기
		col: color(0,0,0),  // 검정색
		strokeW: 0.1        // 선 두께
	}
	noiseCircleVertex2(paramBlack);

	
	const lineParam = {
		startY: height/3*2, 
		endY: height, 
		xGap: 25, 
		strokeW: 0.5,
		yoffset: yoff/2,
		col: color(255, 238, 153, 100),  
	}
	perlinVertex2(lineParam);
	
	const lineParam2 = {
		startY: height/2, 
		endY: height, 
		xGap: 15, 
		strokeW: 0.5,
		yoffset: yoff/5,
		col: color(255, 225, 76, 50),  
	}
	perlinVertex2(lineParam2);
	
	push()
	translate(0, 200)
	perlinVertex2(lineParam2);
	pop()

	push()
	translate(0, 100)
	perlinVertex2(lineParam2);
	pop()
	
	perlinVertex2(lineParam2);
  
	yoff += 0.005;
}