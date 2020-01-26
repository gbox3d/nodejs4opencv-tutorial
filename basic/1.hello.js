const cv = require('opencv4nodejs');

console.log( `opencv version ${cv.version.major}.${cv.version.minor}.${cv.version.revision}` );

const mat = cv.imread('../res/Lenna.png') //이미지 읽어 메트릭스로 만들기 
let _mat_gray = mat.cvtColor(cv.COLOR_BGR2GRAY)

cv.imwrite('../temp/out.png', _mat_gray);

console.log('done : gray img out')

cv.imshowWait("out", mat) //키입력 들어올때까지 기다리기 


