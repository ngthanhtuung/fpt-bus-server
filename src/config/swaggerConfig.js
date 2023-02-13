const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FPT Bus System - Server",
      version: "0.1.0",
      description: "This platform provides an UI for API using",
      contacts: [
        {
          name: "Tung Nguyen",
          email: "tungntse151167@fpt.edu.vn",
          url: "https://github.com/ngthanhtuung",
        },
        {
          name: "Huy Doan",
          email: "huydvqse151224@fpt.edu.vn",
          url: "https://github.com/BanhQuyDev",
        },
      ],
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT || 8888}`,
      },
    ],
  },
  apis: ["./src/routers/*.js", "./src/models/*.js"],
};
module.exports = options;
