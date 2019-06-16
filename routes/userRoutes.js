
module.exports = function(myapp){

	// register user
	// myapp.post('/user/register/userPhoto', upload.single('UserPhoto'), function(req, res){
 //        console.log('user photo route');
 //        res.status(201);
 //        res.send({
 //            "message": "user photo registered"
 //        })
 //    });

    // myapp.post('/user/register/userFormData', userController.userRegister, function(req, res){
    //     console.log('user register data route');
    //     res.status(200);
    //     res.send({
    //         "message": "user data registered"
    //     })
    // });

    myapp.get('/user/login', function(req, res){
        // res.render('login', {
        //     title: 'Express Login'
        // });
        console.log('user new route');
    });

    myapp.get('/user/dashboard', function(req, res){
        console.log('user new route');
    });


}