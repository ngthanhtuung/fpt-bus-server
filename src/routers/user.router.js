const { Router } = require("express");
const { auth } = require("firebase-admin");
const {
  findAllUser,
  findUserByRole,
} = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  checkDataCache,
} = require("../middlewares/cache/checkDataCache.middleware");

const userRouter = Router();

userRouter.get("/search", [authenticate, authorize(["ADMIN"])], findUserByRole);
userRouter.get(
  "/:key",
  [authenticate, authorize(["ADMIN"])],
  checkDataCache,
  findAllUser
);

module.exports = userRouter;
