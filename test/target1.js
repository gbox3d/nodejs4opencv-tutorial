const cv = require('opencv4nodejs')

let srcMat = cv.imread('../res/tt.png')

cv.imshowWait("out",srcMat)

// const imgHLS = srcMat.cvtColor(cv.COLOR_BGR2HLS);
// cv.imshowWait('out',imgHLS)

const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);
cv.imshowWait('out',imgGray)

const _mask1 = imgGray.inRange(0, 128);
cv.imshowWait('out',_mask1)


const contours = _mask1.findContours(
    cv.RETR_CCOMP, 
    cv.CHAIN_APPROX_SIMPLE
);

let sort_countors = contours.sort((c0, c1) => c1.area - c0.area)[0];

console.log(sort_countors.getPoints())

const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);


const _outImg = imgGray.cvtColor(cv.COLOR_GRAY2BGR);

_outImg.drawContours([ sort_countors.getPoints()  ] ,-1,red,3)


cv.imshowWait('countours',_outImg)





