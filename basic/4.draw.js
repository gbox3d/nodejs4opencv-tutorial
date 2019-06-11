const cv = require('opencv4nodejs')

const mat = new cv.Mat(256,256, cv.CV_8UC3,[255, 255, 255]); //BGR

// cv.rectangle(img,
//     (384,0),(510,128), #영역 
//     (0,255,0), #color
//     3)

mat.drawRectangle(new cv.Rect(32,32,64,64) , new cv.Vec(0,0,255))

cv.imwrite('../temp/out.png', mat);