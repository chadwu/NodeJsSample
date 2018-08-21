const http = require('http');

const server = http.createServer((req, res) => {
  const resq = res;
  const urlHome = function (resq) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>This is Home Page.</p></body></html>');
    res.end();
  };
  const urlTest = function (resq) {	// return url string
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html><body><p>This is ${resq.str2} Page.</p></body></html>`);
    res.end();
  };
  const urlData = function (resq) {	// return JSON data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Hello World' }));
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
    res.end('Invalid Request!');
  } else {
    // add str2 attribute to res for urlTest()
    resq.str2 = req.url;
    actions[req.url.toLowerCase()](res);
  }
});

server.listen(18892);
console.log('Node.js web server at port 18892 is running.');
