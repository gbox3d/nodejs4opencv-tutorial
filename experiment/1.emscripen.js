const cv = require('../libs/opencv')
const cv4node = require('opencv4nodejs')

//브라우져용 cv로 매트릭스 생성
let mat = new cv.Mat(128,128, cv.CV_8UC3,new cv.Scalar(0,0,255));

//메트릭스 데이터 얻기 uint8array
console.log(mat.ptr(0))

//opencv4node 로 변환
_mat = new cv4node.Mat(mat.ptr(0),128,128,cv.CV_8UC3) 

cv4node.imshowWait("out",_mat)