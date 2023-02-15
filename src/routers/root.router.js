
const { Router } = require("express");
const userRouter = require("./user.router");
const rootRouter = Router();
rootRouter.use("/users", userRouter);

module.exports = rootRouter;
