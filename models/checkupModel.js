var mysequelize = require('../configs/dbconfigs')
const myUsers = mysequelize.sequelize.define('myUsers',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},

	patient_id: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false
	},

	name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	blood_pressure: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	body_temperature: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	sugar_level: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	bmi: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	cholesterol_level: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},

	prescription: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true
	},

	description: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true
	}

},

{
	freezeTableName : true,
	tableName: 'checkup'
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