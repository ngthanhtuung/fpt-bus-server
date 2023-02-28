const { Router } = require("express");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  getAllRoutes,
  createRoute,
} = require("../controllers/route.controller");

const routeRouter = Router();

routeRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllRoutes);
routeRouter.post("/create", [authenticate, authorize(["ADMIN"])], createRoute);

module.exports = routerRouter;
