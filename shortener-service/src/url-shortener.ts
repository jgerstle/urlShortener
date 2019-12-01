import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { v4 } from 'uuid';
import { query } from './db';

const app = express();
const port = 5000; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getUrl(id: string) {
	const ret = await query('SELECT url FROM url WHERE uuid = $1', [id]);
	return ret.rows[0].url;
}

// define a route handler for the default home page
app.get('/:id', async (req, res) => {
	const url = await getUrl(req.params.id);
	res.redirect(url);
});
app.post('/shorten-url', async (req, res, next) => {
	const uuid = v4();
	await query('INSERT INTO url (url, uuid) VALUES ($1, $2)', [req.body.url, uuid]);
	res.send({ id: uuid });
});

app.get('/original-url/:url', async (req, res, next) => {
	const ret = await query('SELECT url FROM url WHERE uuid = $1', [req.params.url]);
	res.send({ url: ret.rows[0].url });
});

// start the Express server
app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${ port }`);
});
