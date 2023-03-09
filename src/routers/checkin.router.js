const { Router } = require("express");
const { checkInTicket } = require("../controllers/checkin.controller");
const {
    authenticate,
    authorize,
  } = require("../middlewares/auth/verify-token.middleware");

const checkInRouter = Router();

checkInRouter.put("/:idTicket", [authenticate, authorize(["DRIVER"])], checkInTicket)
module.exports = checkInRouter;