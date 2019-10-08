const cv = require('opencv4nodejs')

let srcMat = cv.imread('../../../res/tg3.JPG')
// cv.imshowWait('out',_img)

const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);

const _mask1 = imgGray.inRange(0, 128);
cv.imshowWait('out',_mask1)


let circles = _mask1.houghCircles(cv.HOUGH_GRADIENT,
    1, //종횡비 
    100, //찾은 원들의  중심간 거리의 최소값( 원들이 여러개 붙어있는것들 방지)
    75, //canny 디텍션 변수
    80 //허프만 변수
);

console.log(circles)


circles.forEach((circle, index) => {

    srcMat.drawCircle(new cv.Point2(circle.x, circle.y), circle.z,
        {
            color: new cv.Vec(0, 0, 255),
            thickness: 3
        }
    );


})

cv.imshowWait('out', srcMat)



