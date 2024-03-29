require("dotenv").config();
const redis = require("redis");
const client = redis.createClient(process.env.PORT_REDIS);
const { v4: uuid } = require("uuid");
const { Bus, Route, Trip, Users, sequelize, Notification, Ticket, Wallet, Transaction } = require("../models");
const { Op } = require("sequelize");
const currentDate = require("../utils/currentDate");
const { pushNotiByTopic, createNotiObject } = require('./notification.controller')
const moment = require("moment-timezone");
const { isMoreThanMinutes } = require("../utils/time.utils");


client.connect();

const expiredTrip = async () => {
  const trips = await Trip.findAll({
    where: {
      status: 1
    }
  })
  trips.forEach((trip) => {
    const tripDate = moment.tz(trip.departure_date, 'YYYY-MM-DD', 'UTC').tz('Asia/Ho_Chi_Minh');
    const currentDate = moment().tz('Asia/Ho_Chi_Minh');
    if (tripDate.isBefore(currentDate, 'day')) {
      trip.update({ status: 3 });
    }
  });
}

const getStationBelongToTrip = async (id) => {
  try {
    const stations = await sequelize.query(`
    SELECT S.station_name, S.longitude, S.latitude
    FROM Trip T INNER JOIN Route R ON T.route_id = R.id
          INNER JOIN Route_Stations RS ON R.id = RS.route_id
                INNER JOIN Station S ON RS.station_id = S.id
    WHERE T.id = '${id}';
    `)
    return stations;
  } catch (err) {
    return null;
  }
}

const createObjectTrip = async (
  route_id,
  bus_id,
  departure_dates,
  departure_times,
  ticket_quantity
) => {
  const trip = [];
  const duplicates = [];

  // Get all existing trips for the specified route and bus
  const existingTrips = await Trip.findAll({
    attributes: [
      "id",
      "route_id",
      "bus_id",
      "ticket_quantity",
      "departure_date",
      "departure_time",
      "status",
      "createdAt",
      "updatedAt"
    ],
    where: {
      [Op.or]: [
        { route_id },
        { bus_id }
      ],
      departure_date: {
        [Op.in]: departure_dates
      },
      departure_time: {
        [Op.in]: departure_times
      }
    }
  });

  const existingTripMap = new Map();
  if (existingTrips) {
    for (const trip of existingTrips) {
      const key = trip.departure_date + "-" + trip.departure_time;
      existingTripMap.set(key, trip);
    }
  }
  for (const date of departure_dates) {
    for (const time of departure_times) {
      const key = date + "-" + time + ":00";
      console.log(`\nKey: `, key)
      const existingTrip = existingTripMap.get(key);
      if (existingTrip) {
        duplicates.push({ date, time });
      } else {
        const trip_obj = {
          id: uuid(),
          route_id,
          bus_id,
          departure_date: date,
          departure_time: time,
          ticket_quantity,
          status: 1,
          createdAt: currentDate(),
          updatedAt: currentDate()
        };
        trip.push(trip_obj);
      }
    }
  }
  return { trip, duplicates };
};

const checkExistedTrip = async (trip, id) => {
  try {
    const existingTrip = await Trip.findOne({
      attributes: ["id"],
      where: {
        route_id: trip.route_id,
        bus_id: trip.bus_id,
        departure_date: trip.departure_date,
        departure_time: trip.departure_time
      }
    });
    if (existingTrip && existingTrip.id !== id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getAllTripForDriver = async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const search_query = req.query.search_query || "";
    const userLoginId = req.user_id;
    const trips = await sequelize.query(`
    SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name', COUNT(Ti.id) as 'ticket_counter' 
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
              LEFT JOIN Ticket Ti ON Ti.trip_id = T.id
    WHERE T.departure_date = '${date}' AND U.id = '${userLoginId}' 
    ${search_query !== "" ? ` AND (R.route_name LIKE ${search_query} OR R.departure LIKE ${search_query} OR R.destination LIKE ${search_query} OR B.license_plate LIKE ${search_query})` : ""}
    GROUP BY T.id
    ORDER BY T.departure_time ASC;
    `);
    if (trips[0].length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Get all trip successfully",
        data: trips[0]
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

const getTripForStudent = async (req, res) => {
  try {
    const route_id = req.query.route_id;
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const search_query = req.query.search_query || ""
    if (
      !route_id ||
      route_id === "" ||
      route_id === undefined ||
      route_id === null
    ) {
      res.status(400).json({
        status: "Fail",
        message: "Route id is required"
      });
    } else {
      const trips = await sequelize.query(`
      SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name'
      FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
                INNER JOIN Route R ON T.route_id = R.id
                INNER JOIN Bus B ON T.bus_id = B.id
                INNER JOIN Users U ON B.driver_id = U.id
      WHERE T.departure_date = '${date}' AND route_id = '${route_id}' AND T.status = 1
      ${search_query !== "" ? ` OR (R.route_name LIKE '${search_query}' OR R.departure LIKE '${search_query}' OR R.destination LIKE '${search_query}' OR B.license_plate LIKE '${search_query}')` : ""}
      ORDER BY T.departure_time ASC;
      `);
      if (trips[0].length > 0) {
        res.status(200).json({
          status: "Success",
          message: "Get all trip successfully",
          data: trips[0]
        });
      } else {
        res.status(404).json({
          status: "Fail",
          message: "Trip not found"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

const getTripForAdmin = async (req, res) => {
  try {
    const date = req.query.date;
    const trips = await sequelize.query(`
    SELECT T.*, TS.status_name, R.route_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name'
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
    ${date ? `WHERE T.departure_date = '${date}'` : ""} 
    ORDER BY T.departure_time ASC;
    `);
    if (trips[0].length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Get all trip successfully",
        data: trips[0]
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

//STSRT TRIP TODAY
const getTripTodayForDriver = async (req, res) => {
  try {
    const { key } = req.params;
    const userLoginId = key.slice(7, key.length);
    const date = new Date().toISOString().slice(0, 10);
    const trips = await sequelize.query(`
    SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name', COUNT(Ti.id) as 'ticket_counter' 
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
              LEFT JOIN Ticket Ti ON Ti.trip_id = T.id
    WHERE T.departure_date = '${date}' AND U.id = '${userLoginId}'
    GROUP BY T.id
    ORDER BY T.departure_time ASC;
    `);
    if (trips[0].length > 0) {
      await client.set(key, JSON.stringify(trips[0]), {
        EX: 60,
        NX: true
      });
      res.status(200).json({
        status: "Success",
        message: "Get all trip successfully",
        data: trips[0]
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.messages
    });
  }
};

const getTripTodayForStudent = async (req, res) => {
  try {
    const { key } = req.params;
    const date = new Date().toISOString().slice(0, 10);
    const trips = await sequelize.query(`
    SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name'
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
    WHERE T.departure_date = '${date}' AND T.status = 1
    ORDER BY T.departure_time ASC;
    `);
    if (trips[0].length > 0) {
      await client.set(key, JSON.stringify(trips[0]), {
        EX: 60,
        NX: true
      });
      res.status(200).json({
        status: "Success",
        message: "Get all trip successfully",
        data: trips[0]
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.messages
    });
  }
};

const getTripToday = async (req, res) => {
  try {
    const role = req.role_name;
    switch (role) {
      case "DRIVER":
        await getTripTodayForDriver(req, res);
        break;
      case "STUDENT":
        await getTripTodayForStudent(req, res);
        break;
      default:
        await getTripTodayForStudent(req, res);
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.messages
    });
  }
};
//END TRIP TODAY

//START MAIN METHOD
const getAllTrip = async (req, res) => {
  const role = req.role_name;
  await expiredTrip();
  switch (role) {
    case "ADMIN":
      await getTripForAdmin(req, res);
      break;
    case "DRIVER":
      await getAllTripForDriver(req, res);
      break;
    case "STUDENT":
      await getTripForStudent(req, res);
      break;
  }
};

const getAllTripById = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!tripId) {
      return res.status(400).json({
        status: "Fail",
        message: "Trip ID is required!"
      })
    }
    const trip = await sequelize.query(`
    SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name'
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
    WHERE T.id = '${tripId}';
    `)
    if (trip[0].length > 0) {
      const stations = await getStationBelongToTrip(tripId);
      trip[0].push(stations[0]);
      res.status(200).json({
        status: "Success",
        message: "Get a trip successfully",
        data: trip[0]
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    })
  }
}

const createTrip = async (req, res) => {
  try {
    const {
      route_id,
      bus_id,
      departure_dates,
      departure_times,
      ticket_quantity
    } = req.body;
    const bus = await Bus.findOne({
      where: {
        id: bus_id
      }
    });
    if (ticket_quantity > bus.seat_quantity) {
      res.status(400).json({
        status: "Fail",
        message: `Ticket quantity must be less than or equal ${bus.seat_quantity}`
      });
    } else {
      const { trip, duplicates } = await createObjectTrip(
        route_id,
        bus_id,
        departure_dates,
        departure_times,
        ticket_quantity
      );
      const newTrip = await Trip.bulkCreate(trip);
      const today = new Date().toISOString().slice(0, 10);
      if (newTrip) {
        const todayTrip = trip.filter((trip) => trip.departure_date === today);
        console.log(`\nToday trip: ${todayTrip.length}\n`);
        if (todayTrip.length > 0) {
          await client.del("today");
        }
        if (duplicates) {
          res.status(200).json({
            status: "Success",
            message: `Create ${trip.length} ${trip.length > 1 ? `trips` : `trip`
              } successfully, ${duplicates.length} ${duplicates.length > 1 ? `trips` : `trip`
              } already exists`,
            duplicates: duplicates,
            data: trip
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: `Create ${trip.length} ${trip.length > 1 ? `trips` : `trip`
              } successfully, ${duplicates.length} ${duplicates.length > 1 ? `trips` : `trip`
              } already exists`,
            data: trip
          });
        }
      } else {
        res.status(400).json({
          status: "Fail",
          message: "Create trip failed"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

const updateTrip = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      bus_id,
      route_id,
      departure_date,
      departure_time,
      ticket_quantity,
      status
    } = req.body;
    console.log("body:", req.body);
    const trip = await Trip.findOne({
      attributes: [
        "id",
        "route_id",
        "bus_id",
        "ticket_quantity",
        "departure_date",
        "departure_time",
        "status",
        "createdAt",
        "updatedAt"
      ],
      where: {
        id
      }
    });
    console.log("trip:", trip);
    if (trip) {
      const checkTrip = {
        bus_id,
        route_id,
        departure_date,
        departure_time,
        ticket_quantity
      };
      const check = await checkExistedTrip(checkTrip, trip.id);
      if (check) {
        res.status(400).json({
          status: "Fail",
          message: "Trip already exists"
        });
      } else {
        const updatedTrip = await Trip.update(
          {
            bus_id,
            route_id,
            departure_date,
            departure_time,
            ticket_quantity,
            status,
            updatedAt: currentDate()
          },
          {
            where: {
              id
            }
          }
        );
        console.log("updatedTrip:", updatedTrip);
        if (updatedTrip) {
          const trip = await Trip.findOne({
            attributes: [
              "id",
              "route_id",
              "bus_id",
              "ticket_quantity",
              "departure_date",
              "departure_time",
              "status",
              "createdAt",
              "updatedAt"
            ],
            where: {
              id
            },
            include: [
              {
                model: Bus,
                attributes: ["license_plate"],
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
          });
          res.status(200).json({
            status: "Success",
            message: "Update trip successfully",
            data: trip
          });
        } else {
          res.status(400).json({
            status: "Fail",
            message: "Update trip failed"
          });
        }
      }
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const userRole = req.role_name;
    const trip = await Trip.findOne({
      attributes: [
        "id",
        "route_id",
        "bus_id",
        "ticket_quantity",
        "departure_date",
        "departure_time",
        "status",
        "createdAt",
        "updatedAt"
      ],
      where: {
        id
      },
      include: [
        {
          model: Bus,
          attributes: ["license_plate"],
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
    });
    if (trip) {
      if ([1, 3, 6].includes(status)) {
        if (userRole === "ADMIN") {
          if ((status === 3 || status === 6) && trip.dataValues.status === 1) {
            trip.status = status;
            trip.updatedAt = currentDate();
            await trip.save();
            pushNotiByTopic(`TRIP_${trip.dataValues.id}`, "FPT Bus Notification", `Due to technical reasons, the trip ${trip.departure_date} - ${trip.departure_time}  was cancelled. I hope the students understand. Thank you`);
            const tickets = await Ticket.findAll({
              where: {
                trip_id: trip.id
              }
            });
            if (tickets) {
              let listUserId = [];
              for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                listUserId.push(ticket.user_id);
                ticket.status = "CANCEL";
                ticket.updatedAt = currentDate();
                await ticket.save();
                const wallet = await Wallet.findOne({
                  where: {
                    user_id: ticket.user_id
                  }
                })
                wallet.balance = wallet.balance + 10;
                wallet.updatedAt = currentDate();
                await wallet.save();
                await Transaction.create({
                  id: uuid(),
                  ticket_id: ticket.id,
                  wallet_id: wallet.id,
                  amount: 10,
                  type: 'REFUND',
                  status: 'SUCCESS',
                  description: `Refund for trip ${trip.dataValues.id} successfully`,
                  createdAt: currentDate(),
                  updatedAt: currentDate()
                })
              }
              const notification = {
                title: "F-Bus Notification",
                body: `Due to technical reasons, the trip ${trip.departure_date} - ${trip.departure_time}  was cancelled. I hope the students understand. Thank you`,
                dataTitle: "",
                dataBody: "",
                sentTime: currentDate(),
              }
              const nofiticationData = createNotiObject(notification, listUserId);
              await Notification.bulkCreate(nofiticationData);
            }
          }
        } else {
          return res.status(400).json({
            status: "Fail",
            message: "You don't have permission to do this action"
          });
        }
      }
      if ([2, 4, 5].includes(status)) {
        if (userRole === "DRIVER") {
          if (isMoreThanMinutes(trip.departure_time, 15)) {
            return res.status(400).json({
              status: "Fail",
              message: "You can't check-in more than 15 minutes before departure time"
            });
          } else {
            trip.status = status;
            trip.updatedDate = currentDate();
            await trip.save();
            const ticket = await sequelize.query(`
            SELECT user_id FROM Ticket WHERE trip_id = '${trip.dataValues.id}'
            `);
            const listUserId = ticket[0].map(item => item.user_id);
            let bodyNoti = "";
            switch (status) {
              case 2:
                bodyNoti = "Trip is checking-in, hurry up!"
                break;
              case 4:
                bodyNoti = "Trip started! Wish you a safe trip"
                break;
              case 5:
                bodyNoti = "Trip finished! See you later"
                break;
            }
            pushNotiByTopic(`TRIP_${trip.id}`, "FPT Bus Notification", bodyNoti);
            const notification = {
              title: "F-Bus Notification",
              body: bodyNoti,
              dataTitle: "",
              dataBody: "",
              sentTime: currentDate(),
            }
            const nofiticationData = createNotiObject(notification, listUserId);
            await Notification.bulkCreate(nofiticationData);
          }
        } else {
          return res.status(403).json({
            status: "Fail",
            message: "You don't have permission to do this action"
          });
        }
      }
      res.status(200).json({
        status: "Success",
        message: `Trip status is updated!`,
        data: trip
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message
    });
  }
};

//END MAIN METHOD

module.exports = {
  getAllTrip,
  createTrip,
  updateTrip,
  changeStatus,
  getTripToday,
  getAllTripById,
  expiredTrip
};
