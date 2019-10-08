const cv = require('opencv4nodejs')

// let srcMat = cv.imread('../../res/contour1.png')
let srcMat = cv.imread('../../../res/tg3.JPG')

cv.imshowWait("out",srcMat)

// const imgHLS = srcMat.cvtColor(cv.COLOR_BGR2HLS);
// cv.imshowWait('out',imgHLS)

const imgGray = srcMat.cvtColor(cv.COLOR_BGR2GRAY);
cv.imshowWait('out',imgGray)


//0~128 범위의 값은 흰색으로 나머지는 검정색
const _mask1 = imgGray.inRange(0, 128);
cv.imshowWait('out',_mask1)


const contours = _mask1.findContours(
    cv.RETR_CCOMP, 
    cv.CHAIN_APPROX_SIMPLE
);

let sort_countors = contours.sort((c0, c1) => c1.area - c0.area);

let _recgObjs = [];

let _sort_countors_pointset = sort_countors.reduce((acc,cur)=> {

    //면적이 비교
    if( cur.area > 2000) {
        //console.log('bounding rect :',_contour.boundingRect() );
        //console.log(cur.area, cur.isConvex)

        let _aspectRatio = cur.boundingRect().width/cur.boundingRect().height;
        //넓이, 볼록여부 , 종횡비 
        console.log(`${cur.area},${ cur.isConvex},${_aspectRatio}`)

        if( Math.abs(1.0 - _aspectRatio) < 0.1 )
        {
            let _miniArc = cur.minEnclosingCircle().radius * 3.14 *2
            console.log('mini circle ',_miniArc / cur.arcLength())

            //둘레원의 길이와 비교 70% 이상 일치 
            if( Math.abs( _miniArc / cur.arcLength() ) > 0.7 ) {
                acc.push(cur.getPoints())
                _recgObjs.push({
                    br : cur.boundingRect()
                })
            }
        }

        
    }
    return acc;

},[]);

console.log(_sort_countors_pointset.length)

// console.log(sort_countors.getPoints())

const blue = new cv.Vec(255, 0, 0);
const green = new cv.Vec(0, 255, 0);
const red = new cv.Vec(0, 0, 255);


const _outImg = imgGray.cvtColor(cv.COLOR_GRAY2BGR);

_outImg.drawContours(   _sort_countors_pointset ,-1,red,3);

// _sort_countors.forEach((v)=> {
//     _outImg.drawContours( [v.getPoints()]   ,-1,red,3);

// })

// for (var i =0;i<100;i++)
// {
//     console.log(sort_countors[i].area);
//     _outImg.drawContours([ _sort_countors[i].getPoints()  ] ,-1,red,3);
// }

cv.imshowWait('out',_outImg)

// const matDst = new cv.Mat(512,512, cv.CV_8UC3);

_recgObjs.forEach( (cn,index)=> {
    console.log(cn,index)
    let _matSrcRegion = srcMat.getRegion( cn.br )
    
    // _matSrcRegion.copyTo(
    //     matDst.getRegion(new cv.Rect(0,0,cn.br.width,cn.br.height) ) //그려 질 위치
    //     );
           
    cv.imshowWait('out',_matSrcRegion)

})

//copyTo 는 메트릭스간에 이미지를 복사하는 함수이다.
//getRegion 의 반환 값은 단순한 좌표값이 mat의 특정 영역에 대한 mat객체 값이다.











