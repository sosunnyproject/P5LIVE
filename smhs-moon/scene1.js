// https://openprocessing.org/sketch/1692966
function drawScene1() {
    // 마이크 소리 크기

    micVol = mic.getLevel() * 100;
    let vol = map(micVol, 0, 100, 10, 600);
    radius = vol/50 + sin(frameCount / 3) * 30 // 큰 숫자를 곱할수록 원의크기가 커짐.

    let param1 = {
        segments: 700 + vol / 2, // 숫자가 작을수록 뾰족한 모서리가 많고, 클수록 둥그런 모서리가 많음.
        intensity: 1, // 1~10 사이: 울퉁불퉁한 정도가 달라짐.
        amplitude: 2.0, // 1~10 사이: 숫자가 작을수록 울퉁불퉁하고 크기가 작음.
        rotationSpeed: 20, // 회전 속도
        radius: radius + 50, // 원의 지름 
        col: color("#ffe97f"), // 색깔
        strokeW: 0.1 // 선 두께
    }
    noiseCircleVertex(param1);

    let param2 = {
        segments: 700 + vol / 2,  
        intensity: 1, // 위 param1의	intensity 값과 똑같이 쓰기
        amplitude: 2.0, // 위 param1의 amplitude 값과 똑같이 쓰기
        rotationSpeed: 40,
        radius: radius + 100, // 위 param1의 radius 값과 똑같이 쓰기
        col: color("#ffd400"), // 
        strokeW: 0.1 // 선 두께
    }
    noiseCircleVertex(param2);

    let param3 = {
        segments: 800,
        intensity: 1, // 위 param1의	intensity 값과 똑같이 쓰기
        amplitude: 2.0, // 위 param1의 amplitude 값과 똑같이 쓰기
        rotationSpeed: 10,
        radius: radius + 150, // 위 param1의 radius 값과 똑같이 쓰기
        col: color(255, 238, 153, 100), // 
        strokeW: 0.1 // 선 두께
    }
    noiseCircleVertex(param3);


    let param4 = {
        segments: 800,
        intensity: 1, // 위 param1의	intensity 값과 똑같이 쓰기
        amplitude: 2.0, // 위 param1의 amplitude 값과 똑같이 쓰기
        rotationSpeed: 10,
        radius: radius + 200, // 위 param1의 radius 값과 똑같이 쓰기
        col: color(255, 225, 76, 50), // 
        strokeW: 0.1 // 선 두께
    }
    noiseCircleVertex(param4);

        // 검정 원
    let paramBlack = {
        segments: 800,
        intensity: 1, // 위 param1의	intensity 값과 똑같이 쓰기
        amplitude: 2.0, // 위 param1의 amplitude 값과 똑같이 쓰기
        rotationSpeed: 40,
        radius: 100 + vol/80 + sin(frameCount/2) * 120, // 위 param1의 radius 값과 똑같이 쓰기
        col: color("#000000"), // 검정색
        strokeW: 0.3 // 선 두께
    }
    noiseCircleVertex(paramBlack);


    // 검정 원
    let paramBlack2 = {
        segments: width-100,
        intensity: 1, // 위 param1의	intensity 값과 똑같이 쓰기
        amplitude: 2.0, // 위 param1의 amplitude 값과 똑같이 쓰기
        rotationSpeed: 40,
        radius: 150 + vol/80 + sin(frameCount/2) * 120, // 위 param1의 radius 값과 똑같이 쓰기
        col: color("#000000"), // 검정색
        strokeW: 0.3 // 선 두께
    }
    noiseCircleVertex(paramBlack2);

    yoff += 0.002;
    // customFilter();
}