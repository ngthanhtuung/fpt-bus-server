const { Router } = require("express");
const { ticketReservation } = require("../controllers/ticket-reservation.controller");
const { authenticate } = require("../middlewares/auth/verify-token.middleware");

const ticketReservationRouter = Router();

ticketReservationRouter.post("/", [], ticketReservation)
module.exports = ticketReservationRouter;