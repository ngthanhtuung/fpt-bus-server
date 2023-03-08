const { Router } = require("express");
const { checkInTicket } = require("../controllers/checkin.controller");

const checkInRouter = Router();

checkInRouter.put("/:idTicket", [], checkInTicket)
module.exports = checkInRouter;