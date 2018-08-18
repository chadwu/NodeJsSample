var http=require('http');

var server=http.createServer(function(req,res){
		if(req.url=='/'){ //return text
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is Home Page.</p></body></html>');
			res.end();	
		}else if(req.url=='/test'){
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<html><body><p>This is test Page.</p></body></html>');
			res.end();
		}else
			res.end('Invalid Request!');

});

server.listen(18892);
console.log("Node.js web server at port 18892 is running.");