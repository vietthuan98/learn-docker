import { QueryInterface } from 'sequelize';

const users = [...Array(10)].map((_, index) => ({
	name: 'User' + index,
	email: 'email' + index + '@gmail.com',
	phone: '0987656782'
}));

module.exports = {
	up: (queryInterface: QueryInterface) => {
		return queryInterface.bulkInsert('users', users);
	},
	down: (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('users', {});
	}
};