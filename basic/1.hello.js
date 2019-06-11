
const cv = require('opencv4nodejs')
// import {cv} from ''
// import {fs} from 'fs'

// console.log(fs)

const mat = cv.imread('../res/Lenna.png') //이미지 읽어 메트릭스로 만들기 

//cv.imwrite('./img.png', mat);
cv.imshowWait("out", mat) //키입력 들어올때까지 기다리기 