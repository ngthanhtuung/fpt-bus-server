const { Router } = require("express");
const {
  ticketReservation,
  getAllTicket,
  getTicketById,
  getTicketComing,
  cancelTicket
} = require("../controllers/ticket-reservation.controller");
const { checkInTicket } = require("../controllers/checkin.controller");
const {
  authenticate,
  authorize
} = require("../middlewares/auth/verify-token.middleware");

const ticketRouter = Router();

ticketRouter.get("/coming", [authenticate, authorize(["STUDENT"])], getTicketComing);
ticketRouter.get("/", [authenticate, authorize(["STUDENT"])], getAllTicket);
ticketRouter.get("/:ticketId", [authenticate, authorize(["STUDENT"])], getTicketById)
ticketRouter.post(
  "/booking",
  [authenticate, authorize(["STUDENT"])],
  ticketReservation
);
ticketRouter.post(
  "/cancel/:ticketId",
  [authenticate, authorize(["STUDENT"])],
  cancelTicket
);



ticketRouter.put("/check-in/:idTicket", [authenticate, authorize(["DRIVER"])], checkInTicket)

module.exports = ticketRouter;
