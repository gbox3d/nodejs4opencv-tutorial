
const cv = require('opencv4nodejs')

const mat = cv.imread('../res/Lenna.png');

//cv.imwrite('./img.png', mat);
cv.imshowWait("out", mat);