const app = require("./app");

const isProduction = process.env.NODE_ENV === "production";

app.listen(process.env.PORT || 8888, () => {
  if (isProduction) {
    console.log(`Server is running at ${process.env.DOMAIN}`);
    console.log(`Swagger is running at ${process.env.DOMAIN}/api-docs`);
    return;
  } else {
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
  }
});
