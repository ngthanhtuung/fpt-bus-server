const { Router } = require("express");
const { pushNoti, createNoti, getAllNotification } = require("../controllers/notification.controller");
const { authenticate, authorize } = require("../middlewares/auth/verify-token.middleware");

const notiRouter = new Router();

notiRouter.get("/all", authenticate, getAllNotification);
notiRouter.post("/", authenticate, pushNoti);
notiRouter.post("/create", authenticate, createNoti);


module.exports = notiRouter;
