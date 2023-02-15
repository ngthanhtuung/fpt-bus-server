const { Users, RoleTypes } = require("../models");

const findAllUser = async (req, res) => {
  try {
    const userList = await Users.findAll({
      include: [
        {
          model: RoleTypes,
          attributes: ["role_name"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      messages: "Get all user successfully!",
      length: userList.length,
      data: {
        userList,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findAllUser,
};
