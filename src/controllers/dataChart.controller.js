const { Users, sequelize, Trip, Ticket, Route } = require("../models");
const getDataChart = async (req, res) => {
    try {
        const { date } = req.query
        const getAllStudent = await Users.findAll({
            where: { status: 1, role_id: 2 }
        });
        const getAllTicketBook = await sequelize.query(`
        SELECT count(T.id) as TotalTicketBook
        FROM Ticket T inner join Trip Tr on T.trip_id = Tr.id
        WHERE Tr.departure_date = '${date}'
        `)
        console.log("getAllTicketBook:", getAllTicketBook[0][0].TotalTicketBook);
        const getAllTrip = await Trip.findAll({
            where: {
                departure_date: new Date(date)
            }
        })
        console.log("getAllTrip:", getAllTrip.length);
        const getAllTicketOfRouteUsed = await sequelize.query(`
        SELECT count(ti.id) as TotalTicketOfRoute, r.id ,r.route_name
        FROM Route r inner join Trip t on r.id = t.route_id inner join Ticket ti on t.id = ti.trip_id
        WHERE t.departure_date = '${date}' and ti.status = "USED"
        GROUP BY r.id;
        `);
        console.log("TotalTicket of Route used:", getAllTicketOfRouteUsed[0][0]);
        const getAllTicketOfRouteBooking = await sequelize.query(`
        SELECT count(ti.id) as TotalTicketOfRoute, r.id ,r.route_name
        FROM Route r inner join Trip t on r.id = t.route_id inner join Ticket ti on t.id = ti.trip_id
        WHERE t.departure_date = '${date}' and ti.status = "BOOKING"
        GROUP BY r.id;
        `);
        console.log("TotalTicket of Route Booking:", getAllTicketOfRouteBooking[0][0]);
        const getAllTicketOfRouteCancel = await sequelize.query(`
        SELECT count(ti.id) as TotalTicketOfRoute, r.id ,r.route_name
        FROM Route r inner join Trip t on r.id = t.route_id inner join Ticket ti on t.id = ti.trip_id
        WHERE t.departure_date = '${date}' and ti.status = "CANCEL"
        GROUP BY r.id;
        `);
        console.log("TotalTicket of Route Booking:", getAllTicketOfRouteCancel[0][0]);
        const getAllRouteName = await Route.findAll({
            where: { status: 1 }
        });
        console.log("getAllRouteName:", getAllRouteName);
        const totalTicketAllTrip = await sequelize.query(`
        SELECT sum(t.ticket_quantity) as TotalTicketOfTripInDay
        FROM Trip t
        WHERE t.departure_date = '${date}'
        `)
        let totalTicket = 0;
        getAllTicketBook[0].map(item => totalTicket += item.TotalTicketBook);
        console.log("totalTicket:", totalTicket);
        const response = {
            TotalUser: getAllStudent.length,
            TotalTrip: getAllTrip.length,
            TotalTicket: totalTicket,
            TotalRoute: getAllRouteName,
            TicketRoute: {
                TicketUsed: getAllTicketOfRouteUsed[0],
                TicketBooking: getAllTicketOfRouteBooking[0],
                TicketCancel: getAllTicketOfRouteCancel[0],
            },
            TotalTicketOfTrip: totalTicketAllTrip[0][0].TotalTicketOfTripInDay
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