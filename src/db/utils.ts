import { pool } from 'db';
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection';

type IMySqlResponse = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export function query(sql: string, placeholders: any[] = [], connection = pool): Promise<IMySqlResponse> {
	return new Promise((resolve, reject) => {
		connection.query(sql, placeholders, (error, results) => {
			if (error) reject(error);
			resolve(results);
		})
	});
};

export function getConnection() {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) reject(error);
			resolve(connection);
		});
	});
};

export function beginTransaction(connection: PoolConnection) {
	return new Promise((resolve, reject) => {
		connection.beginTransaction((error) => {
			if (error) reject();
			resolve(true);
		})
	});
};

export function commit(connection: PoolConnection) {
	return new Promise((resolve, reject) => {
		connection.commit((error) => {
			if (error) reject();
			resolve(true);
		});
	});
}

export function rollback(connection: PoolConnection) {
	return new Promise((resolve) => {
		connection.rollback(() => resolve(true));
	});
}