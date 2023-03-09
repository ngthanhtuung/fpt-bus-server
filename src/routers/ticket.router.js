const { Router } = require("express");
const {
  ticketReservation,
  getAllTicket
} = require("../controllers/ticket-reservation.controller");
const { checkInTicket } = require("../controllers/checkin.controller");
const {
  authenticate,
  authorize
} = require("../middlewares/auth/verify-token.middleware");

const ticketRouter = Router();

ticketRouter.get("/", [authenticate, authorize(["STUDENT"])], getAllTicket);
ticketRouter.post(
  "/booking",
  [authenticate, authorize(["STUDENT"])],
  ticketReservation
);

ticketRouter.put("/check-in/:idTicket", [authenticate, authorize(["DRIVER"])], checkInTicket)

module.exports = ticketRouter;
