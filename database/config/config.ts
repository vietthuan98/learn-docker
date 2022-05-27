require("dotenv").config();

const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;
console.log(DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT);
module.exports = {
	development: {
		database: DB_NAME,
		username: DB_USER_NAME,
		password: DB_PASSWORD,
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql',
	},
}