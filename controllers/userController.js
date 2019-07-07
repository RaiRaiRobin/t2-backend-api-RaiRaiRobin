var usermodel = require('../models/userModel');
var checkupmodel = require('../models/checkupModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var saltRounds = 10;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
            req.body.email = req.body.Email;
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

function userRegisterr(req, res, next) {
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
            user_type: req.body.UserType,
            password: req.hashValue
        })
        .then(function(result) {
            // console.log('data added');
            req.body.email = req.body.Email;
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}


// user Edit
function userEdit(req, res, next) {
    console.log(req.body);
    if (req.body.imageName == '') {
        usermodel.update({
                first_name: req.body.FirstName,
                middle_name: req.body.MiddleName,
                last_name: req.body.LastName,
                address: req.body.Address,
                dob: req.body.DOB,
                phone: req.body.Phone,
            }, {
                where: { id: req.body.Id }
            })
            .then(function(result) {
                // console.log('data added');
                next();
            })
            .catch(function(err) {
                next({ "status": 500, "message": "DB Error" });
            })
    } else {
        usermodel.update({
                first_name: req.body.FirstName,
                middle_name: req.body.MiddleName,
                last_name: req.body.LastName,
                address: req.body.Address,
                dob: req.body.DOB,
                phone: req.body.Phone,
                photo: req.body.imageName
            }, {
                where: { id: req.body.Id }
            })
            .then(function(result) {
                // console.log('data added');
                var fs = require('fs');
                fs.unlinkSync('./resources/images/profile/' + req.body.oldImageName);
                next();
            })
            .catch(function(err) {
                next({ "status": 500, "message": "DB Error" });
            })
    }
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
    //  { password:'Robin'},
    //  {where : {username: 'myuser'}}
    //  )
    // .then(function(result){

    // })
    // .catch(function(err){

    // })

    // usermodel.destroy({
    //  where:{username:'myuser'}
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
    var photo = req.body.Photo;
    usermodel.findOne({
            where: { email: req.body.Email }
        })
        .then(function(result) {
            if (result.dataValues != '') {
                var fs = require('fs');
                fs.unlinkSync('./resources/images/profile/' + photo);
                next({
                    "status": 409,
                    "message": "Email already exists"
                });
            }
        })
        .catch(function(result) {
            next();
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


// get all user list
function getAllUserList(req, res, next) {
    usermodel.findAll({
            // where: { username: 'myuser' }
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.allUser = result;
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// get all patient list
function getAllPatientList(req, res, next) {
    usermodel.findAll({
            where: { user_type: 'patient' },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.allUser = result;
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// get patient info
function getPatientinfo(req, res, next) {
    // console.log(req.params.id);
    usermodel.findAll({
            where: { id: req.params.id },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.allUser = result;
            // console.log(req.allUser);
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// get doctor info
function getDoctorinfo(req, res, next) {
    // console.log(req.params.id);
    usermodel.findAll({
            where: { user_type: 'doctor' },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.allUser = result;
            // console.log(req.allUser);
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// get doctor info
function getNurseinfo(req, res, next) {
    // console.log(req.params.id);
    usermodel.findAll({
            where: { user_type: 'nurse' },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.allUser = result;
            // console.log(req.allUser);
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}


function searchUser(req, re, next) {
    // console.log(req.body.search);
    var search = req.body.search
    usermodel.findAll({
            where: {
                first_name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.User = result;
            // console.log(req.allUser);
            next();
            // console.log(result);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// delete user
function deleteUser(req, res, next) {
    // console.log(req.params.id);
    usermodel.destroy({
            where: {
                id: req.params.id
            },
            raw: true
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

// get User Detail
function getUserDetail(req, res, next) {
    // console.log(req.params.id);
    usermodel.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })
        .then(function(result) {
            req.allUser = result
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

function checkupNurse(req, res, next) {
    // console.log(req.body);
    checkupmodel.create({
            blood_pressure: req.body.BloodPressure,
            body_temperature: req.body.Temperature,
            sugar_level: req.body.Sugar,
            bmi: req.body.BMI,
            cholesterol_level: req.body.Cholesterol,
            patient_id: req.body.Id,
            name: req.body.Name
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

function getCheckupListDoctor(req, res, next){
    checkupmodel.findAll({
            where: {
                prescription: null 
            },
            raw: true
        })
        .then(function(result) {
            // console.log(result[1].dataValues);
            req.User = result;
            // console.log(req.allUser);
            next();
            // console.log(result[0]);
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" });
        })
}

function checkupDoctor(req, res, next){
    checkupmodel.update({
                prescription: req.body.Prescription,
                description: req.body.Description,
            }, {
                where: { id: req.body.Id }
            })
            .then(function(result) {
                // console.log('data added');
                next();
            })
            .catch(function(err) {
                next({ "status": 500, "message": "DB Error" });
            })
}

module.exports = {
    userRegister,
    userEdit,
    query,
    token,
    emailCheck,
    passwordHash,
    getAllUserList,
    getAllPatientList,
    getPatientinfo,
    getDoctorinfo,
    getNurseinfo,
    searchUser,
    userRegisterr,
    deleteUser,
    getUserDetail,
    checkupNurse,
    getCheckupListDoctor,
    checkupDoctor
}