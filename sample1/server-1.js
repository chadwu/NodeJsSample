var http=require('http');
var server=http.createServer(function(request,response){
		//handle imcoming request here...
});

server.listen(18892);
console.log("Node.js web server at port 18892 is running.");