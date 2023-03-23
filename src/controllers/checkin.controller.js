const { Ticket, Trip, Wallet, Transaction } = require("../models");
const currentDate = require("../utils/currentDate");
const { v4: uuidv4 } = require('uuid');
const { pushNotiByTopic } = require("./notification.controller");

const checkInTicket = async (req, res) => {
    try {
        const { idTicket } = req.params;
        if (idTicket == undefined) {
            return res.status(400).json({
                status: "Fail",
                message: "Ticket ID is required",
            });
        }
        const ticket = await Ticket.findByPk(idTicket);
        if (ticket == undefined) {
            return res.status(404).json({
                status: "Fail",
                message: "Ticket not found",
            });
        }
        const trip = await Trip.findByPk(ticket.trip_id);
        if (trip == undefined) {
            return res.status(404).json({
                status: "Fail",
                message: "Trip not found",
            });
        }
        if (trip.status === 2) {
            if (ticket.status === 'BOOKING' && ticket.checkInAt == null) {
                await Ticket.update(
                    {
                        status: 'USED',
                        checkInAt: currentDate().slice(-8),
                        updatedAt: currentDate(),
                    },
                    {
                        where: { id: idTicket },
                    });
                const wallet = await Wallet.findOne({
                    where: {
                        user_id: ticket.user_id
                    }
                })
                wallet.balance = wallet.balance + 10;
                await wallet.save();
                const transaction = await Transaction.create({
                    id: uuidv4(),
                    ticket_id: idTicket,
                    wallet_id: wallet.id,
                    amount: 10,
                    type: 'REFUND',
                    status: 'SUCCESS',
                    description: `Refund to wallet ${wallet.id} with amount 10`,
                    createdAt: currentDate(),
                    updatedAt: currentDate()
                })
                pushNotiByTopic(`USER_${ticket.user_id}`, 'FPT Bus Notification', 'Ticket check-in successfully');
                return res.status(200).json({
                    status: "Success",
                    message: "Check in successfully",
                });
            } else if (ticket.status === false && ticket.checkInAt == null) {
                return res.status(400).json({
                    status: "Fail",
                    message: "Ticket is not valid",
                });
            } else {
                return res.status(400).json({
                    status: "Fail",
                    message: "Ticket is already used",
                });
            }
        } else {
            return res.status(400).json({
                status: "Fail",
                message: "Your trip hasn't started yet",
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