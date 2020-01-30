//네이티브로 라즈베리 카메라 모듈 다루기 예제 
const http = require('http');

//npm install raspberry-pi-camera-native
const raspberryPiCamera = require('raspberry-pi-camera-native');

//node 1_webserver.js 23081 3280 2464 1 

const port = parseInt(process.argv[2])
const cap_width = parseInt(process.argv[3])
const cap_height = parseInt(process.argv[4])
const cap_fps = parseInt(process.argv[5])

raspberryPiCamera.start({
    width: cap_width,
    height: cap_height,
    fps: cap_fps,
    quality: 80,
    encoding: 'JPEG'
});

const server = http.createServer((req, res) => {
    raspberryPiCamera.once('frame', (data) => {
        console.log(`capture frame at ${(new Date())}`)
        res.end(data);
    });
});


console.log(`start port ${port}, capture : ${cap_width}, ${cap_height}`)
server.listen(port);