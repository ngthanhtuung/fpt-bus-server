module.exports = {
  servers: [
    {
      url: `http://${process.env.HOST || localhost}:${
        process.env.PORT || 8888
      }`,
    },
    {
      url: `http://fpt-bus.online`,
    },
  ],
};
