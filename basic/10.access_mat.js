const cv = require('opencv4nodejs')
// import {cv} from 'opencv4nodejs'

const mat = cv.imread('../res/Lenna.png') //이미지 읽어 메트릭스로 만들기 

cv.imshowWait("out", mat)
const region = mat.getRegion(new cv.Rect(
    256,256, //잘라낼 위치
    64,64 //크기 
    )) // 영역 잘라내기 

const matBGR = new cv.Mat(256,256, cv.CV_8UC3);
matBGR.set(50, 50, [0, 0, 255]); //50,50 에 빨간점 찍기 

const vec3 = matBGR.at(50, 50); //50,50 의 픽셀 얻기 
console.log(vec3)

let temp = new cv.Mat(64,64,cv.CV_8UC3)
region.copyTo(temp);

// get a node buffer with raw Mat data
let matAsBuffer = temp.getData()

// get entire Mat data as JS array
const matAsArray = temp.getDataAsArray();

// console.log(matAsBuffer)


for(y = 0;y<64;y++) {
    for(x=0;x<64;x++) {

        let pIndex = (x + (y*64))*3

        // console.log(matAsBuffer[pIndex])
        matBGR.set(y +  100,x+100,new cv.Vec(matAsBuffer[pIndex],matAsBuffer[pIndex+1],matAsBuffer[pIndex+2]) )
    }
}

cv.imshowWait("out", matBGR) //키입력 들어올때까지 기다리기 



