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
    )

}





module.exports = {
    validator,
    checkPasswordMatch,
    jwtTokenGen
}