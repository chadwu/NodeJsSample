const http = require('http');

const server = http.createServer((req, res) => {
  // 這個 200 就是 http status 200，代表成功的意思
  // Content-Type 是指回應的內容是文字網頁
  const urlHome = function (resq = res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>This is Home Page.</p></body></html>');
    res.end();
  };
  const urlTest = function (resq = res) {	// return url string
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<!DOCTYPE html>'
      + '<html><body>'
      + '<h1>Url: ' + resq.str2 + '</h1>'
      + '<p>Header: ' + JSON.stringify(res.headers) + '</p>'
      + '</body></html>',
    );
    res.end();
  };

  const urlData = function (resq = res) {	// return JSON data
    res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
    res.write(JSON.stringify({ message: 'Hello World 還有中文' }));
    res.end();
  };

  const actions = {
    '/': urlHome,
    '/admin': urlHome,
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
