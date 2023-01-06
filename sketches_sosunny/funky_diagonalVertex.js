// rotate version
let libs = [ 'includes/libs/midi.js'];

let colors = []
let nums = 4
let heightSize, heightNums;
let offset = 0.1;
let speed = 4;
let canvasAngle = 30;
let xpos = 0;
let ypos = 0;
let arr1 = [], arr2 = [];
let strokeW = 1;

window.KNOB_1 = 50; // nums
window.KNOB_2 = 120; //speed
window.KNOB_3 = 10; // pos x
window.KNOB_4 = 10; // pos y
window.KNOB_5 = 10; // stroke W
window.KNOB_6 = 45;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMidi();
  
  // match arr1, arr2 colors
  arr1 = getColors("https://coolors.co/3d348b-7678ed-f7b801-f18701-f35b04")
	// https://coolors.co/dabfff-907ad6-798071-ffbe0b-fb5607
	//https://coolors.co/dabfff-907ad6-D148F0-ffd166-06d6a0
	// [color(218, 191, 255), color(144, 122, 214), color(79, 81, 140), color(44, 42, 74), color(218, 191, 255)];
	arr2 = getColors("https://coolors.co/dabfff-4f518c-907ad6-2c2a4a-7fdeff")
	
	
	colors.push(arr1, arr2,arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2, 
							arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2)
	strokeWeight(strokeW);
	setupMidi();
	angleMode(DEGREES);
}

function midiPressed(vel) { 
	let v = Math.floor(vel/10); 
	nums = v;
	console.log(nums);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
    speed -= 1;
		if(speed <= 0) speed = 0;
  } else if (keyCode === DOWN_ARROW) {
    speed += 1;
  }
}

function draw() {
  background("#000"); // #9792E3 C5D5EA
  heightSize = height/(nums+5)
  heightNums = int(height/heightSize)+ 10
	
  // MIDI ******* 
  nums = Math.floor(map(window.KNOB_1, 0, 127, 1, 20));
  speed = Math.floor(map(window.KNOB_2, 0, 127, 1, 30));
  xpos = map(window.KNOB_3, 0, 127, -600, 600);
  ypos = map(window.KNOB_4, 0, 127, -600, 600);
  arr1 = window.coolors; 
  arr2 = window.coolors2;
  strokeW = map(window.KNOB_5, 0, 127, 0.5, 4);
  strokeWeight(strokeW);
  
  // ROTATE
  translate(900 + xpos, -600 + ypos)
  rotate(KNOB_6*3/4)

  for(let i = 0; i < heightNums; i++) {
    if(i%2 == 0) {
      drawOneRow(heightSize*i, heightSize*(i+1), sin(i/4)*speed, colors[2], i)        
    } else {
      drawOneRow(heightSize*i, heightSize*(i+1), sin(i/4)*speed, colors[3], i)    
    }
  }
  
  if(frameCount%200 === 0) {
  	 colors = [];
  	 colors.push(arr1, arr2,arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2, 
							arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2)
  }
  
}

function drawOneRow(topY, bottomY, slow, colorArr){
  noStroke()
  
  let xSize = (width*1.5)/nums
  
  let speedSin = sin(frameCount/slow)
  let speedCos = cos(frameCount/slow)
  let speedTan = tan(frameCount/slow)
  
  let change1 = speedCos*xSize
  let change2 = speedSin*xSize
  let change3 = speedCos*xSize
  
  let xOffset1 = speedCos*xSize
  let xOffset2 = speedSin*xSize
  let xOffset3 = speedCos*xSize
  
  const changes = [change1, change2, change3]
  const xOffsets = [xOffset1, xOffset2, xOffset3] // make rectangle to trapezoid/triangle
  const colorInd = [1, 2, 3, 4, 
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0]
    
  // Draw First One Seperately (leftmost)
  beginShape()
  fill(colorArr[1])
  vertex(-50, topY)  // left top

  let rtx = xSize + change1
  vertex(rtx, topY) // right top  
  vertex(rtx, bottomY) // right bottom
    
  vertex(-50, bottomY)  // left bottom
  endShape(CLOSE)
  
  // Draw Last One (rightmost)
  beginShape()
  fill(colorArr[1])
  vertex(width+200 - change1, topY)  // left top
  
  vertex(width+500 + change1, topY) // right top  
  vertex(width+500 + change1, bottomY) // right bottom
    
  vertex(width+200 - change1, bottomY)  // left bottom
  endShape(CLOSE)

  // Draw rest number of Rectangles
  // besides leftmost and rightmost 
  for(let i = 0; i < nums+1; i++) {
    stroke(colorArr[colorInd[i]])  // **** fill or stroke
    
    let index = i % changes.length // 0, 1, 2
    let nextIndex = (i+1) % changes.length    
  
    beginShape()
    fill(colorArr[colorInd[i]])
    
    let xInc = map(speedCos, -1, 1, 1, 2)
    let leftTopX = xSize * (i+xInc)  + changes[index] // + xOffsets[index]
    let v1 = {x: leftTopX, y: topY}
    
    // VERTEX 1 (LEFT TOP)
    vertex(v1.x, v1.y) 
    // push()
    // stroke(colorArr[colorInd[i]])
    // strokeWeight(3)
    // point(v1.x, v1.y)
    // pop()

    // VERTEX 2 (RIGHT TOP)
    let rightTopX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v2 = {x: rightTopX, y: topY}  
    vertex(v2.x , v2.y)
    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v2.x , v2.y)
    pop()

    // VERTEX 3 (RIGHT BOTTOM)      
    let rightBottomX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v3 = {x: rightBottomX, y: bottomY}
    vertex(v3.x, v3.y)

    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v3.x, v3.y)
    pop()

    // VERTEX 4 (LEFT BOTTOM)
    let leftBottomX = xSize * (i+1)  + changes[index] + xOffsets[nextIndex]
    let v4 = {x: leftBottomX, y: bottomY}
    vertex(v4.x, v4.y)
    
    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v4.x, v4.y)
    pop()

    let closeRight = distCheck(v1, v2)
    let closeLeft = distCheck(v3, v4)
    if(closeLeft && closeRight) fill(colorArr[colorInd[i]]) 
    else noFill()

    // VERTEX 1 (LEFT TOP)
    vertex(leftTopX, topY) 

    endShape()
  }
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
  if(dist < 120  && dist > 10) return true
  else return false
}
