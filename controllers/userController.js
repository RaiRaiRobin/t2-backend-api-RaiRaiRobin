var usermodel = require('../models/userModel');
var jwt = require('jsonwebtoken');

function userRegister(req,res, next){
	usermodel.create({
	username:req.body.firstName,
	password:req.body.password,
	userphoto:'myphoto',
	})
	.then(function(result){
		console.log('table createdddd');
		next();
	})
	.catch(function(err){
		console.log(err);
	})	
}

function query(req,res){
		usermodel.findOne({
	where:{username:'myuser'}
})
.then(function(result){
	console.log(result.dataValues);
})
.catch(function(err){

})

usermodel.findAll({
	where:{username:'myuser'}
})
.then(function(result){
	console.log(result[0].dataValues);
})
.catch(function(err){
	
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
function token(req, res,next){
		jwt.sign({username:req.body.username, accesslevel:'superadmin'},'thisissecretkey',{expiresIn:'10h'}, 
			function(err,token){
				// console.log(token);
				if (err !=null || undefined) {
				console.log(err);
				res.send({"status":"401", "message":"unauthorized"});
				}
				else{
					req.genToken=token;
					// res.status(200);
					// res.json(token);
					next();
					console.log(token);
				}
			});
	}



module.exports={
	userRegister, query, token
}