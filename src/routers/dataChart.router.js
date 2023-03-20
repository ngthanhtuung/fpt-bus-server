const { Router } = require("express");
const { getDataChart } = require("../controllers/dataChart.controller");
const { authenticate, authorize } = require("../middlewares/auth/verify-token.middleware");

const dataChartRouter = Router();

dataChartRouter.get("/chart", [authenticate, authorize(["ADMIN"])], getDataChart)
module.exports = dataChartRouter;