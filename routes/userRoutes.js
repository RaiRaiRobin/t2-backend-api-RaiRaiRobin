
module.exports = function(myapp){

	// register user
	myapp.post('/user/register', function(req, res){
        console.log('user new route');
    });

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