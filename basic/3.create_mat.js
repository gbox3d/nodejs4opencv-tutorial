const cv = require('opencv4nodejs')
const mat = new cv.Mat(256,256, cv.CV_8UC3,[255, 255, 255]); //BGR


//cv.imwrite('../temp/out.png', mat);
cv.imshowWait("out", mat);