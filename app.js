const express = require('express')
const cors = require('cors')
const writeLog = require('./src/middlewares/writeLog');
const rootRouter = require('./src/routers/root.router');
const app = express();

require('dotenv').config();

app.use(writeLog());//Customize write log middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}\public`));

app.use('/api/v1', rootRouter)

module.exports = app;


