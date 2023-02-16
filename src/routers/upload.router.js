const { Router } = require("express");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const uploadRouter = Router();

uploadRouter.get("/", [authenticate, authorize(["ADMIN"])]);

module.exports = uploadRouter;
