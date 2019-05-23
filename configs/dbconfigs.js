var Sequelize = require('sequelize');
var sequelize = new Sequelize('node', 'root', '2', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false
});
sequelize.authenticate()
.then(function(){
	console.log('db successfully connected');
})
.catch(function(err){
	console.log(err);
})
console.log('I am here');

module.exports = {
	sequelize,
	Sequelize
}