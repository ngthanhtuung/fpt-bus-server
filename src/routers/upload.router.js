const { Router } = require("express");
const { uploadFile } = require("../controllers/upload.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const uploadRouter = Router();

uploadRouter.post("/", [], uploadFile);

module.exports = uploadRouter;
