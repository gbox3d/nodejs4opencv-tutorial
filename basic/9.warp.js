const cv = require('opencv4nodejs')
// import {cv} from 'opencv4nodejs'

const mat = cv.imread('../res/Lenna.png') //이미지 읽어 메트릭스로 만들기 

// let M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, 50, 0, 1, 100]);
const _M = new cv.Mat([[1, 0, 50], [0, 1, 100]], cv.CV_64FC1); // 변환 행렬만들기 

const region = mat.getRegion(new cv.Rect(0,0,256,256)) // 영역 잘라내기 

// const matDest = new cv.Mat(512,512, cv.CV_8UC3,[255, 255, 255]); //BGR

// mat.warpAffine(_M).copyTo(matDest)

let _mat = mat.warpAffine(_M)

cv.imshowWait("out", mat) //키입력 들어올때까지 기다리기 
cv.imshowWait("out", _mat)
// cv.imshowWait("out",region)



// cv.imwrite('../temp/out.png', mat);
//cv.imshowWait("out", mat) //키입력 들어올때까지 기다리기 



