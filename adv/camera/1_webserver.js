const http = require('http');

const raspberryPiCamera = require('raspberry-pi-camera-native');

const port = 23081

raspberryPiCamera.start({
  width: 1280,
  height: 720,
  fps: 30,
  quality: 80,
  encoding: 'JPEG'
});

const server = http.createServer((req, res) => {
  raspberryPiCamera.once('frame', (data) => {
    res.end(data);
  });
});


console.log(`start port ${port}`)
server.listen(port);