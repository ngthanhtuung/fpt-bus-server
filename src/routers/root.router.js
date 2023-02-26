const { Router } = require("express");
const authRouter = require("./auth.router");
const notiRouter = require("./notification.router");
const uploadRouter = require("./upload.router");
const userRouter = require("./user.router");
const busRouter = require("./bus.router");
const stationRouter = require("./station.router");
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/upload-file", uploadRouter);
rootRouter.use("/notification", notiRouter);
rootRouter.use("/bus", busRouter);
rootRouter.use("/station", stationRouter);

module.exports = rootRouter;
