let theta1 = 6
let theta2 = 8
let branches = [];
let colors = ["#F4F0BB", "#79CACC", "#99c2a2", "#c5edac"]
let treeNums = 0;
let yoff = 0;


	
function setupShadow() {
	// 그림자 블러 색깔 및 두께
	// drawingContext.shadowColor = "#83c5be";
	// drawingContext.shadowOffsetX = 4;
	// drawingContext.shadowOffsetY = -4;
	// drawingContext.shadowBlur = 20;
}


function createTree() {
	// if(branches.length > 8000) {
	// 	console.log(branches.length);
	// 	return;		
	// }
	const param = {
		xPosition: mouseX, // 가로 위치
		treeHeight: random(60, height / 5), // 나무 높
		colorCode: random(colors), // 색깔
		depth: mouseY, // 원근감이자 y(세로)위치
		stepSpeed: random(0.006, 0.01), // 자라나는 속도
		angle1: random(1, 10), // 나뭇가지각도1
		angle2: random(1, 10) // 나뭇가지각도2
	};
	tree(param);
}


function tree(param) {
	const {xPosition, treeHeight, colorCode, depth, stepSpeed, angle1, angle2} = param;
	let alpha = map(depth, 0, height, 0, 200);
	let coolor = color(colorCode);
	coolor.setAlpha(alpha);

	const branchParam = {
		start: createVector(xPosition, depth), 
		len: treeHeight, 
		angle: -PI/2, 
		coolor: coolor, 
		stepSpeed: stepSpeed,
		denom1: angle1, 
		denom2: angle2
	}
	branch(branchParam)
}

function branch(param) {
	const {start, len, angle, coolor, stepSpeed, denom1, denom2} = param;
	let r = len;
	let end = createVector(start.x + r*cos(angle), start.y + r*sin(angle));
	// let w = map(len, 1, width/2*0.5, 0.5, 10);
	// let c = map(len, 1, width/2*0.1, 200, 255);
	// strokeWeight(w);
	// stroke(c);
	// drawBranch(start, end, angle);
	
	let b = new Branch(start, end, len, coolor, stepSpeed);
	branches.push(b);
	let nextLen = len * 0.6;
	
	const branchParam1 = {
		start: end, 
		len: nextLen, 
		angle: angle - PI/denom1, 
		coolor: coolor, 
		stepSpeed: stepSpeed,
		denom1, denom2
	}
	const branchParam2 = {
		start: end, 
		len: nextLen, 
		angle: angle + PI/denom2, 
		coolor: coolor, 
		stepSpeed: stepSpeed,
		denom1, denom2
	}
	
	//-----------------------------------//
	// 1을 다른 숫자로 바꿔보자
  if(nextLen > 1.5) {
		branch(branchParam1)
		branch(branchParam2)
  }
}

class Branch{
	constructor(start, end, len, coolor, stepSpeed = 0.01){
		this.amount = 0;
		this.step = stepSpeed;
		this.start = start;
		this.end = end;
		this.finished = false;
		this.len = len;
		this.col = coolor;
		this.lifespan = 0.0;
		this.finished = false;
	}
	
	render() {
		// w: 끝의 숫자 두개는 선의 두께 최소값(작을 수록 얇게), 최대값(클수록 진하게)
		let w = map(this.len, 1, width/2*0.5, 1, 10);
		let c = map(this.len, 1, width/2*0.1, 200, 255);
		strokeWeight(w);
		stroke(this.col);
		noFill();
		this.x = lerp(this.start.x, this.end.x, this.amount);
		this.y = lerp(this.start.y, this.end.y, this.amount);
		if(this.amount < 1 ) {
			point(this.x, this.y);
			//ellipse(this.x, this.y, random(4, 8),  random(4, 8))
			this.amount += this.step;
			
		} else {
			this.finished = true;
		}
		
	}
	
	remove() {
		this.amount -= this.step;
		
	}
}
function drawBranch(start, end) {

	// let branch = p5.Vector.lerp(start, end, amount);
  let x = lerp(start.x, end.x, amount);
	let y = lerp(start.y, end.y, amount);
	point(x, y);
}

function setupMidi() {
		// 미디 연결
	if (navigator.requestMIDIAccess) console.log('이 브라우저는 WebMIDI를 지원합니다!')
	else console.log('WebMIDI가 실행되지 않습니다.')
	// ask for MIDI access
	navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
// 미디 연결
function onMIDISuccess(midiAccess) {
	// console.log(midiAccess)
	const midi = midiAccess
	const inputs = midi.inputs.values()
	const input = inputs.next()
	// console.log(input)
	input.value.onmidimessage = onMIDIMessage
}

function onMIDIMessage(message) {
	const data = message.data // [command/channel, note, velocity]

	const cmd = data[0] >> 4
	channel = data[0] & 0xf
	type = data[0] & 0xf0
	note = data[1]
	velocity = data[2]

	// 248 is midi clock
	if (data[0] != 248) {
		// console.log("MIDI data: ", data)
		// 미디 키보드 눌렀을 때 발생하는 이벤트?
		
		if(type === 144) {
			// note
			// velocity
			console.log(`channel: ${channel} note: ${note}, vel: ${velocity}`);
			createTree();
			// 음계 숫자가 3의 배수이면 가사 바꾸기
			// if(note%3 === 0) changeText();
		} else {
			console.log(data);
			console.log(type);
		}
	 
	}

	/*
	  with pressure/tilt off:
	  note off: 128, cmd: 8
	  note on: 144, cmd: 9
	  
	  with pressure/tilt on
	  pressure: 176, cmd 11
	  bend: 224, cmd: 14
	*/

	switch (type) {
		case 144: // noteOn message type (always 144 no matter what channel)
			noteOn(channel, note, velocity)
			break
		case 128: //noteOff message type (always 128)
			noteOff(channel, note, velocity)
			break
	}
}

function noteOn(channel, note, velocity) {
	// if (channel !== 4) return
  // console.log(channel, note, velocity);
	
}

function noteOff(channel, note, velocity) {

}

function onMIDIFailure(e) {
	console.log('Could not access your MIDI devices: ', e)
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	createTree();
	setupMidi();
}

let step = 0.01;
let amount = 0;

lineYHeight = 0;
function draw() {
	for (let i = branches.length - 1; i >= 0; i--) {
		let b = branches[i]
		if (!b.finished) b.render();

		// delete from array
		else if (b.finished) {
			branches.slice(i);
		}
	}
	// if(frameCount%100 === 0) {
	// 	for(let i = 0; i < 100; i++) {
	// 		branches.shift();			
	// 	}
	// }
	// black line
	push()
	stroke(0);
	strokeWeight(0.75);
	line(0, lineYHeight, width, lineYHeight);
	pop();
	lineYHeight += 1;
	if(lineYHeight >height) lineYHeight = 0;
	

	// flower noise yoff
	yoff += 0.005;	
}

function keyPressed() {
	if(!isNaN(Number(key))) createTree();
	
	if (keyCode === UP_ARROW) {
    createTree();
  } 
}