const cv = require('opencv4nodejs')

const devicePort = 0;
const wCap = new cv.VideoCapture(devicePort);

console.log('cam on');


while(1) {
    let frame = wCap.read();
    console.log(frame);
    
    if(frame.cols > 0) {
        cv.imwrite('../temp/out.png', frame);
        
        break;
    }

}

console.log('capture done!');

wCap.release()
