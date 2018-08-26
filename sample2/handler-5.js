const exec1 = require('child_process').exec;

// function sleep(milliSeconds) {
//   const startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + milliSeconds);
// }

// 這個 200 就是 http status 200，代表成功的意思
// Content-Type 是指回應的內容是文字網頁
const urlHome = function (_response) {
  console.log("Request handler 'urlHome' was called.");
  _response.writeHead(200, { 'Content-Type': 'text/plain' });
  _response.write('This is Home Page');
  _response.end();
};
const urlHtml = function (response) {
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
      response.writeHead(200, { 'Content-Type': 'text/plain' });
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
const urlTest = function (response) {	// return url string
  console.log("Request handler 'urlTest' was called.");
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(
    '<!DOCTYPE html>'
    + '<html><body>'
    + '<h1>Url: ' + response.str2 + '</h1>'
    + '<p>Header: ' + JSON.stringify(response.headers) + '</p>'
    + '</body></html>',
  );
  response.end();
};

const urlData = function (_response) {	// return JSON data
  console.log("Request handler 'urlData' was called.");
  _response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
  _response.write(JSON.stringify({ message: 'Hello World 還有中文' }));
  _response.end();
};

exports.urlHome = urlHome;
exports.urlHtml = urlHtml;
exports.urlTest = urlTest;
exports.urlData = urlData;
