const cv = require('opencv4nodejs')
const fs = require("fs")

try {
    let imgdata = fs.readFileSync('../../res/Lenna.png');

    //버퍼에서 mat 로 만들기 
    let mat = cv.imdecode(imgdata);

    //이미지 처리
    let _gray = mat.cvtColor(cv.COLOR_BGR2GRAY)

    //출력 
    //cv.imwrite('../../temp/out.png', _gray)

    //다시 이미지 버퍼로 만들기 첫번째 인자는 .png,.jpg 등이 올수있다. 해당 포멧으로 인코딩 
    let _buf = cv.imencode(".jpg",_gray)

    fs.writeFileSync('../../temp/out.png',_buf)

    console.log('done!')
}
catch (e) {
    console.log(e);

}


// cv.imshowWait("out", mat2)