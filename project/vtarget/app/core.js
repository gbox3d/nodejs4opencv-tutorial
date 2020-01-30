const http = require('http');
const util = require('util');
const fs = require('fs');
const os = require('os');
const UrlParser = require('url');
const cv = require('opencv4nodejs');

let theApp = {
  version : '1.0.0',
  port : 8081
};

//command line argument parse
process.argv.forEach(function(val, index, array) {

  //아규먼트가 존재하면 처리하고 없으면 기본값으로
  if(val.indexOf('=') > 0) {

    var tokens = val.split('=');

    switch (tokens[0]) {
      case 'port':
        theApp.port = parseInt(tokens[1]);
        break;
      case 'module_path':
        theApp.module_path = tokens[1];
        break;
    }
  }
});


let app = http.createServer(
  function(req, res){

    if(req.url != '/favicon.ico') {

    }
    console.log(req.url);

    try {
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      console.log('remote address:' + ip);

    }
    catch(e)
    {
      console.log(e);

    }

    var method = req.method;
    if(method == 'OPTIONS') {
      method = req.headers['access-control-request-method'];
    }
    else {

    }

    console.log(method);

    switch(method){
      case 'GET':
        process_get(req, res);
        break;
      case 'POST':
        process_post(req, res);
        break;
    }
  }
);
app.listen(theApp.port);

console.log(`opencv app server ${theApp.version}`);
console.log(` start port : ${theApp.port} ready ok! `);


//get 처리 해주기
function process_get(req, res){

  var result = UrlParser.parse(req.url,true);

  console.log("GET", result);

  switch (result.pathname) {
    case '/':
      fs.readFile(__dirname + '/index.html',
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
          }

          res.writeHead(200);
          res.end(data);
        });
      break;
    default :
      res.writeHead(200);
      res.end('file upload system version:' + theApp.version);
      break;
  }


}

function process_post(req, res) {

  let result = UrlParser.parse(req.url,true);
  let body_data = []

  console.log(req.headers)

  console.log('pathname', result.pathname);

  console.log("incomming post data !");

  switch (result.pathname) {
    case '/info':
    {
      //포스트는 데이터가 조각조각 들어 온다.
      req.on('data',function(data) {
        //body_data += data;
        body_data.push(data)
        console.log( `${data.length}  bytes saved `);
      });

      req.on('end', function () {

        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '1000'
        });
        console.log(body_data)

        let result = {result:'ok'}
        res.end(JSON.stringify(result));

      })
    }
      break;
    case '/upload':
    {
      //파일 열기
      let filepath = `./uploads/${req.headers['upload-name']}`;
      console.log(`file path : ${filepath}`);
      let fd = fs.openSync(filepath,"w");

      //포스트는 데이터가 조각조각 들어 온다.
      req.on('data',function(data) {
        //body_data += data;
        body_data.push(data)
        console.log(data.length);
        fs.writeSync(fd,data);

      });

      req.on('end', function () {
        fs.closeSync(fd);
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '1000'
        });
        // console.log(body_data)
        let result = {result:'ok'}
        res.end(JSON.stringify(result));
      })
    }
      break;
      case '/cvtGray':
      {
        // body_data = [];
        //파일 열기
        let filepath = `./uploads/${req.headers['upload-name']}`;
        console.log(`file path : ${filepath}`);

        let file_size = parseInt(req.headers['file-size'])
        console.log(file_size)
        // let fd = fs.openSync(filepath, "w");

        //크기 만큼 할당 
        const _buf = Buffer.allocUnsafe(file_size);

        let _index = 0;

        //포스트는 데이터가 조각조각 들어 온다.
        req.on('data', function (data) {
          //버퍼에 추가 
          data.copy(_buf, _index);
          _index += data.length;
          console.log(`data receive : ${data.length} , ${_index}`);
        });

        req.on('end', function () {
          console.log(`data receive end : ${_index}`);

          let mat = cv.imdecode(_buf)

          let _mat_gray = mat.cvtColor(cv.COLOR_BGR2GRAY)

          let _result_buf = cv.imencode(".png",_mat_gray)

          //버퍼내용 파일에 저장
          // fs.writeFileSync(filepath, _buf);

          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '1000'
          });

          // console.log(body_data)

          // let result = { result: 'ok' }
          res.end(_result_buf);

          //클라이언트 측에서 받기 예..
          //https://stackoverflow.com/questions/50248329/fetch-image-from-api

        })
        
      }
      break;
  }
  

}