
let col1 = createCols("https://coolors.co/palette/3d348b-7678ed-f7b801-f18701-f35b04");
let col2 = createCols("https://coolors.co/palette/ffbe0b-fb5607-ff006e-8338ec-3a86ff");
let col3 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let col4 = createCols("https://coolors.co/palette/5465ff-788bff-9bb1ff-bfd7ff-e2fdff");
let col5 = createCols("https://coolors.co/palette/6f2dbd-a663cc-b298dc-b8d0eb-b9faf8");
let col6 = createCols("https://coolors.co/palette/ff595e-ffca3a-8ac926-1982c4-6a4c93");

window.coolors = col3;
window.coolors2 = col1;

const CHANNEL_KEYBOARD = 1;
const CHANNEL_PAD = 0;
const MIDI_CLOCK = 248;
const TYPE_NOTE_ON = 144;
const TYPE_NOTE_OFF = 128;
const TYPE_KNOB = 176;
const NOTE1 = 36, NOTE2 = 37, NOTE3 = 38, NOTE4 = 39, NOTE5 = 40

function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

function changeColorPalette(note) {
    switch(note){
        case NOTE1:
            window.coolors = col1;
			window.coolors2 = col2;
            break;
        case NOTE2:
            window.coolors = col2;
			window.coolors2 = col3;
            break;
        case NOTE3:
            window.coolors = col3;
			window.coolors2 = col4;
            break;
        case NOTE4:
            window.coolors = col4;
			window.coolors2 = col5;
            break;
        case NOTE5:
            window.coolors = col5;
			window.coolors2 = col6;
            break;
    }

}

// 미디 연결
function setupMidi() {
    if (navigator.requestMIDIAccess) console.log('이 브라우저는 WebMIDI를 지원합니다!')
    else console.log('WebMIDI가 실행되지 않습니다.')
    // ask for MIDI access
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
// 미디 연결
function onMIDISuccess(midiAccess) {
    const midi = midiAccess
    const inputs = midi.inputs.values()
    const input = inputs.next()
    input.value.onmidimessage = onMIDIMessage
}

// 미디 키보드 눌렀을 때 발생하는 이벤트
function onMIDIMessage(message) {
    const data = message.data // [command/channel, note, velocity]
    const cmd = data[0] >> 4
    channel = data[0] & 0xf
    type = data[0] & 0xf0
    note = data[1]
    velocity = data[2]

    // 248 is midi clock
    if (data[0] != MIDI_CLOCK) {    
        if(type === TYPE_NOTE_ON) {
            if(channel === CHANNEL_KEYBOARD) {
                keyboardPressed(channel, note, velocity);

            } else if(channel === CHANNEL_PAD) { 
                padPressed(channel, note, velocity);
                changeCoolor(note);
            }
        } else if(type === TYPE_KNOB) {
            knobChanged(channel, note, velocity);
        }
    }
}

function keyboardPressed() {
    console.log(`KEYBOARD: channel ${channel}, note: ${note}, vel: ${velocity}`);
}

// AKAI Laptop Pad Controller 8
// PAD5.NOTE40  PAD6.NOTE41  PAD7.NOTE42  PAD8.NOTE43
// PAD1.NOTE36  PAD2.NOTE37  PAD3.NOTE38  PAD4.NOTE39
function padPressed() {
    console.log(`PAD: channel: ${channel}, note: ${note}, vel: ${velocity}`);
    switch(note) {
        case 0:
            window.SIN_0 = true;
            window.COS_0 = false;
            window.TAN_0 = false;
            break;
        case 1:
            window.SIN_0 = false;
            window.COS_0 = true;
            window.TAN_0 = false;
            break;
        case 2:
            window.SIN_0 = false;
            window.COS_0 = false;
            window.TAN_0 = true;
            break;
        
        // SIN_8, COS_8, TAN_8
        case 8:
            window.SIN_8 = true;
            window.COS_8 = false;
            window.TAN_8 = false;
            break;
        case 9:
            window.SIN_8 = false;
            window.COS_8 = true;
            window.TAN_8 = false;
            break;
        case 10:
            window.SIN_8 = false;
            window.COS_8 = false;
            window.TAN_8 = true;
            break;
        
        // 3rd line: 16
        case 16:
            window.SIN_16 = true;
            window.COS_16 = false;
            window.TAN_16 = false;
            break;
        case 17:
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

function changeCoolor(note) {
    if(NOTE5 >= note && note >= NOTE1) {
        changeColorPalette(note);
    }
}

function knobChanged(channel, note, velocity){
    console.log(`KNOBS: channel ${channel}, note: ${note}, vel: ${velocity}`);
    switch(note) {
        case 1:
            window.KNOB_1 = velocity;
            break;
        case 2:
            window.KNOB_2 = velocity;
            break;
        case 3:
            window.KNOB_3 = velocity;
            break;
        case 4:
            window.KNOB_4 = velocity;
            break;
        case 5:
            window.KNOB_5 = velocity;
            break;
        case 6:
            window.KNOB_6 = velocity;
            break;
        case 7:
            window.KNOB_7 = velocity;
            break;
        case 8:
            window.KNOB_8 = velocity;
            break;
    }
}

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

function onMIDIFailure(e) {
    console.log('Could not access your MIDI devices: ', e)
}
