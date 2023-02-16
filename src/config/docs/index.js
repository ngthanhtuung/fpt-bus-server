const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const tags = require("./tags");
const security = require("./security.docs");
const api = require("./routers/api");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...security,
  ...tags,
  ...api,
};
