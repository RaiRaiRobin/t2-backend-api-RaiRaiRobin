var express = require('express');
var myapp = new express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');



//this is the first middleware - application middleware , all routes hit this middleware first
myapp.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
	next(); // next passes to another application middleware 
});


// bodyParser
myapp.use(bodyParser.json());	
myapp.use(bodyParser.urlencoded({extended:true}));


// path
myapp.use(express.static(
	path.join(__dirname, '/public')
	));


// sequelize
var mysequelize = require('./configs/dbconfigs.js');




// routes
var adminRoutes = require('./routes/adminRoutes')(myapp);
var userRoutes = require('./routes/userRoutes')(myapp);



// set port
myapp.listen(3000);