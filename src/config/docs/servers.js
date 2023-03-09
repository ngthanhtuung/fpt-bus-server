const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  servers: isProduction
    ? [
        {
          url: process.env.DOMAIN,
        },
      ]
    : [
        {
          url: `http://${process.env.HOST || "localhost"}:${
            process.env.PORT || 8888
          }`,
        },
      ],
};
