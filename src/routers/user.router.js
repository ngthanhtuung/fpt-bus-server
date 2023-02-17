const { Router } = require("express");
const { findAllUser } = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const { checkDataCache } = require("../middlewares/cache/checkDataCache.middleware");

const userRouter = Router();

userRouter.get("/:key", [checkDataCache], findAllUser);

module.exports = userRouter;
