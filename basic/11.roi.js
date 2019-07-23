//roi 예제
const cv = require('opencv4nodejs')

const matSrc = cv.imread('../res/Lenna.png')
const matDst = new cv.Mat(512,512, cv.CV_8UC3);

matSrc.drawRectangle(new cv.Rect(256,256,128,128),
    {
        color: new cv.Vec(0, 0, 255),
        thickness: 1
    }
);
cv.imshowWait('out',matSrc);


const _matSrcRegion = matSrc.getRegion(new cv.Rect(256,256,128,128) )
cv.imshowWait('out',_matSrcRegion);

//copyTo 는 메트릭스간에 이미지를 복사하는 함수이다.
//getRegion 의 반환 값은 단순한 좌표값이 mat의 특정 영역에 대한 mat객체 값이다.
_matSrcRegion.copyTo(
    matDst.getRegion(new cv.Rect(64,64,128,128) ) //그려 질 위치
    );

    
cv.imshowWait('out',matDst)




