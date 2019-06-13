import cv from 'opencv4nodejs'

//참고 예제 
//https://medium.com/@muehler.v/simple-hand-gesture-recognition-using-opencv-and-javascript-eb3d6ced28a0
//https://github.com/justadudewhohacks/opencv4nodejs/blob/master/examples/handGestureRecognition0.js

// segmenting by skin color (has to be adjusted)
const skinColorUpper = hue => new cv.Vec(hue, 0.8 * 255, 0.6 * 255);
const skinColorLower = hue => new cv.Vec(hue, 0.1 * 255, 0.05 * 255);


let handImg = cv.imread('../res/hand5.png')

const imgHLS = handImg.cvtColor(cv.COLOR_BGR2HLS);
cv.imshowWait('hls',imgHLS)

//범위내 마스킹 처리 
const rangeMask = imgHLS.inRange(skinColorLower(0), skinColorUpper(15));
cv.imshowWait('rangeMask',rangeMask)

const blurred = rangeMask.blur(new cv.Size(10, 10));
cv.imshowWait('blurred',blurred)

const thresholded = blurred.threshold(200, 255, cv.THRESH_BINARY);
cv.imshowWait('thresholded',thresholded)

cv.imwrite('../temp/out.png', thresholded);
