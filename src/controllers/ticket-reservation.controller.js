const { v4: uuid } = require("uuid");
const { Ticket, Trip } = require("../models");
const currentDate = require("../utils/currentDate");
const ticketReservation = async (req, res) => {
    try {
        //Pass param user id and trip id in request body
        const { idUser, idTrip } = req.body
        //check param pass in
        if (idUser == undefined || idTrip == undefined) {
            res.status(400).json({
                status: "Fail",
                message: "Missing param !!!",
            });
        }
        //Find trip by id
        const trip = await Trip.findByPk(idTrip);
        console.log("trip:", trip);
        if (trip == undefined) {
            res.status(404).json({
                status: "Fail",
                message: "Trip not found!!!",
            });
        }
        const checkTicketReservation = await Ticket.findAll({
            where: {
                trip_id: idTrip,
                user_id: idUser
            }
        });
        console.log("checkTicketReservation:", checkTicketReservation);
        if (checkTicketReservation.length === 0) {
            //trip status = 1 (active) accept booking else response trip invalid
            if (trip.status === 1 && trip.ticket_quantity > 0) {
                const ticket = await Ticket.create({
                    id: uuid(),
                    trip_id: idTrip,
                    user_id: idUser,
                    //true : unused, false: used
                    status: true,
                    createdAt: currentDate(),
                    updatedAt: currentDate(),
                });
                console.log("ticket reservation:", ticket);
            } else {
                res.status(400).json({
                    status: "Fail",
                    message: "Invalid trip!!!",
                });
            }
        } else {
            res.status(400).json({
                status: "Fail",
                message: "You have already booked your ticket for this trip!!!",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: err.message,
        });
    }
}

module.exports = {
    ticketReservation,
};