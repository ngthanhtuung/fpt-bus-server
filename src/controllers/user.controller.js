const { Users, RoleTypes } = require("../models");
const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);
client.connect();
const findAllUser = async (req, res) => {
  try {
    const { key } = req.params
    const userList = await Users.findAll({
      include: [
        {
          model: RoleTypes,
          attributes: ["role_name"],
        },
      ],
    });
    //set new data when query in database
    await client.set(key, JSON.stringify(userList),
      {
        // accepts a value with the cache duration in seconds.
        EX: 86400,
        //when set to true, it ensures that the set() method should only set a key that doesn’t already exist in Redis
        NX: true
      }
    );
    res.status(200).json({
      status: "Success",
      messages: "Get all user successfully!",
      length: userList.length,
      isCache: false,
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
