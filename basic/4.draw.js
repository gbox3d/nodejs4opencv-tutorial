const cv = require('opencv4nodejs')



//빈 이미지 생성
const mat = new cv.Mat(512, 512, cv.CV_8UC3, [255, 255, 255]); //BGR


mat.putText(
    String("hello"),
    new cv.Point(320, 260),
    cv.FONT_ITALIC,
    1,
    {
        color: new cv.Vec(0, 64, 196),
        thickness: 2
    }
);

// cv.rectangle(img,
//     (384,0),(510,128), #영역 
//     (0,255,0), #color
//     3)

mat.drawLine(
    new cv.Point2(96, 96),
    new cv.Point2(196, 296),
    {
        color: new cv.Vec(255, 0, 0),
        thickness: 3
    }
)

mat.drawRectangle(new cv.Rect(32, 32, 64, 64),
    {
        color: new cv.Vec(0, 0, 255),
        thickness: 1
    }
);
mat.drawEllipse(
    new cv.RotatedRect(new cv.Point2(64, 64), new cv.Size(32, 16), 0),
    { color: new cv.Vec(0, 0, 255), thickness: 2 }
);

mat.drawCircle(new cv.Point2(128, 128),
    16, //반지름 
    {
        color: new cv.Vec(0, 0, 255),
        thickness: 1 //-1 이면 체우기
    }
);

// cv.imshowWait('drawers', mat);
cv.imwrite('../temp/out_drawers.png', mat);

const test_pts = [new cv.Point2(450, 319),
new cv.Point2(331, 435),
new cv.Point2(209, 436),
new cv.Point2(106, 270),
new cv.Point2(167, 194),
new cv.Point2(221, 163),
new cv.Point2(306, 169)]

mat.drawContours(
    [test_pts],
    -1,
    new cv.Vec(0, 0, 255),
    {
        thickness: 1
    }

)

mat.drawContours(
    [test_pts],
    -1,
    new cv.Vec(0, 0, 0),
    {
        thickness: 2,
        offset: new cv.Point2(-100, -100)
    }

)

mat.drawFillPoly(
    [
        [
            new cv.Point2(32, 32),
            new cv.Point2(148, 132),
            new cv.Point2(32, 148)

        ]
    ],
    {
        thickness: 2,
        color: new cv.Vec(0, 255, 255),
        offset: new cv.Point2(300, 0)
    }
)

mat.drawPolylines(
    [
        [
            new cv.Point2(32, 32),
            new cv.Point2(148, 132),
            new cv.Point2(32, 148)

        ]
    ],
    true,
    {
        thickness: 2,
        color: new cv.Vec(0, 255, 0)
    }
)



cv.imwrite('../temp/out.png', mat);
// cv.imshowWait('drawers', mat);

console.log('done!')
