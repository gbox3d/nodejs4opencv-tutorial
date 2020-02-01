//웹캠용 예제 
const http = require('http');

const cv = require('opencv4nodejs')


const port = 20081;
if (process.argv.length >= 2) {
    port = parseInt(process.argv[2])
}

// 라즈베리에서는 '/dev/video0' 이런식으로 인젝스 대신 디바이스이름을 직접 입력한다. 
// usb 웹캠일경우 번호로한다 기본 0 
//node 2_webCamserver.js 20081 0 1280 720 
//pm2 start 2_webCamserver.js --name "camserver" --  20081 0 1280 720 
let devicePort = 0;
if (process.argv.length >= 4) {
    
    let _arg = process.argv[3]
    if (/^\d+$/.test(_arg)) {
        devicePort = parseInt(_arg);
    }
    else {
        devicePort = _arg;
    }
}

const wCap = new cv.VideoCapture(devicePort);

let _w, _h
if (process.argv.length >= 6) {
    _w = parseInt(process.argv[4]);
    _h = parseInt(process.argv[5]);
    wCap.set(cv.CAP_PROP_FRAME_WIDTH, _w)
    wCap.set(cv.CAP_PROP_FRAME_HEIGHT, _h)
}
else {

}


console.log('device  ok');

// raspberryPiCamera.start({
//     width: cap_width,
//     height: cap_height,
//     fps: cap_fps,
//     quality: 80,
//     encoding: 'JPEG'
// });

const server = http.createServer((req, res) => {

    let frame = wCap.read();

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Max-Age': '1000'
      });
    // cv.imwrite('../out.png', frame);

    let _buf = cv.imencode(".jpg",frame)

    res.end(_buf);
    // raspberryPiCamera.once('frame', (data) => {
    //     console.log(`capture frame at ${(new Date())}`)
    //     res.end(data);
    // });
});


console.log(`start port ${port}`)
server.listen(port);