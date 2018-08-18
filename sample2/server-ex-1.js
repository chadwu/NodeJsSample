//*** "express" 需要其他package 配合. 因此取消此範例 (不能跑)

'use strict';
//import express1 from 'express';
let express1=require('express');
let app = express1();

app.get('/', (request,response) => {
	response.send('hello world!');
})

app.listen(18892);
console.log("Node.js web server at port 18892 is running.");