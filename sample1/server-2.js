var http=require('http');

var server=http.createServer(function(req,res){
		if(req.url=='/'){ //return text
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is Home Page.</p></body></html>');
			res.end();
		}else if(req.url=='/student'){
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is student Page.</p></body></html>');
			res.end();
		}else if(req.url=='/admin'){
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is admin Page.</p></body></html>');
			res.end();
		}else if(req.url == '/data') { //return JSON data
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify({ message: "Hello World"}));
			res.end();
		}else
			res.end('Invalid Request!');

});

server.listen(18892);
console.log("Node.js web server at port 18892 is running.");