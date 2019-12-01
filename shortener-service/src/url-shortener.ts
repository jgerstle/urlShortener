import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { v4 } from 'uuid';

const app = express();
const port = 5000; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get('/:id', (req, res) => {
	res.redirect(map[req.params.id]);
});
const map: { [key: string]: string } = {};
app.post('/shorten-url', async (req, res, next) => {
	const uuid = v4();
	map[uuid] = req.body.url;
	res.send({ id: uuid });
});

app.get('/original-url/:url', (req, res, next) => {
	res.send({ url: map[req.params.url] });
});

// start the Express server
app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${ port }`);
});
