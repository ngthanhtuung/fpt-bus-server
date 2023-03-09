const { Route, Station, sequelize } = require("../models");
const currentDate = require("../utils/currentDate");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");

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

const isRouteDuplicated = async (startName, endName) => {
  try {
    const where = {
      [Op.and]: [{ departure: startName }, { destination: endName }],
    };
    const route = await Route.findOne({
      where,
    });
    if (route) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return true;
  }
};

const getCoordinates = async (stationName) => {
  try {
    const coordinates = await sequelize.query(`
    SELECT longitude, latitude
    from Station
    WHERE station_name = '${stationName}'
    `);
    if (coordinates) {
      return coordinates[0];
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll({
      order: [
        ["route_name", 'ASC']
      ]
    });
    const routesWithStations = await Promise.all(
      routes.map(async (route) => {
        const stations = await getStationsBelongToRoute(route.id);
        const departure_coordinates = await getCoordinates(route.departure);
        const destination_coordinates = await getCoordinates(route.destination);
        return {
          id: route.id,
          route_name: route.route_name,
          departure: route.departure,
          departure_coordinates: departure_coordinates,
          destination: route.destination,
          destination_coordinates: destination_coordinates,
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
    const { route_name, start, end, stations } = req.body;
    const startName = (await Station.findByPk(start)).station_name;
    const endName = (await Station.findByPk(end)).station_name;
    const isDuplicated = await isRouteDuplicated(startName, endName);
    if (isDuplicated) {
      res.status(400).json({
        status: "Fail",
        message: "Route already exists",
      });
    } else {
      const route = await Route.create({
        id: uuid(),
        route_name: route_name,
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
          VALUES("${route.id}","${stations[i]}", ${i + 1
          }, "${currentDate()}", "${currentDate()}")    
        `);
      }
      const routeStation = await getStationsBelongToRoute(route.id);
      const routeWithStations = {
        id: route.id,
        route_name: route.route_name,
        departure: route.departure,
        destination: route.destination,
        status: route.status,
        createdAt: route.createdAt,
        updatedAt: route.updatedAt,
        stations: routeStation[0],
      };
      res.status(201).json({
        status: "Success",
        message: "Route created successfully",
        data: routeWithStations,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateRoute = async (req, res) => {
  try {
    const id = req.params.id;
    const { route_name, vstart, end, stations, status } = req.body;
    const updatedStartName = (await Station.findByPk(start)).station_name;
    const updatedEndName = (await Station.findByPk(end)).station_name;
    const route = await Route.findByPk(id);
    if (route) {
      await Route.update(
        {
          route_name: route_name,
          departure: updatedStartName,
          destination: updatedEndName,
          status: status,
          updatedAt: currentDate(),
        },
        {
          where: {
            id: id,
          },
        }
      );
      await sequelize.query(`
        DELETE FROM Route_Stations WHERE route_id = '${id}'
      `);
      for (let i = 0; i < stations.length; i++) {
        await sequelize.query(`
          INSERT INTO Route_Stations(route_id, station_id, station_index, createdAt, updatedAt)
          VALUES("${route.id}","${stations[i]}", ${i + 1
          }, "${currentDate()}", "${currentDate()}")
        `);
      }
      const stationList = await getStationsBelongToRoute(id);
      const routeWithStations = {
        id: route.id,
        route_name: route.route_name,
        departure: route.departure,
        destination: route.destination,
        status: route.status,
        createdAt: route.createdAt,
        updatedAt: route.updatedAt,
        stations: stationList[0],
      };
      res.status(200).json({
        status: "Success",
        message: "Route updated successfully",
        data: routeWithStations,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Route not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findByPk(id);
    if (!route) {
      res.status(404).json({
        status: "Fail",
        message: "Route not found",
      });
    } else {
      route.status = !route.status;
      await route.save();
      res.status(200).json({
        status: "Success",
        message: `Route is ${route.status ? "enabled" : "disabled"
          } successfully`,
        data: route,
      });
    }
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
  updateRoute,
  changeStatus,
};
