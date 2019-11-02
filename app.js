import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';
import router from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});