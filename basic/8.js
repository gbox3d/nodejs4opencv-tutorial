// import cv from 'opencv4nodejs'
const cv = require('opencv4nodejs')

//참고 예제 
//https://medium.com/@muehler.v/simple-hand-gesture-recognition-using-opencv-and-javascript-eb3d6ced28a0
//https://github.com/justadudewhohacks/opencv4nodejs/blob/master/examples/handGestureRecognition0.js
const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255); //bgr
const orange = new cv.Vec(0, 64, 255);


let maskImg = cv.imread('../res/hand5_masked.png')
// cv.imshowWait('maskImg',maskImg)

let _maskImg = maskImg.cvtColor(cv.COLOR_BGR2GRAY)

//윤각선 찾기 
const mode = cv.RETR_EXTERNAL;
const method = cv.CHAIN_APPROX_SIMPLE;
const contours = _maskImg.findContours(mode, method);

// console.log(contours)
let sort_countors = contours.sort((c0, c1) => c1.area - c0.area)[0];
// console.log(sort_countors.getPoints())

maskImg.drawContours([sort_countors.getPoints()], -1, blue, 3)


let contour = sort_countors

// const maxPointDist = 25;
// const hullIndices = getRoughHull(handContour, maxPointDist);

//외각선 정보 가지고 볼록 껍질 구하기
const hullIndices = contour.convexHullIndices();

console.log(hullIndices)

const contourPoints = contour.getPoints();

const hullPointsWithIdx = hullIndices.map(idx => ({
    pt: contourPoints[idx],
    contourIdx: idx
}));

console.log("hullPointsWithIdx", hullPointsWithIdx)

hullPointsWithIdx.forEach((v) => {
    maskImg.drawEllipse(
        new cv.RotatedRect(v.pt, new cv.Size(20, 20), 0),
        { color: red, thickness: 2 }
    );
})
//   const hullPoints = hullPointsWithIdx.map(ptWithIdx => ptWithIdx.pt);
cv.imshowWait('countours', maskImg)

//볼록 다각형 간소화 시키기 
const hullPoints = hullPointsWithIdx.map(ptWithIdx => ptWithIdx.pt);

console.log("hull points ", hullPoints)

// returns distance of two points
const ptDist = (pt1, pt2) => pt1.sub(pt2).norm();

// returns center of all points
const getCenterPt = pts => pts.reduce(
    (sum, pt) => sum.add(pt),
    new cv.Point(0, 0)
).div(pts.length);



// group all points in local neighborhood
const maxDist = 25;
const ptsBelongToSameCluster = (pt1, pt2) => ptDist(pt1, pt2) < maxDist;

const { labels } = cv.partition(hullPoints, ptsBelongToSameCluster);

console.log("labels", labels)

const pointsByLabel = new Map();
labels.forEach(l => pointsByLabel.set(l, []));

// console.log(pointsByLabel)

hullPointsWithIdx.forEach((ptWithIdx, i) => {
    const label = labels[i];
    console.log(label, labels, i, ptWithIdx)
    pointsByLabel.get(label).push(ptWithIdx);
});

console.log("pointsByLabel", pointsByLabel)

// map points in local neighborhood to most central point
const getMostCentralPoint = (pointGroup) => {
    // find center
    const center = getCenterPt(pointGroup.map(ptWithIdx => ptWithIdx.pt));
    // sort ascending by distance to center
    return pointGroup.sort(
        (ptWithIdx1, ptWithIdx2) => ptDist(ptWithIdx1.pt, center) - ptDist(ptWithIdx2.pt, center)
    )[0];
};

const pointGroups = Array.from(pointsByLabel.values());

console.log(pointGroups)
console.log(pointGroups.map(getMostCentralPoint))

pointGroups.map(getMostCentralPoint).forEach(v => {

    maskImg.drawEllipse(
        new cv.RotatedRect(v.pt, new cv.Size(30, 30), 0),
        { color: new cv.Vec(0, 255, 255), thickness: 2 }
    );

})

cv.imshowWait('countours', maskImg)


// console.log(pointGroups.map(getMostCentralPoint).map(ptWithIdx => ptWithIdx.contourIdx));

//볼록 다각형 정점 구하기
// pointGroups.map(getMostCentralPoint).map(ptWithIdx => ptWithIdx.contourIdx)
let _hullIndices = pointGroups.map(getMostCentralPoint).map(ptWithIdx => ptWithIdx.contourIdx)
console.log("rough hull : ",_hullIndices)

const defects = contour.convexityDefects(_hullIndices);
const handContourPoints = contour.getPoints();
console.log(defects)

const hullPointDefectNeighbors = new Map(_hullIndices.map(idx => [idx, []]));

defects.forEach((defect) => {
    const startPointIdx = defect.at(0);
    const endPointIdx = defect.at(1);
    const defectPointIdx = defect.at(2);
    hullPointDefectNeighbors.get(startPointIdx).push(defectPointIdx);
    hullPointDefectNeighbors.get(endPointIdx).push(defectPointIdx);
});

console.log(hullPointDefectNeighbors)

let _HullDefectVertices = Array.from(hullPointDefectNeighbors.keys())
    // only consider hull points that have 2 neighbor defects
    .filter(hullIndex => hullPointDefectNeighbors.get(hullIndex).length > 1)
    // return vertex points
    .map((hullIndex) => {
        const defectNeighborsIdx = hullPointDefectNeighbors.get(hullIndex);
        return ({
            pt: handContourPoints[hullIndex],
            d1: handContourPoints[defectNeighborsIdx[0]],
            d2: handContourPoints[defectNeighborsIdx[1]]
        });
    });

console.log(_HullDefectVertices,_HullDefectVertices.length)

_HullDefectVertices.forEach((v,index) => {
    maskImg.drawLine(
      v.pt,
      v.d1,
      { color: orange, thickness: 2 }
    );
    maskImg.drawLine(
      v.pt,
      v.d2,
      { color: orange, thickness: 2 }
    );

    maskImg.putText(
        String(index),
        v.pt,
        cv.FONT_ITALIC,
        1,
        { color: green, thickness: 2 }
      );

    // maskImg.drawEllipse(
    //     new cv.RotatedRect(v.pt, new cv.Size(10, 10), 0),
    //     { color: orange, thickness: 2 }
    // );

    cv.imshowWait('countours', maskImg)

    // console.log(`new cv.Point2(${v.pt.x},${v.pt.y}),`)
    
  });




  //특정각도 이상만 남기기 
const filterVerticesByAngle = (vertices, maxAngleDeg) =>
  vertices.filter((v) => {
    const sq = x => x * x;
    const a = v.d1.sub(v.d2).norm();
    const b = v.pt.sub(v.d1).norm();
    const c = v.pt.sub(v.d2).norm();
    const angleDeg = Math.acos(((sq(b) + sq(c)) - sq(a)) / (2 * b * c)) * (180 / Math.PI);
    return angleDeg < maxAngleDeg;
  });


const maxAngleDeg = 60;
const verticesWithValidAngle = filterVerticesByAngle(_HullDefectVertices, maxAngleDeg);

console.log("verticesWithValidAngle :",verticesWithValidAngle)

verticesWithValidAngle.forEach((v) => {
    maskImg.drawLine(
      v.pt,
      v.d1,
      { color: green, thickness: 2 }
    );
    maskImg.drawLine(
      v.pt,
      v.d2,
      { color: green, thickness: 2 }
    );

    cv.imshowWait('countours', maskImg)
    
  });

  const numFingersUp = verticesWithValidAngle.length;

  console.log(numFingersUp)

  const fontScale = 2;
  maskImg.putText(
    String(numFingersUp),
    new cv.Point(20, 60),
    cv.FONT_ITALIC,
    fontScale,
    { color: green, thickness: 2 }
  );

  cv.imshowWait('countours', maskImg)


  




