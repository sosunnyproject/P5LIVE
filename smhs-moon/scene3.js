function drawScene3() {
    background(0, 9, 41);
	orbitControl();
	ambientMaterial(50);

	micVol = mic.getLevel()*100;
	
	let dirX = width * sin(frameCount*2) ;
  let dirY = height * cos(frameCount*2) ;
	
	camera(cos(camX*2)*width/2, -height/2 + sin(camY)*height/4, sin(frameCount/speed)*camZ*2);
    directionalLight(0,166,237, width/2, height/2, dirX/2);
    directionalLight(0,166,237, -dirX, -dirY, dirX/2);
	// 155, 177, 255
	// x, y is where the light is.
	// -x, -y is the direction
	
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
			// sphere(cos(frameCount * 0.01) * 25);
			// torus(30, 15, Math.ceil(Math.abs(cos(frameCount * 0.005)*20))+2, 12);
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