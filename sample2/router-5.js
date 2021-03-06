function route(response, handle, pathname) {
  console.log(`Route a request for [${pathname}]`);
  if (typeof handle[pathname.toLowerCase()] !== 'function') { // 防止執行未定義的目錄
    // throw new Error("Action not found.");

    // response.writeHead(404, { 'Content-Type': 'text/plain' });
    // response.write('404 Not found');
    // response.end();

    response.end('Invalid Request!');
  } else {
    // add str2 attribute to response object for urlTest()
    response.str2 = pathname;
    // response.headers = req.headers;
    handle[pathname.toLowerCase()](response);
  }
}

exports.route = route;
