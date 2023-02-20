const { Router } = require("express");
const { createBus, getAllBus } = require("../controllers/bus.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const busRouter = Router();

busRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllBus);
busRouter.post("/create", [authenticate, authorize(["ADMIN"])], createBus);

module.exports = busRouter;
