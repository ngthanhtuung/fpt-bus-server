const { Router } = require("express");
const { createTrip, getAllTrip } = require("../controllers/trip.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const tripRouter = Router();

tripRouter.get("/", [authenticate], getAllTrip);
tripRouter.post("/create", [authenticate, authorize(["ADMIN"])], createTrip);

module.exports = tripRouter;
