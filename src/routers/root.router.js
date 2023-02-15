const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);

module.exports = rootRouter;
