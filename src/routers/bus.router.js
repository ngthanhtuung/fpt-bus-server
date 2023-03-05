const { Router } = require("express");
const {
  createBus,
  getAllBus,
  updateBus,
  changeStatus,
} = require("../controllers/bus.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const busRouter = Router();

busRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllBus);
busRouter.post("/create", [authenticate, authorize(["ADMIN"])], createBus);
busRouter.put("/update/:id", [authenticate, authorize(["ADMIN"])], updateBus);
busRouter.put(
  "/change-status/:id",
  [authenticate, authorize(["ADMIN"])],
  changeStatus
);

module.exports = busRouter;
