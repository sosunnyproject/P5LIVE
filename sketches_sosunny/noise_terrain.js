let RX = 70;
let RY = 0;
let RZ = 0;
let LX = 78;
let LY = -170
let LZ = -7
let TX = 386;
let TY = 72
let TZ = -283

let coolorsPurple = extractColors('https://coolors.co/palette/ea698b-d55d92-c05299-ac46a1-973aa8-822faf-6d23b6-6411ad-571089-47126b')
let coolorsGreen = extractColors('https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb')
// https://coolors.co/540d6e-ee4266-ffd23f-3bceac-0ead69
//https://coolors.co/a4243b-d8c99b-d8973c-bd632f-273e47
// https://coolors.co/5bc0eb-fde74c-9bc53d-c3423f-211a1e
//imported
function extractColors(url) 
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

let cols;
let rows;
let scl = 40;
let noise1 = [];
let noise2 = [];
let noise3 = [];
let smallCol, smallRow
let smallnoise1 = [];
let colorsP = [];
let colorsG = [];
let flying = 10;
let yoff = flying;

function setup() {
	createCanvas(800, 600, WEBGL);
	background(0);
	cols = (width/2)/scl;
	rows = (height/2)/scl;
	smallCol = (width/2)/scl
	smallRow = (height/2)/scl
	stroke(255);
	noFill();
	colorMode(HSB);
	
	for(let y = 0; y < 100; y++) {
		colorsP[y] = []
		for(let x = 0; x < 100; x++) {
			const c = random(coolorsPurple)
			colorsP[y][x] = color(c)
		}
	}
	for(let y = 0; y < 100; y++) {
		colorsG[y] = []
		for(let x = 0; x < 100; x++) {
			const c = random(coolorsGreen)
			colorsG[y][x] = color(c)
		}
	}
	
	// frameRate(60)
	strokeWeight(0.5)
	angleMode(DEGREES)
}

function draw() {
	// background(0);
	
	// changing noise 
	yoff = flying
	flying += 1;
	
	noise1 = setNoise(noise1, 50, 50, 20)
	noise2 = setNoise(noise2, (width)/10, (height)/10, 40)
	// noise3 = setNoise(noise3, (width)/40, (height)/40, 100)
	// drawTerrain(noise1, {x: -200, y: -height/2, z: -150, rx: -50}, 'POINTS')  // night sky
	
	drawTerrain(noise2, {x: TX, y: TY, z: TZ, rx: LX, ry: LY, rz: LZ}, 'VERTEX') // side 67 67 -174

	// drawTerrain(noise2, {x: TX, y: TY, z: TZ, rx: LX, ry: LY, rz: LZ}, 'VERTEX', 60, 70) // floor bumps

	// drawTerrain(noise3, {x: 300, y: 0, z: -50, rx: 61, ry: -10, rz: 0}, 'VERTEX', 80, 30, 'noStroke') // mountain
	// drawTerrain(noise3, {x: -300, y: 0, z: -50, rx: -91, ry: -17, rz: -61}, 'VERTEX', 80, 30, 'noStroke') // mountain

	push()
	translate(0, 50, 0)
	// rotateX(80)
	fill(color('#6411AD'))
	noStroke()
	// plane(1200, 800)
	pop()
	
	// setSmallNoise(smallnoise1)
	// drawTerrain(smallnoise1, {x: 800, y: 100, rx: 0})
}
function easeInBack(x) {
const c1 = 1.70158;
const c3 = c1 + 1;

return c3 * x * x * x - c1 * x * x;
}

function setNoise(arr, rows, cols, offset) {
	for(let y = 0; y < rows; y++) {
		let xoff = 0;
		arr[y] = []
		for(let x = 0; x < cols; x++) {
			// if(x < cols/2) {
				let zval = map(noise(xoff, yoff), 0, 1, -offset, offset) + 
						map(x, 0, cols, -100, 100)
				arr[y][x] = zval
			// }
			// else {
			// 	let zval = map(noise(xoff, yoff), 0, 1, -50, 50) + 
			// 			map(x, 0, cols, 100, -100)
			// 	arr[y][x] = zval
			// }
			xoff += 2
		}
		yoff += 2
	}
	return arr
}

function drawFloor(arr, trans, types) {
	let r = height/scl
	let c = width*2/scl
	
	for(let y = 0; y < r-1; y++) {
		beginShape();
			for(let x = 0; x < c; x++) {
				// stroke(map(x, 0, arr[y].length, 90, 260), 70, 80, 0.8);			
				vertex(x*scl/2 - width/2, y*scl/2 - height/2* sin(yoff))
				vertex((x)*scl/2 - width/2 * sin(yoff), (y+1)*scl/2 - height/2)
			}
			endShape();
	}	
}

function drawTerrain(arr, trans, types, saturation, brightness, hasStroke) {
	// translate(width/2+100, 240, 160);
	push()
	if(trans) {
		translate(trans.x, trans.y, trans.z)
		if(trans.rx) rotateX(trans.rx)
		if(trans.ry) rotateY(trans.ry)
		if(trans.rz) rotateZ(trans.rz)
		// rotateX(90)
		// rotateY(30)
		// rotateZ(45)
	}
	
	// renderPoints(arr)
	switch(types) {
		case 'POINTS':
		  // renderPoints(arr)
		  break;
		case 'VERTEX':
			renderVertex(arr, saturation, brightness, hasStroke)
			break;
	}
	pop();
}

function renderPoints(arr) {
	strokeWeight(1)
	let r = arr.length
	for(let y = 0; y < r; y++) {
		
			for(let x = 0; x < arr[y].length; x++) {
				stroke(colorsG[y][x])
				line(x*scl - width/2 , 
							y*scl - height/2 ,  // add noise xoff
						 (x)*scl - width/2  , // add noise xoff
							(y+1)*scl - height/2 )
				
				point(x*scl - width/2 + arr[y][x], 
							y*scl - height/2 + arr[y][x],  // add noise xoff
							arr[y][x])
				point((x)*scl - width/2 + arr[y][x], // add noise xoff
							(y+1)*scl - height/2 + arr[y][x], 
							arr[y][x])
			}
		
		}	
}

function renderVertex(arr, saturation, brightness, hasStroke) {
	let r = arr.length - 1

	for(let y = 0; y < r; y++) {
		
		beginShape(TRIANGLE_STRIP);
			for(let x = 0; x < arr[y].length; x++) {
				fill(map(x, 0, arr[y].length, 330, 270), saturation, brightness)
				
				stroke(colorsP[y][x])
				if(hasStroke === 'noStroke') {
					noStroke()
				}
				// stroke(map(x, 0, arr[y].length, 90, 260), 70, 80, 0.8);			
				vertex(x*scl - width/4, y*scl - height/4, arr[y][x])
				vertex((x)*scl - width/4, (y+1)*scl - height/4, arr[y+1][x])
			}
			endShape(CLOSE);
	}	
}

function setSmallNoise(arr) {
	let yoff = flying
	for(let y = 0; y < smallRow; y++) {
		let xoff = 0;
		// terrain.push([])
		arr[y] = []
		for(let x = 0; x < smallCol; x++) {
			if(x < cols/2) {
				let zval = map(noise(xoff, yoff), 0, 1, -50, 100) + 
						map(x, 0, smallCol, 0, 800)
				arr[y][x] = zval
			} else {
				let zval = map(noise(xoff, yoff), 0, 1, -80, 50) + 
						map(x, 0, smallCol, 800, 0)
				arr[y][x] = zval
			}
			xoff += 0.08
		}
		yoff += 0.08
	}
	return arr
}

// no protect