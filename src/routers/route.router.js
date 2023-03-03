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
} = require("../controllers/route.controller");

const routeRouter = Router();

routeRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllRoutes);
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
