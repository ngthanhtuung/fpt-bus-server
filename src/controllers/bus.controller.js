const { v4: uuid } = require("uuid");
const validator = require("validator");
const { Bus, Users } = require("../models");

const getAllBus = async (req, res) => {
  try {
    const busList = await Bus.findAll({}).then((bus) => {
      Users.findOne({
        where: { id: bus.driver_id },
      }).then((user) => {
        bus.driver_name = user.fullname;
        busList.push(bus);
      });
    });
    res.status(200).json({
      status: "Success",
      message: "Get all bus successfully!",
      data: busList,
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
    const errors = {};
    const { license_plate, seat_quantity, driver_id } = req.body;
    if (!license_plate && !seat_quantity && !driver_id) {
      errors.all = "All fields are required";
    } else {
      if (validator.isEmpty(license_plate)) {
        errors.license_plate = "License plate is required";
      }
      if (seat_quantity <= 0) {
        errors.seat_quantity =
          "Seat quantity must be a number and greater than 0";
      }
      if (!validator.isUUID(driver_id) || validator.isEmpty(driver_id)) {
        errors.driver_id = "Driver id is not valid";
      }
    }
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        message: errors,
      });
    } else {
      const bus = await Bus.create({
        id: uuid(),
        license_plate,
        seat_quantity,
        driver_id,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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

module.exports = {
  getAllBus,
  createBus,
};
