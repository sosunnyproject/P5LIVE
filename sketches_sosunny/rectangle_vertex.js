// https://openprocessing.org/sketch/1646304

let libs = [ 'includes/libs/midi.js'];

let colors = []
let nums = 14
let heightSize, heightNums;
let offset = 0.1;
let speed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMidi();
  
  // match arr1, arr2 colors
  let arr1 = getColors("https://coolors.co/03045e-9d4edd-00b4d8-90e0ef-caf0f8") 
  let arr2 = getColors("https://coolors.co/5a189a-7b2cbf-0077b6-c77dff-e0aaff")
  
  colors.push(arr1, arr2, 
              arr1, arr2,
			arr1, arr2,
			arr1, arr2,
			arr1, arr2, arr1, arr2, arr1, arr2, arr1, arr2)
  strokeWeight(0.5)
	colorMode(RGB);
	
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    nums -= 1;
  } else if (keyCode === RIGHT_ARROW) {
    nums += 1;
  }
	
	if (keyCode === UP_ARROW) {
    speed -= 1;
		if(speed <= 0) speed = 0;
  } else if (keyCode === DOWN_ARROW) {
    speed += 1;
  }
}
function draw() {
  background(0); // #9792E3 C5D5EA
  heightSize = height/(nums)
  heightNums = int(height/heightSize)
	
  for(let i = 0; i < heightNums; i++) {
    if(i%2 == 0) {
      drawOneRow(heightSize*i, heightSize*(i+1), 20+sin(i/4)*speed, 10, colors[0], i)        
    } else {
      drawOneRow(heightSize*i, heightSize*(i+1), 20+sin(i/4)*speed, 10, colors[1], i)    
    }
  }
	
	offset += 0.1;

}


function drawOneRow(topY, bottomY, slow, fast, colorArr){
  
  let xSize = width/nums
  
  let speedSin = sin(frameCount/slow)
  let speedCos = cos(frameCount/slow)
  let speedTan = tan(frameCount/slow)
  
  let change1 = speedCos*xSize
  let change2 = speedSin*xSize
  let change3 = speedTan*xSize*2
  
  let xOffset1 = speedCos*xSize
  let xOffset2 = speedSin*xSize
  let xOffset3 = speedTan*xSize
  
  const changes = [change1, change2, change3]
  const xOffsets = [xOffset1, xOffset2] // make rectangle to trapezoid/triangle
  const colorInd = [1, 0, 3, 4, 
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0,
                    1, 0, 3, 4,
                    3, 2, 1, 0,
                    1, 0, 3, 4,
                    3, 2, 1, 0]
    
  // Draw First One Seperately (leftmost)
	let fillA = colorArr[1]

  beginShape();
	noStroke()
	fill(fillA);
  vertex(0, topY)  // left top
  
  // left top to right top
  
  let rtx = xSize + change1
  vertex(rtx, topY) // right top  
  vertex(rtx, bottomY) // right bottom
    
  vertex(0, bottomY)  // left bottom
  endShape(CLOSE)
  
  beginShape()
	let fillColor = colorArr[2]
  fill(fillColor)
  vertex(width - (xSize + change1), topY)  // left top
  
  vertex(width, topY) // right top  
  vertex(width, bottomY) // right bottom
    
  vertex(width - (xSize + change1), bottomY)  // left bottom
  endShape(CLOSE)
  
  // Draw rest number of Rectangles
  // besides leftmost and rightmost
  for(let i = 0; i < nums-3; i++) {
		let colA = colorArr[colorInd[i]]
		stroke(colA)
    // stroke(colorArr[colorInd[i]])
    
    let index = i % changes.length // 0, 1, 2
    let nextIndex = (i+1) % changes.length    
  
    beginShape()
		fill(colA)
    // fill(colorArr[colorInd[i]])
    
    let xInc = map(speedCos, -1, 1, 1, 2)
    let leftTopX = xSize * (i+xInc) + changes[index] + xOffsets[index]
    let v1 = {x: leftTopX, y: topY}
    
    // VERTEX 1 (LEFT TOP)
    vertex(v1.x, v1.y) 
    push()
    // stroke(colorArr[colorInd[i]])
    point(v1.x, v1.y)
    pop()

    // VERTEX 2 (RIGHT TOP)
    let rightTopX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v2 = {x: rightTopX, y: topY}  
    vertex(v2.x , v2.y)
    push()
    // stroke(colorArr[colorInd[i]])
    point(v2.x , v2.y)
    pop()

    // VERTEX 3 (RIGHT BOTTOM)      
    let rightBottomX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v3 = {x: rightBottomX, y: bottomY}
    vertex(v3.x, v3.y)

    push()
    // stroke(colorArr[colorInd[i]])
    point(v3.x, v3.y)
    pop()

    // VERTEX 4 (LEFT BOTTOM)
    let leftBottomX = xSize * (i+1) + changes[index] + xOffsets[nextIndex]
    let v4 = {x: leftBottomX, y: bottomY}
    vertex(v4.x, v4.y)
    
    push()
    // stroke(colorArr[colorInd[i]])
    point(v4.x, v4.y)
    pop()

    let closeRight = distCheck(v1, v2)
    let closeLeft = distCheck(v3, v4)
		if(closeLeft && closeRight) fill(colA[0], colA[1], colA[2], colA[3])
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
  if(dist < 80 && dist > 10) return true
  else return false
}
