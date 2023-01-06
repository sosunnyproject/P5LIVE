let libs = [ 'includes/libs/midi.js'];
let arr1 = getColors('https://coolors.co/palette/dabfff-907ad6-17c3b2-ffcb77-fe6d73-dabfff-907ad6-17c3b2-ffcb77-fe6d73')
let arr2 = getColors('https://coolors.co/palette/bee9e8-62b6cb-1b4965-cae9ff-5fa8d3-bee9e8-62b6cb-1b4965-cae9ff-5fa8d3')

// circle segments
let colors = []
const nums = 10
let r1 = 50, r2= 100, r3 = 150, r4 = 200, r5 = 250, r6 = 300, r7 = 400, r8 = 500
let heightSize, heightNums;
let offset = 0.3;

let strokeW = 1; // **** color ellipse thickness 
let speedOffset = 40;
window.KNOB_1 = 10;
window.KNOB_2 = 10;

function setup() {
  setupMidi();
  createCanvas(windowWidth, windowHeight);
  heightSize = height/(nums+5)
  heightNums = int(height/heightSize)+ 10 
  
  // match arr1, arr2 colors

  colors.push(window.coolors, window.coolors2);
  // frameRate(40)
  // strokeWeight(0.25)

}

function draw() {
  background(0, 50);
  if(frameCount%100 == 0) {
  	  colors=[window.coolors, window.coolors2];
  }
  // r1 = sin(frameCount/30)*5 + r1
  strokeW = map(window.KNOB_1, 0, 127, 1, 100);
  speedOffset = map(window.KNOB_2, 0, 127, 0, 100);

   // CHANGE diviend 100 => lower num to be faster
  let speed1 = sin(frameCount/(100+speedOffset))*TWO_PI
  let speed2 = cos(frameCount/(200+speedOffset))*TWO_PI

  translate(width/2, height/2)
  stroke(200)

  // ** CHANGE CIRCLE WHITE LINES
  strokeWeight(4);
  //strokeWeight(tan(frameCount/25)*strokeW*2)  	
  // ** CHANGE CIRCLE WHITE LINES --- 1
  
  noFill()

  for(let i = 0; i < 10; i++) {
    let speed = speed2
    if(i % 2 === 1) speed = speed1
    drawCircleSegments(speed + TWO_PI/8*i, r1, r1*2, colors[0][i])
  }

  // inner circle
  arc(0, 0, r1*2, r1*2, speed2 + TWO_PI/8*1, speed2 + TWO_PI/8*3)
  arc(0, 0, r1*2, r1*2, speed1 + TWO_PI/8*4, speed1 + TWO_PI/8*7)
  arc(0, 0, r1*2, r1*2, speed1 + TWO_PI/8*6, speed1 + TWO_PI/8*8)

  for(let i = 0; i < 10; i++) {
    let speed = speed2
    if(i % 2 === 1) speed = speed1
    drawCircleSegments(speed + TWO_PI/10*i, r2, r2*1.5, colors[1][i])
  }

 arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*6, speed1 + TWO_PI/10*9)
 arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*2, speed1 + TWO_PI/10*5)

 for(let i = 0; i < 6; i++) {
   let speed = speed2
   if(i % 2 === 0) speed = speed1
   drawCircleSegments(speed + TWO_PI/6*i, r3, r3*1.25, colors[0][i])
 }

 arc(0, 0, r3*2, r3*2, speed2+TWO_PI/6*3, speed2)
 arc(0, 0, r3*2, r3*2, speed1+TWO_PI/6*6, speed1+ TWO_PI/6*3)

 for(let i = 0; i < 6; i++) {
   let speed = speed1
   if(i % 2 === 0) speed = speed2
   drawCircleSegments(speed + TWO_PI/6*i, r4, r4*1.25, colors[1][i])
 } 

  //arc(0, 0, r4*2, r4*2, speed2 + TWO_PI/-6*3, speed1 + TWO_PI/6*6)
  //arc(0, 0, r4*1.25*2, r4*1.25*2, speed1 + TWO_PI/6*3, speed1 + TWO_PI/6*5)
  //arc(0, 0, r4*1.25*2, r4*1.25*2, speed1 + TWO_PI/6*1, speed2 + TWO_PI/6*2)

  //for(let i = 0; i < 10; i++) {
  //  let speed = speed2
  //  if(i % 2 === 0) speed = speed1
  //  drawCircleSegments(speed + TWO_PI/10*i, r5, r5*1.25, colors[0][i])
  //}

 // arc(0, 0, r5*2, r5*2, speed2 + TWO_PI/-10*3, speed1 + TWO_PI/10*6)
 // arc(0, 0, r5*1.25*2, r5*1.25*2, speed1 + TWO_PI/10*2, speed2 + TWO_PI/10*5)
 // arc(0, 0, r5*1.25*2, r5*1.25*2, speed1 + TWO_PI/10*8, speed2 + TWO_PI/10*5)

 // for(let i = 0; i < 6; i++) {
 //   let speed = speed1
 //   if(i % 3 === 0) speed = speed2
 //   drawCircleSegments(speed + TWO_PI/10*i, r6, r6*1.25, colors[1][i])
 // }

 // arc(0, 0, r6*1.25*2, r6*1.25*2, speed1 + TWO_PI/6*2, speed2 + TWO_PI/6*5)
 // arc(0, 0, r6*1.25*2, r6*1.25*2, speed2 + TWO_PI/6*1, speed1 + TWO_PI/6*5)

	// for(let i = 0; i < 10; i++) {
 //   let speed = speed2
 //   if(i % 2 === 0) speed = speed1
 //   drawCircleSegments(speed + TWO_PI/-10*i, r7, r7*1.25, colors[0][i])
 // }
 // arc(0, 0, r7*1.25*2, r7*1.25*2, speed1 + TWO_PI/10*2, speed2 + TWO_PI/10*5)
 // arc(0, 0, r7*1.25*2, r7*1.25*2, speed2 + TWO_PI/10*1, speed1 + TWO_PI/10*5)

	
	// for(let i = 0; i < 5; i++) {
	// let speed = speed1
	// if(i % 2 === 0) speed = speed2
	// drawCircleSegments(speed + TWO_PI/10*i, r8, r8*1.25, colors[1][i])
	// }
	// arc(0, 0, r8*1.25*2, r8*1.25*2, speed1 + TWO_PI/5*2, speed2 + TWO_PI/5*5)
	// arc(0, 0, r8*1.25*2, r8*1.25*2, speed2 + TWO_PI/5*1, speed1 + TWO_PI/5*5)

  // draw gridlines
 
}
function drawGrid() {
 push()
  for(let x = -width/2; x < width/2; x += r1/2 ) {
    for(let y = -height/2; y < height/2; y += r1/2 ) {
      strokeWeight(0.01)
      rect(x, y, r1)
    }
  }
  pop() 
}
function drawCircleSegments(speed, innerRadius, outerRadius, col) {
  let x1 = cos(speed)*innerRadius					// *** climax: change to tan, tan / tain, sin
  let y1 = sin(speed)*innerRadius					// climax: change to tan, sin / tan, cos

  let x2 = cos(speed)*outerRadius					// climax: change to tan, sin / tan, sin
  let y2 = sin(speed)*outerRadius					// climax: change to tan, cos / tan, cos

  let thickness = map(sin(speed), -5, 5, 1, strokeW)   // colorStroke: change sin to tan

  push()
  strokeWeight(thickness)
  stroke(col)
  point(x1, y1)
  point(x2, y2)
  line(x1, y1, x2, y2)
  pop()

}


function getColors(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

function distCheck(vertex1, vertex2) {
  let v1 = createVector(vertex1.x, vertex1.y)
  let v2 = createVector(vertex2.x, vertex2.y)
  let dist = v1.dist(v2)
  if(dist < 100  && dist > 40) return true
  else return false
}
