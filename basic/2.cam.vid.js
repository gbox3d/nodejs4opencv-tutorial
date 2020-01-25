const cv = require('opencv4nodejs')
const devicePort = 0;
const wCap = new cv.VideoCapture(devicePort);

// loop through the capture
const delay = 10;
let done = false;
while (!done) {
  let frame = wCap.read();
  // loop back to start on end of stream reached
  if (frame.empty) {
    wCap.reset();
    frame = wCap.read();
  }

  gray = frame.cvtColor(cv.COLOR_BGR2GRAY)
  // cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  cv.imshow('frame',gray)

  // ...

  const key = cv.waitKey(delay) & 0xff;
//   console.log(key)
  done = key !== 255;
}

wCap.release()
cv.destroyAllWindows() 