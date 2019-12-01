import { Client } from 'pg';

export async function query(qry: string, params?: string[]) {
	const client = new Client({
		database: 'urlshortener',
		password: 'password',
		user: 'postgres',
	});
	await client.connect();
	const res = await client.query(qry, params);
	await client.end();
	return res;
}
