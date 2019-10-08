const cv = require('opencv4nodejs')
const libCom = require('./libcom')

//원 윤각선 만들기 
function makeCircleContour(size) {
    //빈 이미지 생성
    const mat = new cv.Mat(size, size,
        cv.CV_8UC1,
        [0]
    );

    mat.drawCircle(new cv.Point2(size/2, size/2), size/4,
        {
            color: new cv.Vec(255, 255, 255),
            thickness: -1 //-1 이면 체우기
        }
    );

    const contours = mat.findContours(
        cv.RETR_LIST,
        cv.CHAIN_APPROX_SIMPLE
    );

    console.log(contours)

    return contours[0];
    const circle_contour = contours[0];
}

const imgOut = new cv.Mat(256,256,
    cv.CV_8UC3,
    [0,0,0])

const _cc = makeCircleContour(64)

imgOut.drawContours([_cc.getPoints()],0,new cv.Vec(255,0,0),3);

console.log(libCom.checkCircle(_cc,0.9,0.7));

cv.imshowWait('drawers', imgOut);