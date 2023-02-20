const redis = require('redis');
require("dotenv").config();
//create client
const client = redis.createClient(process.env.PORT_REDIS);
//function connect cache redis
(async () => {
    client.on("error", (error) => console.error(`Error : ${error}`));
    await client.connect();
})();

const checkDataCache = async (req, res, next) => {
    const { key } = req.params
    try {
        //get data from cache redis
        const cacheResults = await client.get(key);
        /**
        * if cache results not empty -> get data from cache  
        * else cache results empty -> set query database and set data (key:value)
        **/
        if (cacheResults) {
            res.status(200).json({
                status: "Success",
                length: cacheResults.length,
                isCache: true,
                data: {
                    cacheResults: JSON.parse(cacheResults),
                },
            });
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
    checkDataCache
};