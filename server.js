const app = require("./app");

app.listen(process.env.PORT || 8888, () => {
  console.log(
    `Server is running at http://${process.env.HOST || "localhost"}:${
      process.env.PORT || 8888
    }`
  );
  console.log(
    `Swagger is running at http://${process.env.HOST || "localhost"}:${
      process.env.PORT || 8888
    }/api-docs`
  );
});
