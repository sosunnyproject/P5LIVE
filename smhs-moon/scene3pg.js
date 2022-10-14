function drawScene3() {
    pg3d.background(0, 9, 41);
	pg3d.orbitControl();
	pg3d.ambientMaterial(50);
    pg3d.noFill();

	micVol = mic.getLevel()*100;
	
	let dirX = width * sin(frameCount*2) ;
    let dirY = height * cos(frameCount*2) ;
	
    pg3d.camera(cos(camX*2)*width/2, -height/2 + sin(camY)*height/4, sin(frameCount/speed)*camZ*2);
    pg3d.directionalLight(0,166,237, width/2, height/2, dirX/2);
    pg3d.directionalLight(0,166,237, -dirX, -dirY, dirX/2);
	// 155, 177, 255
	// x, y is where the light is.
	// -x, -y is the direction
	
	pg3d.pointLight(204, 197, 185, dirX, dirY, 0);
	// 226, 192, 223
	let dirX2 = width * sin(frameCount/speed) ;
    let dirY2 = height * cos(frameCount/speed) ;
    pg3d.directionalLight(255, 214, 10, dirX2, dirY2, -dirX/2);
	pg3d.directionalLight(203, 192, 211, dirX2, dirY2, dirY/2);
	noStroke()
	
	// ambientMaterial(255)
	pg3d.texture(images[textureIndex]);
	
	let i = 0
	for(let x = -width; x < width; x += 90){
		for(let z = -height; z < height; z += 90) {
			let h = randomSize[i]
			let realH = lerp(h/2, h, amount);
			pg3d.push()
			pg3d.translate(x, -realH/2, z);
			// rotateY(sin(frameCount * 0.01));
			// rotateZ(cos(frameCount * 0.01));
			pg3d.box(20 + h/6, realH,50);
			// sphere(cos(frameCount * 0.01) * 25);
			// torus(30, 15, Math.ceil(Math.abs(cos(frameCount * 0.005)*20))+2, 12);
			pg3d.pop()
			i+=1
		}
	}
  
	if(amount > 1.0 || amount < 0.0) {
		step *= -1
	}
	amount += step/5
	
	pg3d.push();
	pg3d.translate(0, -700);
	pg3d.sphere(100);
	pg3d.pop();
}