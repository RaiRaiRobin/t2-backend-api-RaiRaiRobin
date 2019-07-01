var usermodel = require('../models/userModel');
var adminmodel = require('../models/adminModel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



// match has passwod
function validator(req, res, next) {
    usermodel.findOne({

            where: {
                email: req.body.email
            }
        })
        // use had already registered
        .then(function(result) {
            // store the user's hash password obtained from database in a variable and pass it through req object
            req.userHashPassword = result.dataValues.password;
            req.userInfo = result.dataValues;
            // console.log(req.userInfo);
            next();
        })
        // err denotes the user was not found - > user was not registerd 
        .catch(function(err) {

            next({
                "status": 400,
                "message": "Please register first to login"
            })

        })
}

// check admin email for validation
function adminValidator(req, res, next) {
    adminmodel.findOne({
            where: {
                email: req.body.email
            }
        })
        // use had already registered
        .then(function(result) {
            // store the user's hash password obtained from database in a variable and pass it through req object
            req.userHashPassword = result.dataValues.password;
            req.userInfo = result.dataValues;
            // console.log(req.userInfo);
            next();
        })
        // err denotes the user was not found - > user was not registerd 
        .catch(function(err) {

            next({
                "status": 400,
                "message": "Unauthorized Access"
            })

        })
}


// check user token email
function tokenemailvalidator(req, res, next) {

    usermodel.findOne({

            where: {
                email: req.email
            }
        })
        // use had already registered
        .then(function(result) {
            // store the user's hash password obtained from database in a variable and pass it through req object
            // req.userHashPassword = result.dataValues.password;
            req.userInfoo = result.dataValues;
            // console.log(req.userInfo);
            next();
        })
        // err denotes the user was not found - > user was not registerd 
        .catch(function(err) {

            next({
                "status": 400,
                "message": "Invalid user token"
            })

        })
}

// check admin token email
function admintokenemailvalidator(req, res, next) {

    adminmodel.findOne({

            where: {
                email: req.email
            }
        })
        // use had already registered
        .then(function(result) {
            // store the user's hash password obtained from database in a variable and pass it through req object
            // req.userHashPassword = result.dataValues.password;
            req.adminInfoo = result.dataValues;
            // console.log(req.userInfo);
            next();
        })
        // err denotes the user was not found - > user was not registerd 
        .catch(function(err) {

            next({
                "status": 400,
                "message": "Invalid user token"
            })

        })
}


function checkPasswordMatch(req, res, next) {
    // comapre's first parameter password obtained from login form i.e. req.body.password
    // second parameter the value passed from previous function (from database) through req object
    bcrypt.compare(req.body.password, req.userHashPassword, function(err, res) {
        // res == true
        // console.log(res);
        if (res == true) {
            next();
        } else if (res == false) {
            next({
                "status": 400,
                "message": "Password does not match"
            });
        }
    });
}



function jwtTokenGen(req, res, next) {

    jwt.sign({
            email: req.body.email,
            accessLevel: 'superuser'
        }, 'thisissecretkey', {
            expiresIn: "10h"
        },

        function(err, token) {
            if (err != null || undefined) {
                console.log(err)
                next({
                    "status": 401,
                    "message": "Unauthorized token"
                })
            } else {
                req.genToken = token;
                next();
                // console.log(token)   
            }

        }
    );

}

function adminjwtTokenGen(req, res, next) {
    jwt.sign({
            email: req.body.email,
            accessLevel: 'superadmin'
        }, 'thisissecretkey', {
            expiresIn: "10h"
        },

        function(err, token) {
            if (err != null || undefined) {
                console.log(err)
                next({
                    "status": 401,
                    "message": "Unauthorized token"
                })
            } else {
                req.genToken = token;
                next();
                // console.log(token)   
            }
        }
    );
}


// verify token
function tokenVerify(req, res, next) {
    // console.log(req.headers);
    if (req.headers.authorization == undefined) {
        next({ status: 500, message: 'no authorization header present' })
    } else {
        let token = req.headers.authorization.slice(7, req.headers.authorization.length);
        // let token = req.headers.authorization;

        jwt.verify(token, 'thisissecretkey', function(err, decoded) {
            if (err != null) {
                next({ status: 500, message: err.message })
                // console.log(err);
            } else {
                req.email = decoded.email;
                req.accessLevel = decoded.accessLevel;
                next();
            }
        });
    }
}





module.exports = {
    validator,
    checkPasswordMatch,
    tokenemailvalidator,
    jwtTokenGen,
    tokenVerify,
    adminValidator,
    adminjwtTokenGen,
    admintokenemailvalidator
}