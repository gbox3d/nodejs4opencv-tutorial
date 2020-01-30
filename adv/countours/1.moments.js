/*

countous 의 moment 를 이용해서 중점 , 크기, 경계박스 구하기 예제 

참고 : https://blog.naver.com/samsjang/220517848698



*/
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


// drawContours 함수 인자로 쓸 배열 생성 
let contours_pt_list = contours.reduce((acc, cur) => {
  //면적이 200이상만 받기 
  if (cur.area > 200) {
    acc.push(cur.getPoints())
  }
  return acc;
}, []);

//윤각선 그리기 
_outImg.drawContours(contours_pt_list, -1, red, 3);


//각 윤각선에 대한 정보 구하기 
contours.forEach((_contour, index) => {

  // let _contour = contours[0];
  let _mnt = _contour.moments();

  console.log(_contour);
  console.log(_mnt);

  //무게 중심구하기 
  let cx = _mnt.m10 / _mnt.m00;
  let cy = _mnt.m01 / _mnt.m00;

  _outImg.drawCircle(new cv.Point2(cx, cy), 8,
    {
      color: green,
      thickness: 3
    }
  );

  // Rect { height: 107, width: 148, y: 131, x: 101 }
  let _bbox = _contour.boundingRect()

  // console.log(`area : ${_contour.area}, isConvex : ${_contour.isConvex}`)

  console.log(`arcLength : ${_contour.arcLength(true)}`);
  console.log(`weight center : ${cx},${cy}`);
  console.log('bounding rect :', _bbox);
  // console.log(`solidity ${_contour.area}`);

  //호의 길이 구하기 
  _outImg.putText(
    //String("arc :" + _contour.arcLength()),
    `arcLength : ${ Math.round(_contour.arcLength() *100) / 100}`,
    new cv.Point2(_bbox.x, _bbox.y - 8),
    cv.FONT_HERSHEY_SIMPLEX,
    0.5,
    {
      color: new cv.Vec(0, 255, 255),
      thickness: 1
    }
  );

  //오목형 이면 
  if(!_contour.isConvex) {
    //감쌀수있는 볼록 다각형구하기 
    let _convexCountor =  _contour.convexHull();
    //_convexCountor.area
    _outImg.drawContours([_convexCountor.getPoints()], 0, green, 3);

    //오목한 정도 구하기 1이면 거의 오목하지않다. 클수록 오목하다.
    let _solidity =  Math.round((_convexCountor.area / _contour.area)*10)/10
    _outImg.putText(
      //String("arc :" + _contour.arcLength()),
      `solidity : ${_solidity} `,
      new cv.Point2(_bbox.x, _bbox.y - 22),
      cv.FONT_HERSHEY_SIMPLEX,
      0.5,
      {
        color: new cv.Vec(0, 255, 255),
        thickness: 1
      }
    );

  }
  else {
    _outImg.putText(
      //String("arc :" + _contour.arcLength()),
      'convex',
      new cv.Point2(_bbox.x, _bbox.y - 22),
      cv.FONT_HERSHEY_SIMPLEX,
      0.5,
      {
        color: new cv.Vec(0, 255, 255),
        thickness: 1
      }
    );

  }

  _outImg.drawRectangle(_contour.boundingRect(), {
    color: blue,
    thickness: 3
  });

})

cv.imwrite('../../temp/out.png', _outImg);
// cv.imshowWait('countours',_outImg)

