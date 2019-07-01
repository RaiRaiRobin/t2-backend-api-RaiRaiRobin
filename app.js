var express = require('express');
var myapp = new express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');


//this is the first middleware - application middleware , all routes hit this middleware first
myapp.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next(); // next passes to another application middleware 
});


// bodyParser
myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({ extended: true }));


// path
myapp.use(express.static(
    path.join(__dirname, '/resources')
));


// sequelize
var mysequelize = require('./configs/dbconfigs.js');
var mysequelize = require('./models/userModel.js');
var mysequelize = require('./models/adminModel.js');



// multer storage
var mystorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resources/images/profile')
    },
    filename: function(req, file, cb) {
        var name = 'asdasd' + (Math.floor(100000 + Math.random() * 900000)) + file.originalname;
        cb(null, name);
        // console.log(name);
        req.testVall = name;
    }
});
var upload = multer({ storage: mystorage });


// controllers require
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');


// routes
var adminRoutes = require('./routes/adminRoutes')(myapp);
var userRoutes = require('./routes/userRoutes')(myapp);


// upload register profile photo
myapp.post('/user/register/userPhoto', upload.single('UserPhoto'), function(req, res) {
    // console.log(req.testVall);
    // res.status(200);
    res.send({
        "status": 200,
        "message": "user photo registered",
        "name": req.testVall
    })
});

// register form data
myapp.post('/user/register/userFormData', userController.emailCheck, userController.passwordHash, userController.userRegister, authController.jwtTokenGen, function(req, res) {
    // console.log('user register data route');
    // res.status(200);
    res.send({
        "status": 201,
        "message": "user data registered",
        "token": req.genToken
    })
});


// user edit route
myapp.put('/user/edit/userProfileData', authController.tokenVerify, authController.tokenemailvalidator, userController.userEdit, authController.tokenemailvalidator, function(req, res) {
    // console.log('user register data route');
    // res.status(200);
    res.send({
        "status": 201,
        "message": "User data updated",
        "info": req.userInfoo
    })
});


// user login route
myapp.post('/user/login', authController.validator, authController.checkPasswordMatch, authController.jwtTokenGen, function(req, res) {
    // res.status(200);
    res.send({
        "status": 200,
        "message": "User logged in",
        "token": req.genToken,
        "info": req.userInfo
    })
});

// admin login route 
myapp.post('/admin/login', authController.adminValidator, authController.checkPasswordMatch, authController.adminjwtTokenGen, function(req, res) {
    // res.status(200);
    res.send({
        "status": 200,
        "message": "Admin logged in",
        "token": req.genToken,
        "info": req.userInfo
    })
});


// verify user token
myapp.post('/token/verify', authController.tokenVerify, authController.tokenemailvalidator, function(req, res) {
    res.send({
        "status": 201,
        "message": "Token Verified",
        "info": req.userInfoo
    })
});

// verify admin token
myapp.post('/admin/token/verify', authController.tokenVerify, authController.admintokenemailvalidator, function(req, res) {
    res.send({
        "status": 201,
        "message": "Token Verified",
        "info": req.adminInfoo
    })
});



// get all user list route
myapp.get('/user/list', authController.tokenVerify, authController.tokenemailvalidator, userController.getAllUserList, function(req, res) {
    res.send({
        "status": 201,
        "message": "User data fetched",
        "allUser": req.allUser
    })
});

// get all users list route for admin
myapp.get('/admin/list', authController.tokenVerify, authController.admintokenemailvalidator, userController.getAllUserList, function(req, res) {
    res.send({
        "status": 201,
        "message": "User data fetched",
        "allUser": req.allUser
    })
});

// get all patients list route for admin
myapp.get('/admin/patients/list', authController.tokenVerify, authController.admintokenemailvalidator, userController.getAllPatientList, function(req, res) {
    res.send({
        "status": 201,
        "message": "Users data fetched",
        "allUser": req.allUser
    })
});

// get all doctors list route for admin
myapp.get('/admin/doctors/list', authController.tokenVerify, authController.admintokenemailvalidator, userController.getDoctorinfo, function(req, res) {
    res.send({
        "status": 201,
        "message": "Doctors data fetched",
        "allUser": req.allUser
    })
});

// get all nurses list route for admin
myapp.get('/admin/nurses/list', authController.tokenVerify, authController.admintokenemailvalidator, userController.getNurseinfo, function(req, res) {
    res.send({
        "status": 201,
        "message": "Nurses data fetched",
        "allUser": req.allUser
    })
});

// get patient info route for admin
myapp.get('/admin/user/info/:id', authController.tokenVerify, authController.admintokenemailvalidator, userController.getPatientinfo, function(req, res) {
    // console.log(req.allUser);
    res.send({
        "status": 201,
        "message": "User info fetched",
        "userInfo": req.allUser
    })
}); 







myapp.use(function(err, req, res, next) {

    // console.log(err.status);
    // console.log(err.message);
    console.log(err);
    res.status(err.status);
    res.send({
        "message": err.message
    })


})



// set port
myapp.listen(3000);



module.exports = myapp;