const exec1 = require('child_process').exec;
const querystring1 = require('querystring');
const fs1 = require('fs');
const formidable1 = require('formidable');

// function sleep(milliSeconds) {
//   const startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + milliSeconds);
// }

// 這個 200 就是 http status 200，代表成功的意思
// Content-Type 是指回應的內容是文字網頁
const urlHome = function (_req, response, _postData) {
  console.log("Request handler 'urlHome' was called.");
  response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  // response.write('This is Home Page');
  const body = '<html>'
    + '<head>'
    + '<meta http-equiv="Content-Type" content="text/html; '
    + 'charset=UTF-8" />'
    + '</head>'
    + '<style>.div1{width:300px;height:200px;float:left;}</style>'
    + '<body>'

  // + '<div class="div1">'
  // + '<form action="/upload" method="post">'
  // + '<textarea name="text" rows="10" cols="40"></textarea>'
  // + '<input type="submit" value="Submit text" />'
  // + '</form>'
  // + '</div>'

    + '<div class="div1">'
    + '<form action="/uploadfile" enctype="multipart/form-data" method="post">'
    + '<input type="file" name="uploadf">'
    + '<input type="submit" value="Upload file" />'
    + '</form>'
    + '</div>'

    + '</body>'
    + '</html>';
  response.write(body);
  response.end();
};
const urlHtml = function (_req, response, _postData) {
  console.log("Request handler 'urlHtml' was called. and wait 10s");
  // sleep(10000); // Blocking:其他網址要求也會被delay 到
  // 無法測試出delay 效果, response.write() 無法執行
  exec1('find /C "ssh" d:\\GWX.rar', // ABC_1309.ISO
    { timeout: 10000, maxBuffer: 200000 * 1024 },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      /*
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(stdout);
      response.write('-----\n');
      response.write(stderr);
      response.end();
      */
    });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write("<style type= 'text/css'>.container {text-align:center;}</style>");
  response.write('<html><body><p>This is Html Page.</p></body></html>');
  response.end();
};

const urlError = function (_req, response, _postData) {
  console.log("Request handler 'urlError' was called. and wait 10s");
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write("<style type= 'text/css'>.container {text-align:center;}</style>");
  response.write('<html><body><p>This is Error Page.</p></body></html>');
  response.end();
};

const urlTest = function (req, response, _postData) {	// return url string
  console.log("Request handler 'urlTest' was called.");
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(
    '<!DOCTYPE html>'
    + '<html><body>'
    + `<h1>Url: ${response.str2}</h1>`
    + `<p>Header: ${JSON.stringify(req.headers)}</p>`
    + '</body></html>',
  );
  response.end();
};

const urlData = function (_req, response, _postData) {	// return JSON data
  console.log("Request handler 'urlData' was called.");
  response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
  response.write(JSON.stringify({ message: 'Hello World 還有中文' }));
  response.end();
};

const urlUpload = function (_req, response, postData) {
  console.log("Request handler 'urlUpload' was called.");
  response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' });
  // response.write(`You've sent: ${postData}`);
  response.write(`You've sent the text:\n${querystring1.parse(postData).text}`);
  response.end();
};

const urlUploadfile = function (req, response, _postData) {
  console.log("Request handler 'urlUploadfile' was called.");
  const form1 = new formidable1.IncomingForm();
  // form1.uploadDir is %TEMP%='c:\\temp\\'
  console.log('about to parse');
  form1.parse(req, (err, fields, files) => {
    if (err) {
      response.end('Invalid Request!');
      return;
    }
    console.log('received fields: ');
    console.log(fields);
    console.log('received files: ');
    console.log(files);

    const keys = Object.keys(files);
    keys.forEach((key) => { // only one file
      const filePath = files[key].path;
      const fileType = files[key].type;
      const fileExt = '.' + fileType.substr(fileType.lastIndexOf('/') + 1);
      fs1.renameSync(filePath, form1.uploadDir + '\\test' + fileExt);

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('received image:<br/>');
      response.write("<img src='/show' />");
      response.end();
    });
    console.log('parsing done');
  });
};

const urlShow = function (_req, response, _postData) {
  console.log("Request handler 'urlShow' was called.");
  const form1 = new formidable1.IncomingForm();
  // form1.uploadDir is %TEMP%='c:\\temp\\'
  const upfiles = fs1.readdirSync(form1.uploadDir);
  upfiles.forEach((f) => {
    if (f.substr(0, 5) === 'test.') {
      console.log(`find file [${f}].`);
      const fileExt = f.substr(f.lastIndexOf('.') + 1);
      const fileType = 'image/' + fileExt;
      const filedata = fs1.readFileSync(form1.uploadDir + '\\' + f, 'binary');
      response.writeHead(200, { 'Content-Type': fileType });
      response.write(filedata, 'binary');
      response.end();

      // fs1.readFile('c:\\temp\\' + f, 'binary', (err, filedata) => {
      //   if (err) {
      //     response.writeHead(500, { 'Content-Type': 'text/plain' });
      //     response.write(`${err}\n`);
      //     response.end();
      //   } else {
      //     response.writeHead(200, { 'Content-Type': fileType });
      //     response.write(filedata, 'binary');
      //     response.end();
      //   }
      // });
      // fs1.renameSync(form1.uploadDir + '\\' + f , form1.uploadDir + '\\' + new Date().getTime());
      fs1.unlinkSync(form1.uploadDir + '\\' + f); // delete file
    }
  });
};

exports.urlHome = urlHome;
exports.urlHtml = urlHtml;
exports.urlError = urlError;
exports.urlTest = urlTest;
exports.urlData = urlData;
exports.urlUpload = urlUpload;
exports.urlUploadfile = urlUploadfile;
exports.urlShow = urlShow;
