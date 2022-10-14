function customFilter() {
    drawingContext.shadowColor = "#000000";
    drawingContext.shadowOffsetX = -5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
}

function noiseCircleVertex(params) {
    const {
        segments, intensity, amplitude, rotationSpeed, 
        radius, col, strokeW
    } = params
        
let segmentStep = 360 / segments;
    push();
        // pg1.translate(0, 0);  // center of canvas
        rotate(sin(frameCount/4)*rotationSpeed);

        beginShape();
        for (let i = 0; i <= segments; i += 1) {
            let theta = i * segmentStep;
            
            let n = map(noise(cos(theta)*intensity+1,
                sin(theta)*intensity, yoff), 
                0.0, 1.0, 
                amplitude, 5.4)
            
            let x = radius * cos(theta) * n
            let y = radius * sin(theta) * n
    
            if(col) stroke(col);
            else stroke(250, 100, 80);
            
            if(strokeW) strokeWeight(strokeW);
            else strokeWeight(0.01);
            
            vertex(x, y);
            // curveVertex(x + rand1, y + rand2);
            // curveVertex(x + rand4, y + rand3);

        }
        endShape(CLOSE);
    pop();

}

function perlinVertex(params){
    const {
        startY, endY, xGap, xOffset = 0.05, yoffset, strokeW, col
    } = params
    
    push();
        beginShape();
        let xoff = 0;
        let extra = map(noise(xoff, yoffset) * endY, 0, endY, 0, 250);
        
        if(strokeW) strokeWeight(strokeW);
        else strokeWeight(0.4);

        if(col) stroke(col);
    else stroke(51, 140, 152 + extra + endY/20);

        for (let x = -100; x < width+100; x += xGap) {
                let y = map(noise(xoff, yoff), 0, 1, startY, endY);
                vertex(x, y);
                xoff += xOffset;
            }
        vertex(width+100, height+40); 
        vertex(-30, height+30); 
        endShape(CLOSE);
    pop();
}
