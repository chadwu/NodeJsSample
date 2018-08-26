const http1 = require('http');
const url1 = require('url');

function start(route, handle) {
  const server = http1.createServer((req, response) => {
    // 大部分瀏覽器都會在你訪問 http://localhost/ 時
    // 嘗試讀取 http://localhost/favicon.ico
    const pathname1 = url1.parse(req.url).pathname;
    let postData = '';
    console.log(`Request (${req.url})[${pathname1}] received.`);

    // req.setEncoding('utf8');

    // only for FORM POST ( multi data(), one end()) )
    // req.addListener('data', (postDataChunk) => {
    //   postData += postDataChunk;
    //   console.log(`Received POST data chunk '${postDataChunk}'.`);
    // });

    // only for FORM POST ( multi data(), one end()) )
    // req.addListener('end', () => {
    //   route(req, response, handle, pathname1, postData);
    // });
    route(req, response, handle, pathname1, postData);
  });
  server.listen(18892);
  console.log('Node.js web server at port 18892 is running.');
}

exports.start = start;
