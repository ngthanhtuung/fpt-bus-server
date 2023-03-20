const { v4: uuid } = require("uuid");
const validator = require("validator");
const { Bus, Users, sequelize, Trip } = require("../models");
const currentDate = require("../utils/currentDate");

const checkLicensePlate = (license_plate) => {
  const regex = /^(?!13|42)(1[1-9]|[2-9]\d)[A-Z]-\d{3}\.\d{2}$/;
  return regex.test(license_plate);
};

const validate = (license_plate, seat_quantity, driver_id) => {
  const errors = {};
  if (!license_plate && !seat_quantity && !driver_id) {
    errors.all = "All fields are required";
  } else {
    if (!checkLicensePlate(license_plate)) {
      errors.license_plate = "License plate is not valid";
    }
    if (seat_quantity <= 0) {
      errors.seat_quantity =
        "Seat quantity must be a number and greater than 0";
    }
    if (!validator.isUUID(driver_id) || validator.isEmpty(driver_id)) {
      errors.driver_id = "Driver id is not valid";
    }
  }
  return errors;
};

const checkBusIsOperating = async (busId) => {
  try {
    const numOfBus = await Trip.findAll({
      where: {
        bus_id: busId,
        status: 1
      }
    });
    if (numOfBus.length > 0) {
      return numOfBus.length;
    } else {
      return 0;
    }
  } catch (err) {
    return -1;
  }
}

const getAllBus = async (req, res) => {
  try {
    const limit =
      !isNaN(Math.abs(parseInt(req.query.limit))) &&
        Math.abs(parseInt(req.query.limit)) > 0
        ? Math.abs(parseInt(req.query.limit))
        : 10;
    const page =
      !isNaN(Math.abs(parseInt(req.query.page))) &&
        Math.abs(parseInt(req.query.limit)) > 0
        ? Math.abs(parseInt(req.query.page))
        : 1;
    const search_query = req.query.search_query || "";
    const offset = (page - 1) * limit;
    const numPage = Math.ceil((await Bus.count()) / limit);
    const busList = await sequelize.query(
      `SELECT bus.*, user.fullname AS driver_name
      FROM fpt_bus.Bus bus LEFT JOIN fpt_bus.Users user ON bus.driver_id = user.id
      WHERE user.fullname LIKE '%${search_query}%' OR bus.license_plate LIKE '%${search_query}%'
      LIMIT ${limit} OFFSET ${offset};`
    );
    res.status(200).json({
      status: "Success",
      message: "Get all bus succesfully!",
      pagination: {
        total: busList[0].length,
        per_page: limit,
        current_page: page,
        total_page: numPage,
      },
      data: busList[0],
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const createBus = async (req, res) => {
  try {
    const { license_plate, seat_quantity, driver_id } = req.body;
    const errors = validate(license_plate, seat_quantity, driver_id);
    const checkDuplicate = await Bus.findOne({
      where: { license_plate: license_plate },
    });
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        message: errors,
      });
    } else if (checkDuplicate) {
      res.status(400).json({
        status: "Fail",
        message: "License plate already exists!",
      });
    } else {
      const bus = await Bus.create({
        id: uuid(),
        license_plate,
        seat_quantity,
        driver_id,
        status: true,
        createdAt: currentDate(),
        updatedAt: currentDate(),
      }).then((bus) => {
        res.status(201).json({
          status: "Success",
          message: "Bus created successfully!",
          data: bus,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateBus = async (req, res) => {
  try {
    const id = req.params.id;
    const { license_plate, seat_quantity, driver_id, status } = req.body;
    const errors = validate(license_plate, seat_quantity, driver_id);
    const bus = await Bus.findOne({
      where: { id },
    });
    if (bus) {
      if (Object.keys(errors).length > 0) {
        res.status(400).json({
          status: "Fail",
          message: errors,
        });
      } else {
        await Bus.update(
          {
            license_plate,
            seat_quantity,
            driver_id,
            status,
            updatedAt: currentDate(),
          },
          {
            where: { id },
          }
        ).then((bus) => {
          Bus.findByPk(id).then((bus) => {
            res.status(200).json({
              status: "Success",
              message: "Bus updated successfully!",
              data: bus,
            });
          });
        });
      }
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Bus not found!",
      });
    }
  } catch (err) {
    if (err.message === 'Validation error') {
      return res.status(500).json({
        status: "Fail",
        message: "Driver is already assigned to another bus",
      });
    } else {
      return res.status(500).json({
        status: "Fail",
        message: err.message,
      });
    }
  }
};

const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const bus = await Bus.findOne({
      where: { id },
    });
    if (bus) {
      const numOfBus = await checkBusIsOperating(id);
      if (numOfBus > 0) {
        res.status(400).json({
          status: "Fail",
          message: `There are ${numOfBus} ${numOfBus > 1 ? `trips` : `trip`} left using this bus, please moderate to make this action`,
        });
      } else {
        await Bus.update(
          {
            status: !bus.status,
            updatedAt: currentDate(),
          },
          {
            where: { id },
          }
        ).then(() => {
          Bus.findByPk(id).then((bus) => {
            if (bus.status === false) {
              res.status(200).json({
                status: "Success",
                message: "Bus is disabled!",
                data: bus,
              });
            } else {
              res.status(200).json({
                status: "Success",
                message: "Bus is enabled!",
                data: bus,
              });
            }
          });
        });
      }

    } else {
      res.status(404).json({
        status: "Fail",
        message: "Bus not found!",
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
  getAllBus,
  createBus,
  updateBus,
  changeStatus,
};
