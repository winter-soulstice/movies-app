import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); */

import db from './db';
import router from './routes';
/* const db = require('./db');
const router = require('./routes/movie-router'); */

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Connection error to MongoDB'));

app.get('/', (req, res) => {
  res.send('Goodbye World!');
});

app.use('/api', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
