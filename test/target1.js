const cv = require('opencv4nodejs')

let srcMat = cv.imread('../res/tg1.jpeg')

cv.imshowWait("out",srcMat)

// const imgHLS = srcMat.cvtColor(cv.COLOR_BGR2HLS);
// cv.imshowWait('out',imgHLS)

const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);
cv.imshowWait('out',imgGray)

const _mask1 = imgGray.inRange(0, 64);
cv.imshowWait('out',_mask1)


