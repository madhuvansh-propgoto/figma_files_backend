const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());          // add this
app.use(express.json());

app.use('/api', router);

module.exports = app;