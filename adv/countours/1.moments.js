const cv = require('opencv4nodejs')

let srcMat = cv.imread('../../res/contour1.png')

// cv.imshowWait("out",srcMat)

const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);
//cv.imshowWait('out',imgGray)


const contours = imgGray.findContours(
  cv.RETR_CCOMP,
  cv.CHAIN_APPROX_SIMPLE
);


const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);


const _outImg = imgGray.cvtColor(cv.COLOR_GRAY2BGR);


let contours_pt_list = contours.reduce((acc,cur)=> {

  // console.log(`isconvex : ${cur.isConvex}`)

  if( cur.area > 200) {
    acc.push(cur.getPoints())
  }
  return acc;

},[]);

_outImg.drawContours(   contours_pt_list ,-1,red,3);

let _contour = contours[0];
let _mnt = contours[0].moments();

console.log(_contour);
console.log(_mnt);

//무게 중심구하기 
let cx = _mnt.m10 /_mnt.m00;
let cy = _mnt.m01 /_mnt.m00;

_outImg.drawCircle(new cv.Point2(cx, cy), 8,
  {
    color: green,
    thickness: 3
  }
);

console.log( `arcLength : ${_contour.arcLength(true)}`);
console.log( `weight center : ${cx},${cy}`);
console.log('bounding rect :',_contour.boundingRect() );

//호의 길이 구하기 
_outImg.putText(
  String("arc :" + _contour.arcLength()),
  new cv.Point2(cx, cy),
  cv.FONT_HERSHEY_SIMPLEX,
  0.5,
  {
      color: new cv.Vec(0, 0, 0),
      thickness: 2
  }
);

_outImg.drawRectangle( _contour.boundingRect(), {
  color : blue,
  thickness : 3
} );


cv.imshowWait('countours',_outImg)

