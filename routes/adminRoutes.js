
module.exports = function(myapp){

    myapp.get('/admin/login', function(req, res){
        // res.render('login', {
        //     title: 'Express Login'
        // });
        console.log('admin new route');
    });

    myapp.get('/admin/dashboard', function(req, res){
        console.log('admin new route');
    });



}