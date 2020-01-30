
const cv = require('opencv4nodejs')

console.log(process.argv.length)

// 라즈베리에서는 '/dev/video0' 이런식으로 인젝스 대신 디바이스이름을 직접 입력한다. 
let devicePort = 0;

if(process.argv.length >= 3)
{
    if(/^\d+$/.test(process.argv[2]) ) {
        devicePort =  parseInt(process.argv[2]);
    }
    else {
        devicePort = process.argv[2];
    }
     
    
}

console.log(`prepare capture device : ${devicePort} `);
//
const wCap = new cv.VideoCapture(devicePort);

let _w,_h
if(process.argv.length >= 5)
{
    _w = parseInt(process.argv[3]);
    _h = parseInt( process.argv[4] );
}

wCap.set(cv.CAP_PROP_FRAME_WIDTH,_w)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT,_h)

console.log('device  ok');


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
