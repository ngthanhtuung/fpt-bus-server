const express = require("express");
const cors = require("cors");
const writeLog = require("./src/middlewares/writeLog");
const docs = require("./src/config/docs");
const swaggerUi = require("swagger-ui-express");
const rootRouter = require("./src/routers/root.router");
const cron = require("node-cron");
const { expiredTrip } = require("./src/controllers/trip.controller");

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["*"],
};

require("dotenv").config();
app.use(writeLog()); //Customize write log middleware
app.use(cors(corsOpts));
app.use(express.json({ limit: "900mb" }));
app.use(express.urlencoded({ limit: "900mb", extended: true }));
app.use(express.static(`${__dirname}\public`));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(docs, { explorer: true })
);

cron.schedule('0 0 * * *', () => {
  expiredTrip();
});

app.use("/api/v1", rootRouter);

module.exports = app;
