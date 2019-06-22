const cv = require('opencv4nodejs')

let pts = [
    new cv.Point2(1,2),
    new cv.Point2(2,2),
    new cv.Point2(3,2),
    new cv.Point2(2,3),
    new cv.Point2(10,12),
    new cv.Point2(11,12),
    new cv.Point2(10,13)
]

const maxDist = 5 //서로 거리가 5이내인점들끼리 묶기 
const ptDist = (pt1, pt2) => pt1.sub(pt2).norm();
const ptsBelongToSameCluster = (pt1, pt2) => ptDist(pt1, pt2) < maxDist;

//근접점 묶기
console.log(cv.partition(pts,ptsBelongToSameCluster))

