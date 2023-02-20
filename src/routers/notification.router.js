const { Router } = require("express");
const { pushNoti } = require("../controllers/notification.controller");
const { authenticate } = require("../middlewares/auth/verify-token.middleware");

const notiRouter = new Router();

notiRouter.post("/", authenticate, pushNoti);

module.exports = notiRouter;
