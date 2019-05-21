var express = require('express');
var myapp = new express();
var bodyParser = require('body-parser');



//this is the first middleware - application middleware , all routes hit this middleware first
application.use(function(req,res,next){

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
	next(); // next passes to another application middleware 
});



myapp.listen(3000);