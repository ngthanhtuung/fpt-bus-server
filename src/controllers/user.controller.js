const { Users } = require("../models");

const findAllUser = async (req, res) => {
  try {
    const userList = await Users.findAll({
      where: {
        status: true,
      },
    });
    res.status(200).json(userList);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findAllUser,
};
