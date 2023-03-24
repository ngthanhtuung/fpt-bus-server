const { Router } = require("express");

const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const {
  getAllRoutes,
  createRoute,
  updateRoute,
  changeStatus,
  getRouteById,
  countRouteOfStation
} = require("../controllers/route.controller");

const routeRouter = Router();

routeRouter.get("/", [authenticate, authorize(["ADMIN", "STUDENT"])], getAllRoutes);
routeRouter.get("/total/distances/:idRoute", [], countRouteOfStation);
routeRouter.get("/:routeId", [authenticate], getRouteById);
routeRouter.post("/create", [authenticate, authorize(["ADMIN"])], createRoute);
routeRouter.put(
  "/update/:id",
  [authenticate, authorize(["ADMIN"])],
  updateRoute
);

routeRouter.put("/change-status/:id", [
  authenticate,
  authorize(["ADMIN"]),
  changeStatus,
]);

module.exports = routeRouter;
