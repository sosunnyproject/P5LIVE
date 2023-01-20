let coolors1 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let coolors2 = ["#525b76", "#ffcad4", "#b0d0d3", "#c08497", "#f7af9d"];
let coolors3 = ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"];
let coolors4 = ["#27187e", "#758bfd", "#aeb8fe", "#f1f2f6", "#ff8600"];

window.colors1 = coolors1;
window.colors2 = coolors2;

const CHANNEL_KEYBOARD = 1;
const CHANNEL_PAD = 0;
const MIDI_CLOCK = 248;
const TYPE_NOTE_ON = 144;
const TYPE_NOTE_OFF = 128;
const TYPE_KNOB = 176;
const NOTE1 = 36, NOTE2 = 37, NOTE3 = 38, NOTE4 = 39, NOTE5 = 40, NOTE6 = 41;

// 미디 연결
// always call setupMidi() in your sketch
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
                changeColors(note);
            }
        } else if(type === TYPE_KNOB) {
            knobChanged(channel, note, velocity);
        }
    }
}
// AKAI Laptop Pad Controller 8
// PAD5.NOTE40  PAD6.NOTE41  PAD7.NOTE42  PAD8.NOTE43
// PAD1.NOTE36  PAD2.NOTE37  PAD3.NOTE38  PAD4.NOTE39
function padPressed() {
    console.log(`PAD: channel: ${channel}, note: ${note}, vel: ${velocity}`);
    switch(note) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 16:
            break;
        case 17:
            break;
        case 18:
            break;
    }
}
function keyboardPressed() {
    console.log(`KEYBOARD: channel ${channel}, note: ${note}, vel: ${velocity}`);
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
function changeCoolor(note) {
    if(NOTE6 >= note && note >= NOTE1) {
        changeColors(note);
    }
}
function changeColors(note) {
    switch(note){
        case NOTE1:
            window.colors1 = col1;
            break;
        case NOTE2:
            window.colors1 = col2;
            break;
        case NOTE3:
            window.colors1 = col3;
            break;
        case NOTE4:
            window.colors1 = col4;
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
