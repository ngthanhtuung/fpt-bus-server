const { Route, Station, sequelize } = require("../models");
const currentDate = require("../utils/currentDate");
const { v4: uuid } = require("uuid");

const getStationsBelongToRoute = async (routeId) => {
  try {
    const stations = await sequelize.query(
      `
      SELECT S.* 
      FROM Station S INNER JOIN Route_Stations RS ON S.id = RS.station_id
      WHERE RS.route_id = '${routeId}'
      ORDER BY RS.station_index ASC;      
      `
    );
    return stations;
  } catch (err) {
    return null;
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll({});
    const routesWithStations = await Promise.all(
      routes.map(async (route) => {
        const stations = await getStationsBelongToRoute(route.id);
        return {
          id: route.id,
          departure: route.departure,
          destination: route.destination,
          status: route.status,
          stations: stations[0],
        };
      })
    );
    res.status(200).json({
      status: "Success",
      message: "Get all route successfully",
      data: routesWithStations,
    });
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
    const startName = (await Station.findByPk(start)).station_name;
    const endName = (await Station.findByPk(end)).station_name;

    const route = await Route.create({
      id: uuid(),
      departure: startName,
      destination: endName,
      status: true,
      createdAt: currentDate(),
      updatedAt: currentDate(),
    });

    for (let i = 0; i < stations.length; i++) {
      console.log("Station: ", stations[i]);
      await sequelize.query(` 
        INSERT INTO Route_Stations(route_id, station_id, station_index, createdAt, updatedAt)
        VALUES("${route.id}","${stations[i]}", ${
        i + 1
      }, "${currentDate()}", "${currentDate()}")    
      `);
    }

    route.stations = [];
    const routesWithStations = await getStationsBelongToRoute(route.id);
    route.stations.push(routesWithStations[0]);

    res.status(201).json({
      status: "Success",
      message: "Route created successfully",
      data: route,
    });
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
