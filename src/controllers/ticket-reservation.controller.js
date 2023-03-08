const { v4: uuid } = require("uuid");
const { Ticket, Trip } = require("../models");
const currentDate = require("../utils/currentDate");
const ticketReservation = async (req, res) => {
    try {
        //Pass param user id and trip id in request body
        const { idUser, idTrip } = req.body
        //check param pass in
        if (idUser == undefined || idTrip == undefined) {
            return res.status(400).json({
                status: "Fail",
                message: "Missing param !!!",
            });
        }
        //Find trip by id
        const trip = await Trip.findByPk(idTrip);
        console.log("trip:", trip);
        if (trip == undefined) {
            return res.status(404).json({
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
                if (ticket) {
                    await Trip.update(
                        {
                            ticket_quantity: trip.ticket_quantity - 1
                        },
                        { where: { id: idTrip } }
                    );
                    return res.status(200).json({
                        status: "Success",
                        message: "Booking ticket successfully!!!",
                        data: {
                            qrCode: `http://api.fpt-bus.online/api/v1/check-in/${ticket.dataValues.id}`
                        }
                    })
                } else {
                    return res.status(400).json({
                        status: "Fail",
                        message: "Booking ticket unsuccessfully!!!",
                    });
                }
            } else {
                return res.status(400).json({
                    status: "Fail",
                    message: "Invalid trip!!!",
                });
            }
        } else {
            return res.status(400).json({
                status: "Fail",
                message: "You have already booked your ticket for this trip!!!",
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
    ticketReservation,
};