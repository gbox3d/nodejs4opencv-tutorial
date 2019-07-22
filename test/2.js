const cv = require('../opencv')
const cv4node = require('opencv4nodejs')

let point = new cv.Point(1, 2);

//255,255, cv.CV_8UC3
let mat = new cv.Mat(128,128, cv.CV_8UC3,new cv.Scalar(255,0,0));
// mat.create(255,255, cv.CV_8UC3)


console.log(mat.ptr(0))
// console.log( Buffer.from(mat.ptr(0)) )


let test = [1,2,3,4,5,6,7,8]

// _mat = new cv4node.Mat(Buffer.from(mat.ptr(0)),32,32,cv.CV_8UC3) 

_mat = new cv4node.Mat(mat.ptr(0),128,128,cv.CV_8UC3) 

// console.log(_mat.at(0,0))
// console.log(_mat.at(1,0))

// for(i=0;i<32;i++) {
//     console.log(_mat.at(i,0))

// } 


// console.log(_mat.at(0))
// console.log(point)

cv4node.imshowWait("out",_mat)