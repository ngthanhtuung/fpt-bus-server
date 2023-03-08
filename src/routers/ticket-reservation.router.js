const {Router} = require("express");
const { ticketReservation } = require("../controllers/ticket-reservation.controller");

const ticketReservationRouter = Router();

ticketReservationRouter.post("/",[],ticketReservation)
module.exports = ticketReservationRouter;