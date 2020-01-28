/*
외각선의 계층 관계 구하기 
*/
const cv = require('opencv4nodejs')

let srcMat = cv.imread('../../res/contour2.png')

const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);


const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);
const contours = imgGray.findContours(
    cv.RETR_TREE,
    cv.CHAIN_APPROX_SIMPLE
);

let contours_pt_list = contours.reduce((acc, cur) => {

    let _hrc = cur.hierarchy;
    // console.log(_hrc);
    console.log(`parent : ${_hrc.z}, first child : ${_hrc.y} , next : ${_hrc.w} , prev : ${_hrc.x}`)

    if (cur.area > 20) {
        acc.push(cur.getPoints())
    }
    return acc;

}, []);

//최상위 하나만 그리기 
srcMat.drawContours(   contours_pt_list ,0,red,5);

//console.log(contours_pt_list)
//cv.imshowWait("out", srcMat)
cv.imwrite(`../../temp/contourthree.png`, srcMat);
