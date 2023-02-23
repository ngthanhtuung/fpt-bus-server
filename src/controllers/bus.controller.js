const { v4: uuid } = require("uuid");
const validator = require("validator");
const { Bus, Users } = require("../models");

const validate = (license_plate, seat_quantity, driver_id) => {
  const errors = {};
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
  return errors;
};

const getAllBus = async (req, res) => {
  try {
    const busList = await Bus.findAll({
      include: [
        {
          model: Users,
          attributes: ["fullname"],
        },
      ],
    });
    busList.length > 0
      ? res.status(200).json({
          status: "Success",
          message: "Get all bus successfully!",
          data: busList,
        })
      : res.status(404).json({
          status: "Fail",
          message: "Bus list is empty!",
        });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const getABus = async (req, res) => {
  try {
    const id = req.params.id;
    const bus = await Bus.findOne({
      where: { id },
      include: [
        {
          model: Users,
          attributes: ["fullname"],
        },
      ],
    });
    bus
      ? res.status(200).json({
          status: "Success",
          message: "Get a bus successfully!",
          data: bus,
        })
      : res.status(404).json({
          status: "Fail",
          message: "Bus not found!",
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
            updatedAt: new Date(),
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
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const bus = await Bus.findOne({
      where: { id },
    });
    if (bus) {
      await Bus.update(
        {
          status: !bus.status,
          updatedAt: new Date(),
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
  getABus,
  createBus,
  updateBus,
  changeStatus,
};
