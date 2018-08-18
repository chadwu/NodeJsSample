'use strict';
var http=require('http');

var server=http.createServer(function(req,res){
	var urlHome = function(res) {	//return text
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<html><body><p>This is Home Page.</p></body></html>');
		res.end();
	};
	var urlTest = function(res) {	//return url string
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<html><body><p>This is ' + res.str2 +  ' Page.</p></body></html>');
		res.end();
	};
	var urlData = function(res) {	//return JSON data
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ message: "Hello World"}));
		res.end();
	};

	var actions = {
		"/":urlHome,
		"/admin":urlHome,
		["/test" + req.url.substring(5)]:urlTest,
		"/data":urlData,
	};

	if(typeof actions[req.url.toLowerCase()] !== 'function'){ // 防止執行未定義的目錄
		//throw new Error("Action not found.");
		res.end('Invalid Request!');
	} else {
		res.str2 = req.url;	// add str2 attribute to res for urlTest()
		actions[req.url.toLowerCase()](res);
	}
});

server.listen(18892);
console.log("Node.js web server at port 18892 is running.");