const { Route } = require("../models");

const getAllRoutes = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const createRoute = async (req, res) => {
  try {
    const { start, end, stations } = req.body;
    const route = await Route.create({});
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

module.exports = {
  getAllRoutes,
  createRoute,
};
