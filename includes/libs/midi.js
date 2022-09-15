
let col1 = createCols("https://coolors.co/palette/3d348b-7678ed-f7b801-f18701-f35b04");
let col2 = createCols("https://coolors.co/palette/ffbe0b-fb5607-ff006e-8338ec-3a86ff");
let col3 = ["#006ba6", "#0496ff", "#ffbc42", "#d81159", "#8f2d56"]
let col4 = createCols("https://coolors.co/palette/5465ff-788bff-9bb1ff-bfd7ff-e2fdff");
let col5 = createCols("https://coolors.co/palette/6f2dbd-a663cc-b298dc-b8d0eb-b9faf8");

window.coolors = col3;

function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

function chooseColors(noteKey) {
    switch(noteKey){
        case 3:
            window.coolors = col1;
            break;
        case 4:
            window.coolors = col2;
            break;
        case 5:
            window.coolors = col3;
            break;
        case 6:
            window.coolors = col4;
            break;
        case 7:
            window.coolors = col5;
            break;
    }

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
    // 미디 키보드 눌렀을 때 발생하는 이벤트
    
    if(type === 144) {
        // note
        // velocity
        
        // 음계 숫자가 3의 배수이면 가사 바꾸기
        // if(note%3 === 0) changeText();
        
        if(channel === 1) { // keyboards - note !!!
            console.log(`channel 1, note: ${note}, vel: ${velocity}`);

        } else if(channel === 0) {  // rect buttons - note!!
            
            // console.log(`channel 1, note: ${note}, vel: ${velocity}`);
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
            if(7 >= note && note >=3) {
                chooseColors(note);
            }
        } else {
             
            // console.log(`channel: ${channel} note: ${note}, vel: ${velocity}`);
        }
    } else if(type === 176) { // knobs
        // velocity !! 
        console.log(`channel 1, note: ${note}, vel: ${velocity}`);
        switch(note) {
            
            case 48:
                window.KNOB_48 = velocity;
                break;
            case 49:
                window.KNOB_49 = velocity;
                break;
            case 50:
                window.KNOB_50 = velocity;
                break;
            case 51:
                window.KNOB_51 = velocity;
                break;
            case 52:
                window.KNOB_52 = velocity;
                break;
            case 53:
                window.KNOB_53 = velocity;
                break;
            case 54:
                window.KNOB_54 = velocity;
                break;
            case 55:
                window.KNOB_55 = velocity;
                break;
        }
        
    } else {
        // console.log(data);
        // console.log(type);
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
