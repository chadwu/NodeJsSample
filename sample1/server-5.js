'use strict';
let mongodb1  = require('mongodb');

let mongodbServer = new mongodb1.Server('localhost', 27017, {
	auto_reconnect: true,
	poolSize: 10
  });

 let db1 = new mongodb1.Db('test', mongodbServer);
	db1.collection('student', function(err, collection) {
		// 建立新的資料 
		let datas = [];
		datas.push({
			"name": "Apple",
			"score": "60",
		});

		// 定義存入到MongoDB規則 
		collection.insert(datas, function (err) {
			// 存入失敗 
			if (err) {   
				console.log('DB insert Failed'); 
				return; 
			}
			// 存入成功 
			console.log('DB insert Saved'); 
		});

		collection.deleteMany({"name":"Apple"}, function (err) {
			// 存入失敗 
			if (err) {   
				console.log('DB delete Failed'); 
				return; 
			}
			// 存入成功 
			console.log('DB delete Saved'); 
		});
	});


// let find = function (err, students) {
//    for (let idx in students) {
//        let stu = student[idx];
//        console.log(stu.name);
// 	}
// }
// 定義查詢資料 
// student.find = find();
// 尋找分數大於60 
// student.find({ score: { $gt: 60 }}, find());
