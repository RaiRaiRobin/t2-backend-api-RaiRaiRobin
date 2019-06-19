var usermodel = require('../models/userModel');
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
            req.userHashPassword = result.dataValues.password
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


function checkPasswordMatch(req, res, next) {
    // comapre's first parameter password obtained from login form i.e. req.body.password
    // second parameter the value passed from previous function (from database) through req object
    bcrypt.compare(req.body.password, req.userHashPassword)
        .then(function(result) {
            // next();
            console.log("password matched");
            console.log(req.body.password);
            console.log(req.userHashPassword);
            // console.log(bcrypt.compare(req.body.password, req.userHashPassword));
            next();

        })
        .catch(function(err) {
            console.log("password didn't matched");
            next({
                "status": 400,
                "message": "Password Doesnot match"
            });
        })
}



function jwtTokenGen(req, res, next) {

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
    )

}





module.exports = {
    validator,
    checkPasswordMatch,
    jwtTokenGen
}