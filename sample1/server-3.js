var http=require('http');

var server=http.createServer(function(req,res){
		switch (req.url.toLowerCase()){
		case '/':		//return text
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is Home Page.</p></body></html>');
			res.end();
			break;

		case '/test':	//return text
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is test Page.</p></body></html>');
			res.end();
			break;

		case '/data':	//return JSON data
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify({ message: "Hello World"}));
			res.end();
			break;

		default:
			res.end('Invalid Request!');
			break;
	}		

});

server.listen(18892);
console.log("Node.js web server at port 18892 is running.");