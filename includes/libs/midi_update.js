let cool1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56",  "#d81159", "#8f2d56"]
let cool2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d", "#c08497", "#f7af9d"];
let cool3 = ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];
let cool4 = ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"];

let col1 = createCols("https://coolors.co/palette/f6bd60-f7ede2-f5cac3-84a59d-f28482-f6bd60-f7ede2-f5cac3-84a59d-f28482");
let col2 = createCols("https://coolors.co/palette/ff6d00-ff7900-ff8500-ff9100-ff9e00-ff6d00-ff7900-ff8500-ff9100-ff9e00")
let col3 = createCols("https://coolors.co/palette/b100e8-bc00dd-d100d1-db00b6-e500a4-f20089-b100e8-bc00dd-d100d1-db00b6-e500a4-f20089"); 
let col4 = createCols("https://coolors.co/palette/5465ff-788bff-9bb1ff-bfd7ff-e2fdff-5465ff-788bff-9bb1ff-bfd7ff-e2fdff");
let col5 = createCols("https://coolors.co/palette/6f2dbd-a663cc-b298dc-b8d0eb-b9faf8-6f2dbd-a663cc-b298dc-b8d0eb-b9faf8");
let col6 = createCols("https://coolors.co/palette/ff595e-ffca3a-8ac926-1982c4-6a4c93-ff595e-ffca3a-8ac926-1982c4-6a4c93");
let col7 = createCols("https://coolors.co/palette/ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff-ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff")
let col8 = createCols("https://coolors.co/palette/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd-9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd")

function createCols(url) {
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

window.colors1 = col1;
window.colors2 = col2;

// midi programs
const MIDI_CLOCK = 248;
const TYPE_NOTE_ON = 144;
const TYPE_NOTE_OFF = 128;
const CHANNEL_KEYBOARD = 0;
const CHANNEL_PAD = 9;
const CHANNEL_2 = 2;
const CHANNEL_3 = 3;
const TYPE_KNOB = 176;
const PAD1 = 36, PAD2 = 37, PAD3 = 38, PAD4 = 39, PAD5 = 40, PAD6 = 41, PAD7 = 42, PAD8 = 43;

// 미디 연결
function setupMidi() {
    osc = new p5.TriOsc();
  	env = new p5.Envelope();
    if (navigator.requestMIDIAccess) console.log('이 브라우저는 WebMIDI를 지원합니다!')
    else console.log('WebMIDI가 실행되지 않습니다.')
    // ask for MIDI access
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
// 미디 연결 성공하면 실행되는 함수
function onMIDISuccess(midiAccess) {
    const midi = midiAccess
    const inputs = midi.inputs.values()
    const input = inputs.next()
    input.value.onmidimessage = onMIDIMessage
}
// 미디 연결 실패하면 실행되는 함수
function onMIDIFailure(e) {
    console.log('Could not access your MIDI devices: ', e)
}
// 미디 키보드 눌렀을 때 발생하는 이벤트
function onMIDIMessage(message) {
		// 원본 데이터
    const data = message.data // [command/channel, note, velocity]
		
		// 원본 데이터 가공.
    const cmd = data[0] >> 4
    channel = data[0] & 0xf
    type = data[0] & 0xf0
    note = data[1]
    velocity = data[2]
    
    // 248 is midi clock
    if (data[0] != MIDI_CLOCK) {    
        if(type === TYPE_NOTE_ON) {   			// 버튼을 눌렀을 때
        		console.log(channel, type, note, velocity);
            if(channel === CHANNEL_KEYBOARD) {
                keyboardPressed(channel, note, velocity);
							
            } else if(channel === CHANNEL_PAD) { 
                padPressed(channel, note, velocity);
							
            } else { 
                console.log(`etc: channel: ${channel}, note: ${note}, vel: ${velocity}`);
            }
        } else if(type === TYPE_KNOB) {    // 노브 타입을 조절했을 때
            knobChanged(channel, note, velocity);
        }
    }
}
// AKAI Laptop Pad Controller 8
// PAD5.NOTE40  PAD6.NOTE41  PAD7.NOTE42  PAD8.NOTE43
// PAD1.NOTE36  PAD2.NOTE37  PAD3.NOTE38  PAD4.NOTE39
function padPressed(channel, note, velocity) {
	  // 패드 버튼 눌렀을 때, 찍히는 데이터 확인.
    console.log(`PAD: channel: ${channel}, note: ${note}, vel: ${velocity}`);
    changeColors(note);
    changeTri(note);
}
function keyboardPressed(channel, note, velocity) {
		// 음계 키 눌렀을 때, 찍히는 데이터 확인.
    console.log(`KEYBOARD: channel ${channel}, note: ${note}, vel: ${velocity}`);
}
function knobChanged(channel, note, velocity){
	// 노브 돌렸을 때, 찍히는 데이터 확인.
  console.log(`KNOBS: channel ${channel}, note: ${note}, vel: ${velocity}`);
	changeKnobValues(channel, note, velocity);
}
function changeKnobValues(channel, note, velocity) {
	switch(note) {
        case 70:
            window.KNOB_1 = velocity;
            break;
        case 71:
            window.KNOB_2 = velocity;
            break;
        case 72:
            window.KNOB_3 = velocity;
            break;
        case 73:
            window.KNOB_4 = velocity;
            break;
        case 74:
            window.KNOB_5 = velocity;
            break;
        case 75:
            window.KNOB_6 = velocity;
            break;
        case 76:
            window.KNOB_7 = velocity;
            break;
        case 77:
            window.KNOB_8 = velocity;
            break;
    }
}

function changeColors(note) {
    switch(note){
        case PAD1:
            window.colors1 = col1;
            window.colors2 = col2;
            break;
        case PAD2:
            window.colors1 = col2;
            window.colors2 = col3;
            break;
        case PAD3:
            window.colors1 = col3;
            window.colors2 = col4;
            break;
        case PAD4:
            window.colors1 = col4;
            window.colors2 = col5;
            break;
        case PAD5:
            window.colors1 = col5;
            window.colors2 = col6;
            break;
        case PAD6:
            window.colors1 = col6;
            window.colors2 = col7;
            break;
        case PAD7:
            window.colors1 = col7;
            window.colors2 = col8;
            break;
        case PAD8:
            window.colors1 = col8;
            window.colors2 = col1;
            break;
    }
}

function changeTri(note) {
    switch(note) {
        case PAD1:
            window.SIN_0 = true;
            window.COS_0 = false;
            window.TAN_0 = false;
            break;
        case PAD2:
            window.SIN_0 = false;
            window.COS_0 = true;
            window.TAN_0 = false;
            break;
        case PAD3:
            window.SIN_0 = false;
            window.COS_0 = false;
            window.TAN_0 = true;
            break;
        
        // SIN_8, COS_8, TAN_8
        case PAD4:
            window.SIN_8 = true;
            window.COS_8 = false;
            window.TAN_8 = false;
            break;
        case PAD5:
            window.SIN_8 = false;
            window.COS_8 = true;
            window.TAN_8 = false;
            break;
        case PAD6:
            window.SIN_8 = false;
            window.COS_8 = false;
            window.TAN_8 = true;
            break;
        
        // 3rd line: 16
        case PAD7:
            window.SIN_16 = true;
            window.COS_16 = false;
            window.TAN_16 = false;
            break;
        case PAD8:
            window.SIN_16 = false;
            window.COS_16 = true;
            window.TAN_16 = false;
            break;
        case 18:
            window.SIN_16 = false;
            window.COS_16 = false;
            window.TAN_16 = true;
            break;
    }
}

/** 아래는 안쓰는 코드 **/
function checkNoteOnOFF(type) {
    switch (type) {
        case TYPE_NOTE_ON: // noteOn message type (always 144 no matter what channel)
            noteOn(channel, note, velocity);
            break;
        case TYPE_NOTE_OFF: //noteOff message type (always 128)
            noteOff(channel, note, velocity);
            break;
    }
}

function noteOn(channel, note, velocity) {
    console.log(channel, note, velocity);

}

function noteOff(channel, note, velocity) {
    console.log(channel, note, velocity);

}
