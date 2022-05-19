require("dotenv").config();
import mysql from 'mysql2';
export * from './utils';

const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT = '', DB_CONNECTION_LIMIT = 250 } = process.env;

const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER_NAME,
	database: DB_NAME,
	port: +DB_PORT,
	password: DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: +DB_CONNECTION_LIMIT,
});

export let currentDBConnections = 0;

pool.on('acquire', () => {
	currentDBConnections += 1;
});


pool.on('release', () => {
	currentDBConnections -= 1;
});

export { pool };