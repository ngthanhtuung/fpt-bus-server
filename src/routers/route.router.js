const { Router } = require("express");
const { getAllRoute } = require("../controllers/route.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const routeRouter = Router();

routeRouter.get("/", [authenticate, authorize(["ADMIN"])], getAllRoute);

module.exports = routeRouter;
