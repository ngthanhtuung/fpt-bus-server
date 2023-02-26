const { v4: uuid } = require("uuid");
const validator = require("validator");
const { Station } = require("../models");
const currentDate = require("../utils/currentDate");
const Sequelize = require("sequelize");

const validateLatitude = (lat) => {
  const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
  if (regex.test(lat)) {
    const latitude = parseFloat(lat);
    if (latitude >= -90 && latitude <= 90) {
      return true; // valid latitude
    }
  }
  return false; // invalid latitude
};

const validateLongitude = (long) => {
  const regex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;
  if (regex.test(long)) {
    const longitude = parseFloat(long);
    if (longitude >= -180 && longitude <= 180) {
      return true; // valid longitude
    }
  }
  return false; //invalid longitude
};

const validate = (station_name, longitude, latitude) => {
  const errors = {};
  if (!station_name && !longitude && !latitude) {
    errors.all = "All fields are required!";
  } else {
    if (validator.isEmpty(station_name)) {
      errors.station_name = "Station name is required";
    }
    if (validator.isEmpty(longitude) || !validateLongitude(longitude)) {
      errors.longitude = "Longitude is not valid";
    }
    if (validator.isEmpty(latitude) || !validateLatitude(latitude)) {
      errors.latitude = "Latitude is not valid";
    }
  }
  return errors;
};

const isExistedCoordinates = async (longitude, latitude) => {
  try {
    const isExisted = await Station.findAll({
      where: { latitude: latitude, longitude: longitude },
    });
    if (isExisted.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getAllStation = async (req, res) => {
  try {
    const queryParams = req.query;
    const whereClause = {};
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        const value = queryParams[key];
        if (key === "station_name") {
          whereClause[key] = {
            [Sequelize.Op.like]: `%${value}%`,
          };
        } else if (key === "status") {
          whereClause[key] = value || "true";
        } else {
          whereClause[key] = value;
        }
      }
    }
    const stations = await Station.findAll({
      where: whereClause,
    });
    if (stations.length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Get all station successfully",
        data: stations,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Station list is empty",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const createStation = async (req, res) => {
  try {
    const { station_name, longitude, latitude } = req.body;
    const errors = validate(station_name, longitude, latitude);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        message: errors,
      });
    } else {
      if ((await isExistedCoordinates(longitude, latitude)) === true) {
        res.status(400).json({
          status: "Fail",
          message: "This station is existed, try again!",
        });
      } else {
        const station = await Station.create({
          id: uuid(),
          station_name,
          longitude,
          latitude,
          status: true,
          createdAt: currentDate(),
          updatedAt: currentDate(),
        }).then((station) => {
          res.status(201).json({
            status: "Success",
            message: "Create station successfully",
            data: station,
          });
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { station_name, longitude, latitude, status } = req.body;
    const errors = validate(station_name, longitude, latitude);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        message: errors,
      });
    } else {
      const station = await Station.findByPk(id);
      if (station) {
        const updatedStation = await station.update({
          station_name,
          longitude,
          latitude,
          status,
          updatedAt: currentDate(),
        });
        res.status(200).json({
          status: "Success",
          message: `${station.station_name} is updated successfully`,
          data: updatedStation,
        });
      } else {
        res.status(404).json({
          status: "Fail",
          message: "Station is not existed!",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const changeStatusStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByPk(id);
    if (station) {
      const updatedStation = await station.update({
        status: !station.status,
        updatedAt: currentDate(),
      });
      station.status === true
        ? res.status(200).json({
            status: "Success",
            message: `${station.station_name} is enabled`,
            data: updatedStation,
          })
        : res.status(200).json({
            status: "Success",
            message: `${station.station_name} is disabled`,
            data: updatedStation,
          });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Station is not existed!",
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
  getAllStation,
  createStation,
  updateStation,
  changeStatusStation,
};
