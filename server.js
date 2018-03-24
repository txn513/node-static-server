const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


http.createServer(function(req,res){
	// console.log('the server is running');
	let urlObj = url.parse(req.url);
	let pathname = urlObj.pathname;
	let ext = path.extname(pathname);
	// console.log(ext);

	if(pathname == '/'){
		pathname = '/index.html';
		ext = '.html';
	}


	readMIME(function(mime){
		fs.readFile('./static'+pathname,function(err,data){
			if(err){
				res.writeHead(404,{'content-type': 'text/html; charset=utf8'});
				res.end('404');
				return;
			}
			console.log(data);
			res.writeHead(200,{'content-type': mime[ext] +'; charset=utf8'});
			res.end(data);

		});
	});
	// if(mime){
	// 	console.log(mime);
	// 	fs.readFile('./static'+pathname,'utf8',function(err,data){
	// 		if(err){
	// 			res.writeHead(404,{'content-type': 'text/html; charset=utf8'});
	// 			res.end('404');
	// 			return;
	// 		}
	// 		console.log(data);
	// 		res.writeHead(200,{'content-type': + mime[ext] +'; charset=utf8'});
	// 		res.end(data);

	// 	});
	// }
	
	
}).listen(3000);


function readMIME(callback) {
	fs.readFile('./mime.json','utf8',function(err,data){
		if(err) throw err;
		callback(JSON.parse(data));
	})
}