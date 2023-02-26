const { Router } = require("express");
const {
  getAllStation,
  createStation,
  updateStation,
  changeStatusStation,
} = require("../controllers/station.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const stationRouter = Router();

stationRouter.get(
  "/",
  [authenticate, authorize(["ADMIN", "STUDENT"])],
  getAllStation
);

stationRouter.post(
  "/create",
  [authenticate, authorize(["ADMIN"]), createStation],
  createStation
);

stationRouter.post("/update/:id", [
  authenticate,
  authorize(["ADMIN"]),
  updateStation,
]);

stationRouter.post(
  "/change-status/:id",
  [authenticate, authorize(["ADMIN"])],
  changeStatusStation
);

module.exports = stationRouter;
