//roi 예제
const cv = require('opencv4nodejs')
const libCom = require('./libcom')

const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);

let cmd_arguments = []
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    cmd_arguments.push(val)
});

const srcMat = cv.imread(cmd_arguments[2])
const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);


//0~128 범위의 값은 흰색으로 나머지는 검정색
const _mask1 = imgGray.inRange(0, 128);
// cv.imshowWait('out',_mask1)

const contours = _mask1.findContours(
    cv.RETR_TREE,
    cv.CHAIN_APPROX_SIMPLE
);

let contours_circle = libCom.findCircleArea({
    contours : contours,
    ratioThres : 0.9,
    arcThres : 0.9,
    areaThre : 500
})


console.log(contours_circle)

contours_circle.forEach((_) => {
 
    srcMat.drawRectangle(_.boundingRect(), {
        color: blue,
        thickness: 3
    });

})

cv.imshowWait('out', srcMat)


contours_circle.forEach( (cn,index)=> {
    //console.log(cn,index)
    let _matSrcRegion = imgGray.getRegion( cn.boundingRect() )
    cv.imshowWait('out',_matSrcRegion)
})
