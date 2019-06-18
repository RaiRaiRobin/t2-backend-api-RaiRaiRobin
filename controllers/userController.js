var usermodel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var saltRounds = 10;

function userRegister(req, res, next) {
    // console.log(req.body);
    usermodel.create({
            first_name: req.body.FirstName,
            middle_name: req.body.MiddleName,
            last_name: req.body.LastName,
            gender: req.body.Gender,
            address: req.body.Address,
            dob: req.body.DOB,
            email: req.body.Email,
            phone: req.body.Phone,
            photo: req.body.Photo,
            password: req.hashValue
        })
        .then(function(result) {
            // console.log('data added');
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}



function query(req, res) {
    usermodel.findOne({
            where: { username: 'myuser' }
        })
        .then(function(result) {
            console.log(result.dataValues);
        })
        .catch(function(err) {

        })

    usermodel.findAll({
            where: { username: 'myuser' }
        })
        .then(function(result) {
            console.log(result[0].dataValues);
        })
        .catch(function(err) {

        })

    // usermodel.update(
    // 	{ password:'Robin'},
    // 	{where : {username: 'myuser'}}
    // 	)
    // .then(function(result){

    // })
    // .catch(function(err){

    // })

    // usermodel.destroy({
    // 	where:{username:'myuser'}
    // })
    // .then(function(result){

    // })
    // .catch(function(err){

    // })
}


// token
function token(req, res, next) {
    jwt.sign({ username: req.body.username, accesslevel: 'superadmin' }, 'thisissecretkey', { expiresIn: '10h' },
        function(err, token) {
            // console.log(token);
            if (err != null || undefined) {
                console.log(err);
                res.send({ "status": "401", "message": "unauthorized" });
            } else {
                req.genToken = token;
                // res.status(200);
                // res.json(token);
                next();
                console.log(token);
            }
        });
}


// email Check
function emailCheck(req, res, next) {
    usermodel.findOne({
            where: { email: req.body.Email }
        })
        .then(function(result) {
            console.log(result.dataValues);
            if (result.dataValues != '') {
                next({
                    "status": 409,
                    "message": "email already exists"
                });
            } else {
                next();
            }
        })
        .catch(function(err) {
            next({
                "status": 500,
                "message": "DB Error"
            });
        })
}



// has password
function passwordHash(req, res, next) {
    // req.body.Password
    bcrypt.hash(req.body.Password, saltRounds)
        .then(function(hash) {
            req.hashValue = hash;
            // console.log(req.hashValue);
            next();
        })
        .catch(function(err) {
            console.log(err);
        })

}




module.exports = {
    userRegister,
    query,
    token,
    emailCheck,
    passwordHash
}