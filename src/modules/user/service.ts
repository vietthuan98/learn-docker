import { logError } from '@/helpers/logger';
import { ICreateUser } from '@/modules/user/types';
import { pool, query } from 'db';
import { ResultSetHeader } from 'mysql2';

export async function getUserById(id: number) {
	try {
		const sql = 'SELECT * FROM users WHERE id = ?';
		return await query(sql, [id]);
	} catch (error) {
		logError('getUserById', error);
		throw error;
	}
}

export async function createUserToMysql(data: ICreateUser) {
	try {
		const sql = 'INSERT INTO users SET ?';
		const result = await query(sql, [data]);
		const insertId = (result as ResultSetHeader).insertId;
		return await getUserById(insertId);
	} catch (error) {
		logError('createUserToMysql', error);
		throw error;
	}
}