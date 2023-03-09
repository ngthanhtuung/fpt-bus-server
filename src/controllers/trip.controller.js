require("dotenv").config();
const redis = require("redis");
const client = redis.createClient(process.env.PORT_REDIS);
const { v4: uuid } = require("uuid");
const { Bus, Route, Trip, Users, sequelize } = require("../models");
const { Op } = require("sequelize");
const currentDate = require("../utils/currentDate");
client.connect();

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
      "updatedAt",
    ],
    where: {
      route_id,
      bus_id,
    },
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
          updatedAt: currentDate(),
        };
        trip.push(trip_obj);
      }
    }
  }
  return { trip, duplicates };
};

const checkExistedTrip = async (trip) => {
  try {
    const existingTrip = await Trip.findOne({
      attributes: ["id"],
      where: {
        route_id: trip.route_id,
        bus_id: trip.bus_id,
        departure_date: trip.departure_date,
        departure_time: trip.departure_time,
      },
    });
    if (existingTrip) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getAllTripStudent = (req, res, date) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const getAllTripDriver = async (req, res) => {
  try {
    const { key } = req.params;
    const userLoginId = req.user_id;
    const today = new Date().toISOString().slice(0, 10);
    const date = req.query.date || today;
    console.log("Date: ", date);
    const trips = await sequelize.query(`
    SELECT T.*, TS.status_name, R.departure, R.destination, B.license_plate, U.fullname as 'driver_name'
    FROM Trip_Status TS INNER JOIN Trip T ON TS.id = T.status 
              INNER JOIN Route R ON T.route_id = R.id
              INNER JOIN Bus B ON T.bus_id = B.id
              INNER JOIN Users U ON B.driver_id = U.id
    WHERE T.departure_date = '${date}' AND U.id = '${userLoginId}'
    ORDER BY T.departure_time ASC;
    `);
    if (trips) {
      res.status(200).json({
        status: "Success",
        message: "Get all trip successfully",
        data: trips[0],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const getAllTripAdmin = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

//START MAIN METHOD
const getAllTrip = async (req, res) => {
  const role = req.role_name;

  switch (role) {
    case "ADMIN":
      break;
    case "DRIVER":
      await getAllTripDriver(req, res);
      break;
    case "STUDENT":
      break;
  }

  // try {
  //   const { key } = req.params;
  //   const userLoginId = req.user_id;
  //   const role = req.role_name;
  //   const today = new Date().toISOString().slice(0, 10);
  //   const date = req.query.date || today;

  //   switch (role) {
  //     case "ADMIN":
  //       break;
  //     case "DRIVER":
  //       break;
  //     case "STUDENT":
  //       break;
  //   }
  //   const trips = await Trip.findAll({
  //     attributes: [
  //       "id",
  //       "route_id",
  //       "bus_id",
  //       "ticket_quantity",
  //       "departure_date",
  //       "departure_time",
  //       "status",
  //       "createdAt",
  //       "updatedAt",
  //     ],
  //     where: {
  //       departure_date: date,
  //     },
  //     include: [
  //       {
  //         model: Bus,
  //         attributes: ["license_plate", "seat_quantity"],
  //         include: [
  //           {
  //             model: Users,
  //             attributes: ["fullname"],
  //           },
  //         ],
  //       },
  //       {
  //         model: Route,
  //         attributes: ["departure", "destination"],
  //       },
  //     ],
  //     order: [["departure_time", "ASC"]],
  //   });

  //   if (trips) {
  //     await client.set(key, JSON.stringify(trips), {
  //       EX: 3600,
  //       NX: true,
  //     });
  //   }
  //   res.status(200).json({
  //     status: "Success",
  //     messages: "Get all trip successfully!",
  //     data: trips,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     status: "Fail",
  //     message: err.message,
  //   });
  // }
};

const createTrip = async (req, res) => {
  try {
    const {
      route_id,
      bus_id,
      departure_dates,
      departure_times,
      ticket_quantity,
    } = req.body;
    const bus = await Bus.findOne({
      where: {
        id: bus_id,
      },
    });
    if (ticket_quantity > bus.seat_quantity) {
      res.status(400).json({
        status: "Fail",
        message: `Ticket quantity must be less than or equal ${bus.seat_quantity}`,
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
            message: `Create ${trip.length} ${
              trip.length > 1 ? `trips` : `trip`
            } successfully, ${duplicates.length} ${
              duplicates.length > 1 ? `trips` : `trip`
            } already exists`,
            duplicates: duplicates,
            data: trip,
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: `Create ${trip.length} ${
              trip.length > 1 ? `trips` : `trip`
            } successfully, ${duplicates.length} ${
              duplicates.length > 1 ? `trips` : `trip`
            } already exists`,
            data: trip,
          });
        }
      } else {
        res.status(400).json({
          status: "Fail",
          message: "Create trip failed",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
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
      status,
    } = req.body;
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
        "updatedAt",
      ],
      where: {
        id,
      },
    });
    if (trip) {
      const checkTrip = {
        bus_id,
        route_id,
        departure_date,
        departure_time,
        ticket_quantity,
      };
      const check = await checkExistedTrip(checkTrip);
      console.log("Check Existed trip ", check);
      if (check) {
        res.status(400).json({
          status: "Fail",
          message: "Trip already exists",
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
            updatedAt: currentDate(),
          },
          {
            where: {
              id,
            },
          }
        );
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
              "updatedAt",
            ],
            where: {
              id,
            },
            include: [
              {
                model: Bus,
                attributes: ["license_plate"],
                include: [
                  {
                    model: Users,
                    attributes: ["fullname"],
                  },
                ],
              },
              {
                model: Route,
                attributes: ["departure", "destination"],
              },
            ],
          });
          res.status(200).json({
            status: "Success",
            message: "Update trip successfully",
            data: trip,
          });
        } else {
          res.status(400).json({
            status: "Fail",
            message: "Update trip failed",
          });
        }
      }
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
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
        "updatedAt",
      ],
      where: {
        id,
      },
      include: [
        {
          model: Bus,
          attributes: ["license_plate"],
          include: [
            {
              model: Users,
              attributes: ["fullname"],
            },
          ],
        },
        {
          model: Route,
          attributes: ["departure", "destination"],
        },
      ],
    });
    if (trip) {
      if (status !== 2) {
        if (userRole === "ADMIN") {
          trip.status = status;
          trip.updatedDate = currentDate();
          await trip.save();
        } else {
          return res.status(400).json({
            status: "Fail",
            message: "You don't have permission to do this action",
          });
        }
      } else {
        if (userRole === "DRIVER") {
          trip.status = status;
          trip.updatedDate = currentDate();
          await trip.save();
        } else {
          return res.status(403).json({
            status: "Fail",
            message: "You don't have permission to do this action",
          });
        }
      }
      res.status(200).json({
        status: "Success",
        message: `Trip status is updated!`,
        data: trip,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

//END MAIN METHOD

module.exports = {
  getAllTrip,
  createTrip,
  updateTrip,
  changeStatus,
};
