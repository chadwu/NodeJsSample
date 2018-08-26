const http = require('http');

const server = http.createServer((req, res) => {
  // 大部分瀏覽器都會在你訪問 http://localhost/ 時
  // 嘗試讀取 http://localhost/favicon.ico
  console.log(`Request(${req.url}) received.`);
  // 這個 200 就是 http status 200，代表成功的意思
  // Content-Type 是指回應的內容是文字網頁
  const urlHome = function (_resq = res) {
    _resq.writeHead(200, { 'Content-Type': 'text/plain' });
    _resq.write('This is Home Page');
    _resq.end();
  };
  const urlHtml = function (_resq = res) {
    _resq.writeHead(200, { 'Content-Type': 'text/html' });
    _resq.write("<style type= 'text/css'>.container {text-align:center;}</style>");
    _resq.write('<html><body><p>This is Html Page.</p></body></html>');
    _resq.end();
  };
  const urlTest = function (resq = res) {	// return url string
    resq.writeHead(200, { 'Content-Type': 'text/html' });
    resq.write(
      '<!DOCTYPE html>'
      + '<html><body>'
      + '<h1>Url: ' + resq.str2 + '</h1>'
      + '<p>Header: ' + JSON.stringify(resq.headers) + '</p>'
      + '</body></html>',
    );
    res.end();
  };

  const urlData = function (_resq = res) {	// return JSON data
    _resq.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
    _resq.write(JSON.stringify({ message: 'Hello World 還有中文' }));
    _resq.end();
  };

  const actions = {
    '/': urlHome,
    '/admin': urlHome,
    '/html': urlHtml,
    ['/test' + req.url.substring(5)]: urlTest,
    '/data': urlData,
  };

  if (typeof actions[req.url.toLowerCase()] !== 'function') { // 防止執行未定義的目錄
    // throw new Error("Action not found.");
    // res.writeHead(404);
    res.end('Invalid Request!');
  } else {
    // add str2 attribute to res for urlTest()
    res.str2 = req.url;
    res.headers = req.headers;
    actions[req.url.toLowerCase()](res);
  }
});

server.listen(18892);
console.log('Node.js web server at port 18892 is running.');
