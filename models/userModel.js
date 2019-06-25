var mysequelize = require('../configs/dbconfigs')
const myUsers = mysequelize.sequelize.define('myUsers',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},

	first_name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	middle_name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true
	},

	last_name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	gender: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	address: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	dob: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	phone: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	photo: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	user_type: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false,
		defaultValue : "patient"
	},

	password: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	}

},

{
	freezeTableName : true,
	tableName: 'users'
}

)

myUsers.sync({force:false})
// .then(function(){
// console.log('users table created')
// })
// .catch(function(){
// 	console.log('err creating table')
// })

module.exports = myUsers;