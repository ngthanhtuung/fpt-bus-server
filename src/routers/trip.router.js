const { Router } = require("express");
const {
  createTrip,
  getAllTrip,
  changeStatus,
  updateTrip,
  getTripToday,
  getAllTripById
} = require("../controllers/trip.controller");
const {
  authenticate,
  authorize
} = require("../middlewares/auth/verify-token.middleware");

const {
  checkDataCache
} = require("../middlewares/cache/checkDataCache.middleware");
const tripRouter = Router();

tripRouter.get("/:key", [authenticate, checkDataCache], getTripToday);
tripRouter.get("/", [authenticate], getAllTrip);
tripRouter.get("/search/:tripId", [authenticate], getAllTripById)
tripRouter.post("/create", [authenticate, authorize(["ADMIN"])], createTrip);
tripRouter.put("/update/:id", [], updateTrip);
tripRouter.put(
  "/change-status/:id",
  [authenticate, authorize(["ADMIN", "DRIVER"])],
  changeStatus
);

module.exports = tripRouter;
