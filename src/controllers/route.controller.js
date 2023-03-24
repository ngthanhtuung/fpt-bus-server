const { Route, Station, sequelize } = require("../models");
const currentDate = require("../utils/currentDate");
const { v4: uuid } = require("uuid");
const { Op, QueryTypes } = require("sequelize");
const axios = require('axios');
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

const isRouteDuplicated = async (routeName, startName, endName) => {
  try {
    const where = {
      [Op.or]: [
        {
          [Op.and]: [{ departure: startName }, { destination: endName }]
        },
        {
          route_name: routeName,
        }
      ]
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
    const { search_query } = req.query;
    let whereClause = {};
    if (search_query) {
      whereClause = {
        [Op.or]: [
          { route_name: { [Op.like]: `%${search_query}%` } },
          { departure: { [Op.like]: `%${search_query}%` } },
          { destination: { [Op.like]: `%${search_query}%` } },
        ],
      };
    }
    const routes = await Route.findAll({
      where: whereClause,
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

const getRouteById = async (req, res) => {
  try {
    const { routeId } = req.params;
    if (!routeId) {
      return res.status(400).json({
        status: "Fail",
        message: "Route ID is required!"
      })
    }
    const route = await Route.findOne({
      where: {
        id: routeId
      }
    });
    if (route) {
      const stations = await getStationsBelongToRoute(route.id);
      const departure_coordinates = await getCoordinates(route.departure);
      const destination_coordinates = await getCoordinates(route.destination);
      const routeWithStations = {
        id: route.id,
        route_name: route.route_name,
        departure: route.departure,
        departure_coordinates: departure_coordinates,
        destination: route.destination,
        destination_coordinates: destination_coordinates,
        status: route.status,
        stations: stations[0],
      };
      res.status(200).json({
        status: "Success",
        message: "Get route successfully",
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
    })
  }
};

const createRoute = async (req, res) => {
  try {
    const { route_name, start, end, stations } = req.body;
    const startName = (await Station.findByPk(start)).station_name;
    const endName = (await Station.findByPk(end)).station_name;
    const isDuplicated = await isRouteDuplicated(route_name, startName, endName);
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
    const { route_name, start, end, stations, status } = req.body;
    const updatedStartName = (await Station.findByPk(start)).station_name;
    const updatedEndName = (await Station.findByPk(end)).station_name;
    const routeUpdate = await Route.findOne({
      where: {
        id
      }
    })
    let isDuplicated;
    if (routeUpdate.departure !== updatedStartName && routeUpdate.destination !== updatedEndName) {
      isDuplicated = await isRouteDuplicated(route_name, updatedStartName, updatedEndName);
    }
    const route = await Route.findByPk(id);
    if (route) {
      if (isDuplicated) {
        res.status(400).json({
          status: "Fail",
          message: "Route already exists",
        });
      } else {
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
      }
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

const countRouteOfStation = async (req, res) => {
  try {
    //da8f9218-d941-488e-b78a-f499d038294b
    const { idRoute } = req.params
    //get detail route
    const findRoute = await Route.findByPk(idRoute);
    if (!findRoute) {
      return res.status(404).json({
        status: "Fail",
        message: "Route not found",
      });
    }
    //get name departure and destination
    const { departure, destination } = findRoute;
    //get latitude,longitude Departure
    const findStationDeparture = await Station.findAll({
      where: { station_name: departure }
    });
    console.log("findStationDeparture:", findStationDeparture);
    //get latitude,longitude destination
    const findStationDestination = await Station.findAll({
      where: { station_name: destination }
    });
    console.log("findStationDestination:", findStationDestination);
    let dataListStationOfRoute = await sequelize.query(`
    SELECT s.station_name, s.latitude,s.longitude
    FROM Route r inner join Route_Stations rs on r.id = rs.route_id inner join Station s on s.id = rs.station_id
    WHERE r.id = '${idRoute}'
    ORDER BY rs.station_index ASC
    `, { type: QueryTypes.SELECT });
    dataListStationOfRoute.unshift({ latitude: findStationDeparture[0].latitude, longitude: findStationDeparture[0].longitude })
    dataListStationOfRoute.push({ latitude: findStationDestination[0].latitude, longitude: findStationDestination[0].longitude })
    console.log("dataListStationOfRoute:", dataListStationOfRoute);
    let totalDistance = 0;
    let totalTime = 0;
    for (let index = 0; index < dataListStationOfRoute.length - 1; index++) {
      const origin = dataListStationOfRoute[index];
      console.log("origin:", origin);
      const destination = dataListStationOfRoute[index + 1];
      console.log("destination:", destination);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyAcK2vRnmr7D3goiJxahkLwZN2-NNvAs0E`);
      console.log("response.data.routes[0].legs[0].distance.text:", response.data.routes[0].legs[0].distance.text);
      console.log("response.data.routes[0].legs[0].distance.text:", response.data.routes[0].legs[0].duration.text);
      console.log("totalDistance:", totalDistance);
      console.log("totalTime:", totalTime);
      totalDistance += response.data.routes[0].legs[0].distance.value;
      totalTime += response.data.routes[0].legs[0].duration.value;
    }
    res.status(200).json({
      status: "Success",
      data: {
        TotalDistance: (totalDistance / 1000).toFixed(2) + 'km',
        TotalTime: (totalTime / 60).toFixed(2) + "mins",
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
}
module.exports = {
  getAllRoutes,
  createRoute,
  updateRoute,
  changeStatus,
  getCoordinates,
  getRouteById,
  countRouteOfStation
};
