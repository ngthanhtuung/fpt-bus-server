const { Bus, Users, sequelize, Trip, Ticket } = require("../models");
const getDataChart = async (req, res) => {
    try {
        const { date } = req.query
        const getAllDataBus = await Bus.findAll({
            where: { status: 1 },
        });
        console.log("getAllDataBus:", getAllDataBus.length);
        const getAllTicketBook = await sequelize.query(`
        SELECT count(T.id) as TotalTicketBook
        FROM Ticket T inner join Trip Tr on T.trip_id = Tr.id
        WHERE Tr.departure_date = '${date}' and T.status = 1
        `)
        console.log("getAllTicketBook:", getAllTicketBook[0][0].TotalTicketBook);
        const getAllTicketCancel = await sequelize.query(`
        SELECT count(T.id) as TotalTicketCancel
        FROM Ticket T inner join Trip Tr on T.trip_id = Tr.id
        WHERE Tr.departure_date = '${date}' and T.status = 0 and T.checkInAt = null
        `)
        console.log("getAllTicketCancel:", getAllTicketCancel[0][0].TotalTicketCancel);
        const getAllTrip = await Trip.findAll({
            where: {
                departure_date: new Date(date)
            }
        })
        console.log("getAllTrip:", getAllTrip.length);
        const getAllTicketOfRoute = await sequelize.query(`
        SELECT sum(t.ticket_quantity) as TotalTicketOfRoute, r.id ,r.route_name
        FROM Route r inner join Trip t on r.id = t.route_id and t.departure_date = '${date}'
        GROUP BY r.id
        `)
        console.log("TotalTicket of Route:", getAllTicketOfRoute[0][0]);
        const response = {
            TotalBus: getAllDataBus.length,
            TotalTrip: getAllTrip.length,
            TotalTicketBook: getAllTicketBook[0][0].TotalTicketBook,
            TotalTicketCancel: getAllTicketCancel[0][0].TotalTicketCancel,
            TicketRoute: getAllTicketOfRoute[0]
        }
        res.status(200).json({
            status: "Success",
            data: response
        })
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