const chai = require('chai');
const chaiHttp = require('chai-http');
const baseUrlRoutes = 'http://localhost:3000';

const should = chai.should();
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(chaiHttp);

const myapp = require('../app.js');

let serverr

before(done => {
    serverr = myapp.listen(2000, done);
});

after(done => {
    serverr.close(done);
});


describe('Users', function() {
    describe('POST user register', function() {

        it('it should register a single user', function(done) {
            chai.request(myapp)
                .post('/user/register/userFormData')
                .send({
                    "FirstName": 'Jeson',
                    "MiddleName": '',
                    "LastName": 'Rai',
                    "Gender": 'male',
                    "Address": 'Gokarneshwor',
                    "DOB": '2019-06-17',
                    "Email": 'rai.riiibin1000@gmail.com',
                    "Phone": '+977-9817849333',
                    "Photo": 'asd.jpg',
                    "Password": 'asd'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    // res.body.should.have.property('message').eql('user data registered');
                    done();
                })

        })

        it('it should not register an already registered email', function(done) {
            chai.request(myapp)
                .post('/v1/users')
                .send({
                    "FirstName": 'Jeson',
                    "MiddleName": '',
                    "LastName": 'Rai',
                    "Gender": 'male',
                    "Address": 'Gokarneshwor',
                    "DOB": '2019-06-17',
                    "Email": 'rai.riibin1000@gmail.com',
                    "Phone": '+977-9817849333',
                    "Photo": 'asd.jpg',
                    "Password": 'asd'
                })
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.should.be.an('object');
                    // res.body.should.have.property('message');
                    done();
                })
        })
    })

    describe('PUT user', function() {
        userId = 84;
        it('it should edit the user with new values', function(done) {
            chai.request(myapp)
                .put('/user/edit/userProfileData')
                .send({
                    'FirstName': 'Marget',
                    'MiddleName': '',
                    'LastName': 'Rai',
                    'Address': 'Jorpati',
                    'DOB': '2019-06-19',
                    'Phone': '+977-9869251873',
                    'Id': 1
                })
                .end(function(err, res) {
                    res.should.have.status(500);
                    done()
                })
        })


    })
})


// /*
//  * Test the /GET route
//  */
// describe('users', () => {
//     describe('/GET users', () => {
//         it('it should GET all the users', (done) => {
//             // chai.request(baseUrlRoutes)
//             chai.request(myapp)
//                 .get('/user/list')
//                 .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaS5yaWJpbjEwMDBAZ21haWwuY29tIiwiYWNjZXNzTGV2ZWwiOiJzdXBlcnVzZXIiLCJpYXQiOjE1NjI1NTI4NTMsImV4cCI6MTU2MjU4ODg1M30.POs01WDCAZZ-fU0aSJ6xOvwLagTs17ZE-R_t7VqMFeg')
//                 .end((err, res) => {
//                     // console.log(err);
//                     // console.log(res);
//                     res.should.have.status(200);
//                     // res.body.should.be.an('array');
//                     res.body.should.all.have.property('id');
//                     res.body.should.all.have.property('email');
//                     res.body.should.all.have.property('address');
//                     res.body.should.all.have.property('dob');
//                     res.body.should.all.have.property('first_name');
//                     res.body.should.all.have.property('middle_name');
//                     res.body.should.all.have.property('last_name');
//                     res.body.should.all.have.property('phone');
//                     res.body.should.all.have.property('photo');
//                     res.body.should.all.have.property('user_type');
//                     res.body.length.should.be.above(0);
//                     done();
//                 });
//         });
//     });

// });

describe('users', () => {
    describe('/POST users', () => {
        it('it should GET all the users', (done) => {
            // chai.request(baseUrlRoutes)
            chai.request(myapp)
                .post('/user/search')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe('users', () => {
    describe('/POST login', () => {
        it('it should log in user', (done) => {
            // chai.request(baseUrlRoutes)
            chai.request(myapp)
                .post('/user/login')
                .send({
                    "email": 'rai.rai.ribin1000@gmail.com',
                    "password": 'asd',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
// expect(result).to.have.deep.property('[0].title', 'expected_title_1');