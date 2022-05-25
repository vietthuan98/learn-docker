import { QueryInterface, DataTypes, literal, Sequelize } from 'sequelize';

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING(255),
			},
			phone: {
				type: DataTypes.STRING(20),
			},
			email: {
				type: DataTypes.STRING(255),
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: literal('CURRENT_TIMESTAMP'),
			},
			createdBy: {
				type: DataTypes.INTEGER.UNSIGNED,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: literal('CURRENT_TIMESTAMP'),
			},
			updatedBy: {
				type: DataTypes.INTEGER.UNSIGNED,
			},
			deletedAt: {
				type: DataTypes.INTEGER.UNSIGNED,
			},
		});
		await queryInterface.addIndex('users', ['phone']);
		await queryInterface.addIndex('users', ['email']);
		await queryInterface.addIndex('users', ['phone', 'email']);
		await queryInterface.sequelize.query('CREATE TRIGGER before_update_user BEFORE UPDATE ON users FOR EACH ROW SET NEW.updatedAt = NOW()')
	},
	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable('users');
		await queryInterface.removeIndex('users', ['phone']);
		await queryInterface.removeIndex('users', ['email']);
		await queryInterface.removeIndex('users', ['phone', 'email']);
		await queryInterface.sequelize.query('DROP TRIGGER before_update_user')
	}
};