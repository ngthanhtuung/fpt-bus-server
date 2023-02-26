const { Users, RoleTypes } = require("../models");
const Sequelize = require("sequelize");

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

module.exports = {
  findAllUser,
};

// {
//   "id": "2127094d-6615-4300-8a21-6d16eb66bf7c",
//   "fullname": "Nguyen Quoc Sy",
//   "email": "synqse151029@fpt.edu.vn",
//   "phone_number": "",
//   "student_id": "SE151029",
//   "profile_img": "https://lh3.googleusercontent.com/a/AEdFTp41vyAK7DlyiJYHOAVYUWa9uVd5pwQ7y8SlO80U=s96-c",
//   "status": true,
//   "role_id": 1,
//   "createdAt": "2023-02-17T07:02:56.000Z",
//   "updatedAt": "2023-02-17T07:02:57.000Z",
//   "RoleType": {
//     "role_name": "ADMIN"
//   }
