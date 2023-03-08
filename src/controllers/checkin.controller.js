const { Ticket, Trip } = require("../models");
const currentDate = require("../utils/currentDate");
const checkInTicket = async (req, res) => {
    try {
        const { idTicket } = req.params;
        if (idTicket == undefined) {
            return res.status(400).json({
                status: "Fail",
                message: "Missing param !!!",
            });
        }
        const ticket = await Ticket.findByPk(idTicket);
        console.log("Ticket:", ticket);
        if (ticket == undefined) {
            return res.status(404).json({
                status: "Fail",
                message: "Ticket not found!!!",
            });
        }
        const trip = await Trip.findByPk(ticket.trip_id);
        console.log("trip:", trip);
        if (trip == undefined) {
            return res.status(404).json({
                status: "Fail",
                message: "Trip not found!!!",
            });
        }
        if (trip.status === 2) {
            await Ticket.update(
                {
                    status: false,
                    updatedAt: currentDate(),
                },
                {
                    where: { id: idTicket },
                });
            return res.status(200).json({
                status: "Success",
                message: "Check-in successfully !!!",
            });
        } else {
            return res.status(200).json({
                status: "Fail",
                message: "It's not time for Check-In !!!",
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: err.message,
        });
    }
}

module.exports = {
    checkInTicket,
};