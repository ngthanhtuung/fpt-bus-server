const express = require('express')
const cors = require('cors')
const writeLog = require('./src/middlewares/writeLog');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const rootRouter = require('./src/routers/root.router');
const options = require('./src/configs/swaggerConfig');
const specs = swaggerJsdoc(options)
const app = express();
require('dotenv').config();
app.use(writeLog());//Customize write log middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}\public`));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ explorer: true })
);
app.use('/api/v1', rootRouter)

module.exports = app;


