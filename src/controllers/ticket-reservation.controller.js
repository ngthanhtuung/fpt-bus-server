const { v4: uuid } = require("uuid");
const { Ticket, Trip, Bus, Users, Route } = require("../models");
const currentDate = require("../utils/currentDate");
const { generateQRCode } = require("../utils/qrCode")
const { uploadQRCode } = require('./upload.controller');

const getAllTicket = async (req, res) => {
    try {
        const userLoginId = req.user_id;
        const limit =
            !isNaN(Math.abs(parseInt(req.query.limit))) &&
                Math.abs(parseInt(req.query.limit)) > 0
                ? Math.abs(parseInt(req.query.limit))
                : 10;
        const page =
            !isNaN(Math.abs(parseInt(req.query.page))) &&
                Math.abs(parseInt(req.query.limit)) > 0
                ? Math.abs(parseInt(req.query.page))
                : 1;
        const offset = (page - 1) * limit;
        const numPage = Math.ceil((await Bus.count()) / limit);
        const { status } = req.query;

        const whereClause = {
            user_id: userLoginId
        }
        if (
            status != undefined &&
            status != "" &&
            status != null &&
            status != "null" &&
            status != "undefined"
        ) {
            whereClause.status = JSON.parse(status)
        }
        const { count, rows } = await Ticket.findAndCountAll({
            where: whereClause,
            offset: offset,
            limit: limit,
            include: [
                {
                    model: Trip,
                    attributes: ["departure_date", "departure_time", "ticket_quantity"],
                    include: [
                        {
                            model: Bus,
                            attributes: ["license_plate", "seat_quantity"],
                            include: [
                                {
                                    model: Users,
                                    attributes: ["fullname"]
                                }
                            ]
                        },
                        {
                            model: Route,
                            attributes: ["route_name", "departure", "destination"]
                        }
                    ]
                }
            ]
        });
        res.status(200).json({
            status: "Success",
            message: "Get all ticket successfully",
            pagination: {
                total: count,
                limit: limit,
                current_page: page,
                total_page: numPage
            },
            data: rows
        })
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: err.message
        });
    }
}

const ticketReservation = async (req, res) => {
    try {
        //Pass param user id and trip id in request body
        const userLoginId = req.user_id;
        const { tripId } = req.body;
        if (tripId == undefined) {
            return res.status(400).json({
                status: "Fail",
                message: "Trip ID is required"
            });
        }
        //Find trip by id
        const trip = await Trip.findByPk(tripId);
        if (trip == undefined) {
            return res.status(404).json({
                status: "Fail",
                message: "Trip not found!!!"
            });
        }
        const checkTicketReservation = await Ticket.findAll({
            where: {
                trip_id: tripId,
                user_id: userLoginId
            }
        });
        if (checkTicketReservation.length === 0) {
            //trip status = 1 (active) accept booking else response trip invalid
            if (trip.status === 1 && trip.ticket_quantity > 0) {
                const ticketId = uuid();
                const ticket = await Ticket.create({
                    id: ticketId,
                    trip_id: tripId,
                    user_id: userLoginId,
                    qrUrl: "",
                    status: true,
                    createdAt: currentDate(),
                    updatedAt: currentDate()
                });
                const data = `${process.env.NODE_ENV === `development` ? `http://${process.env.HOST}:${process.env.PORT}/api/v1/ticket/check-in/${ticketId}` : `${process.env.DOMAIN}/api/v1/ticket/check-in/${ticketId}`}`;
                const base64Ticket = await generateQRCode(data);
                console.log(`\n\nData: `, data);
                const imgUrl = await uploadQRCode(base64Ticket, ticketId);
                ticket.qrUrl = imgUrl;
                await ticket.save();
                if (ticket) {
                    await Trip.update(
                        {
                            ticket_quantity: trip.ticket_quantity - 1
                        },
                        { where: { id: tripId } }
                    );
                    return res.status(201).json({
                        status: "Success",
                        message: "Booking ticket successfully",
                        data: {
                            ticket_id: ticket.id,
                            trip_id: ticket.trip_id,
                            user_id: ticket.user_id,
                            qrUrl: ticket.qrUrl,
                            status: ticket.status,
                            createdAt: ticket.createdAt,
                            updatedAt: ticket.updatedAt
                        }
                    });
                } else {
                    await Trip.update(
                        {
                            status: 3
                        },
                        {
                            where: { id: tripId }
                        }
                    );
                    return res.status(400).json({
                        status: "Fail",
                        message: "Booking ticket fail"
                    });
                }
            } else {
                return res.status(400).json({
                    status: "Fail",
                    message: "Invalid Trip"
                });
            }
        } else {
            return res.status(400).json({
                status: "Fail",
                message: "You have already booked your ticket for this trip"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: err.message
        });
    }
};

module.exports = {
    ticketReservation,
    getAllTicket
};
