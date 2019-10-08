
const _checkCircle = (_contour, ratioThres, arcThres) =>{

    let _ratio = 1;  //가로 세로 비율

    
    _ratio = _contour.boundingRect().width > _contour.boundingRect().height ?
        _contour.boundingRect().height / _contour.boundingRect().width :
        _contour.boundingRect().width / _contour.boundingRect().height;

    

    if(_ratio > ratioThres) {
        let _arcRate = (_contour.minEnclosingCircle().radius * 3.14 * 2) / _contour.arcLength()

        //넓이, 볼록여부 , 종횡비 
        console.log(`area : ${_contour.area}, isConvex : ${_contour.isConvex}, ratio : ${_ratio},`)
        console.log('arc rate :',_arcRate)
        
        if (_arcRate > arcThres) { //원호 크기 비율, 1이면 정확히 일치 , 작으면 작을 수록 일치하지않음 
            

            return true
        }

    }

    return false

}

const _findCircleArea = ({contours,areaThre ,ratioThres, arcThres}) => {

    function findParent(_) {

        // console.log(_)
        if(  _checkCircle(_,ratioThres,arcThres) ) {
            return true
        }
        else {
            if (_.hierarchy.z >= 0) {
                console.log(_.hierarchy.z)
                return findParent(contours[_.hierarchy.z])
            }
            else {
                return false
            }
        }
    }
    
    let contours_circle = [];
    //원모양의 윤각선만 구하기 
    contours.forEach((cur, index) => {
    
        if (cur.area > areaThre && _checkCircle(cur, ratioThres, arcThres)) {
            if( cur.hierarchy.z >= 0 ) {
                
                if(findParent( contours[cur.hierarchy.z] ) == false)
                    contours_circle.push(cur)
            }
            else {
                contours_circle.push(cur)
            }
        }
    })
    
    return contours_circle
}

module.exports = {
    findCircleArea : _findCircleArea
    
}