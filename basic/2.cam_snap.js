
const cv = require('opencv4nodejs')

console.log(process.argv.length)

let devicePort = 0;

if(process.argv.length >= 3)
{
    devicePort = parseInt(process.argv[2]);
    
}

console.log(`prepare capture device : ${devicePort} `);
const wCap = new cv.VideoCapture(devicePort);

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
