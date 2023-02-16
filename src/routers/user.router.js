const { Router } = require("express");
const { findAllUser } = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const userRouter = Router();

userRouter.get("/", [authenticate, authorize(["ADMIN"])], findAllUser);

module.exports = userRouter;
