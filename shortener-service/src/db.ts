import { Client } from 'pg';

const client = new Client({
	database: 'urlshortener',
	password: 'password',
	user: 'postgres',
});

export async function query(qry: string, params: string[]) {
	await client.connect();
	const res = await client.query(qry, params);
	await client.end();
	return res;
}
