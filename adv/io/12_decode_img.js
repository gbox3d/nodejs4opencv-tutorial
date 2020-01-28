const cv = require('opencv4nodejs')
const fs = require("fs")

try {
    let imgdata = fs.readFileSync('../res/Lenna.png');

    let mat = cv.imdecode(imgdata);

    cv.imwrite('../../temp/out.png', mat)
    console.log('done!')
}
catch (e) {
    console.log(e);

}


// cv.imshowWait("out", mat2)