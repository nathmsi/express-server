const express = require('express');

const authRoute = require('./routes/authRoute');
const candidatesRoute = require('./routes/candidatesRoute');

const api = express();


api.use('/auth', authRoute);
api.use('/candidates', candidatesRoute);


module.exports = api