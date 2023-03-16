const { Router } = require("express");
const authRouter = require("./auth.router");
const notiRouter = require("./notification.router");
const uploadRouter = require("./upload.router");
const userRouter = require("./user.router");
const busRouter = require("./bus.router");
const stationRouter = require("./station.router");
const routeRouter = require("./route.router");
const tripRouter = require("./trip.router");
const ticketRouter = require("./ticket.router");
const checkInRouter = require("./checkin.router");
const payRouter = require("./payment.router");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/upload-file", uploadRouter);
rootRouter.use("/notification", notiRouter);
rootRouter.use("/bus", busRouter);
rootRouter.use("/station", stationRouter);
rootRouter.use("/route", routeRouter);
rootRouter.use("/trip", tripRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/ticket", ticketRouter);
rootRouter.use("/payment", payRouter);

module.exports = rootRouter;
