const { Router } = require("express");
const { auth } = require("firebase-admin");
const { findAllUser, createUser } = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const userRouter = Router();

userRouter.get("/", [authenticate, authorize(["ADMIN"])], findAllUser);
userRouter.post("/create", [authenticate, authorize(["ADMIN"])], createUser);

module.exports = userRouter;
