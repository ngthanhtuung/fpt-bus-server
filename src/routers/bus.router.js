const { Router } = require("express");
const {
  createBus,
  getAllBus,
  updateBus,
  changeStatus,
  getABus,
} = require("../controllers/bus.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const busRouter = Router();

busRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllBus);
busRouter.get("/:id", [authenticate, authorize(["ADMIN"])], getABus);
busRouter.post("/create", [authenticate, authorize(["ADMIN"])], createBus);
busRouter.post("/update/:id", [authenticate, authorize(["ADMIN"])], updateBus);
busRouter.post(
  "/change-status/:id",
  [authenticate, authorize(["ADMIN"])],
  changeStatus
);

module.exports = busRouter;
