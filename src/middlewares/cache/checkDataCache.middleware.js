const redis = require("redis");
require("dotenv").config();
//create client
const client = redis.createClient(process.env.PORT_REDIS);
//function connect cache redis
(async () => {
  client.on("error", (error) => console.error(`Error : ${error}`));
  await client.connect();
})();

const checkDataCache = async (req, res, next) => {
  try {
    const { key } = req.params;
    if (!key) {
      next();
    }
    const cacheResults = await client.get(key);
    if (cacheResults) {
      res.status(200).json({
        status: "Success",
        isCache: true,
        data: {
          cacheResults: JSON.parse(cacheResults),
        },
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      messages: error.message,
    });
  }
};
module.exports = {
  checkDataCache,
};
