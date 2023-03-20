const { Bus, Users, sequelize, Trip, Ticket } = require("../models");
const getDataChart = async (req, res) => {
    try {
        const getAllDataBus = await Bus.findAll({
            where: { status: 1 },
        });
        console.log("getAllDataBus:", getAllDataBus);
        const getAllTicketBook = await Ticket.findAll({
            where: { status: 1 }
        })
        const getAllTicketCancel = await Ticket.findAll({
            where: { status: 0, checkInAt: null }
        })
        const getAllTrip = await Trip.findAll({

        })

        const response = {
            bus: getAllDataBus.length
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
}
module.exports = {
    getDataChart
};