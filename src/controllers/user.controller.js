const { Users, RoleTypes } = require("../models");
const Sequelize = require("sequelize");
const validator = require("validator");

const validate = (fullname, email, phone_number, student_id) => {
  const errors = {};
  if (
    validator.isEmpty(fullname) &&
    validator.isEmpty(email) &&
    validator.isEmpty(phone_number) &&
    validator.isEmpty(student_id)
  ) {
    errors.all = "All fields are required!";
  } else {
  }

  return errors;
};

const findAllUser = async (req, res) => {
  try {
    const queryParams = req.query;
    const whereClause = {};
    const includeOptions = [
      {
        model: RoleTypes,
        attributes: ["role_name"],
      },
    ];
    for (const property in queryParams) {
      if (queryParams.hasOwnProperty(property)) {
        const value = queryParams[property];
        if (
          property === "fullname" ||
          property === "student_id" ||
          property === "email"
        ) {
          whereClause[property] = {
            [Sequelize.Op.like]: `%${value}%`,
          };
        } else if (property === "status") {
          whereClause[property] = value === "true";
        } else if (property === "role_name") {
          includeOptions[0].where = {
            role_name: value.toUpperCase(),
          };
        } else {
          whereClause[property] = value;
        }
      }
    }
    const userList = await Users.findAll({
      where: whereClause,
      include: includeOptions,
    });
    if (userList) {
      res.status(200).json({
        status: "Success",
        messages: "Get all user successfully!",
        data: userList,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        messages: "User list is empty!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, phone_number, student_id, profile_img, role_id } =
      req.body;
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.messages,
    });
  }
};

module.exports = {
  findAllUser,
  createUser,
};
