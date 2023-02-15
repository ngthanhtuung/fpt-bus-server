const express = require("express");
const cors = require("cors");
const writeLog = require("./src/middlewares/writeLog");
const docs = require("./src/config/docs");
const swaggerUi = require("swagger-ui-express");
const rootRouter = require("./src/routers/root.router");
const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "UPDATE", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

require("dotenv").config();
app.use(writeLog()); //Customize write log middleware
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}\public`));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(docs, { explorer: true })
);

app.use("/api/v1", rootRouter);

module.exports = app;
