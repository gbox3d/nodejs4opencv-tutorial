const cv = require('opencv4nodejs')
const mat = new cv.Mat(256,256, cv.CV_8UC3,[255, 255, 255]); //BGR


mat.putText(
    String("opencv"),
    new cv.Point(32, 128),
    cv.FONT_HERSHEY_SIMPLEX,
    1,
    {
        // fontScale : 1,
        color: new cv.Vec(0, 0, 0),
        thickness: 1
    }
);

//cv.imwrite('../temp/out.png', mat);
cv.imshowWait("out", mat);