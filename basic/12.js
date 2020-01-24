const cv = require('opencv4nodejs')
const fs = require("fs")

let imgdata = fs.readFileSync('../res/Lenna.png');

let mat2 = cv.imdecode(imgdata);

cv.imshowWait("out", mat2)