const { Router } = require("express");
const authRouter = require("./auth.router");
const notiRouter = require("./notification.router");
const uploadRouter = require("./upload.router");
const userRouter = require("./user.router");
const busRouter = require("./bus.router");
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/upload-file", uploadRouter);
rootRouter.use("/notification", notiRouter);
rootRouter.use("/bus", busRouter);

module.exports = rootRouter;
