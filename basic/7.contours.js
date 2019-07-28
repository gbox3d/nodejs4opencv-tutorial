// import cv from 'opencv4nodejs'
const cv = require('opencv4nodejs')

//참고 예제 
//https://medium.com/@muehler.v/simple-hand-gesture-recognition-using-opencv-and-javascript-eb3d6ced28a0
//https://github.com/justadudewhohacks/opencv4nodejs/blob/master/examples/handGestureRecognition0.js


const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);

let maskImg = cv.imread('../res/hand5_masked.png')
cv.imshowWait('maskImg',maskImg)

let _maskImg = maskImg.cvtColor(cv.COLOR_BGR2GRAY) //그레이 스케일로 변환 
const mode = cv.RETR_EXTERNAL;
const method = cv.CHAIN_APPROX_SIMPLE;
const contours = _maskImg.findContours(mode, method);

// console.log(contours)
  // largest contour
let sort_countors = contours.sort((c0, c1) => c1.area - c0.area);

//console.log(sort_countors.getPoints())

console.log(sort_countors[0]);
maskImg.drawContours([ sort_countors[0].getPoints()  ] ,-1,red,3)

// const result = maskImg.copy();
//   // draw bounding box and center line
//   maskImg.drawContours(
//     contours,
//     blue
//   );

cv.imshowWait('countours',maskImg)
