
const { Router } = require("express");
const authRouter = require("./auth.router");
const uploadRouter = require("./upload.router");
const userRouter = require("./user.router");
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/upload-file", uploadRouter);

module.exports = rootRouter;
