const { v4: uuid } = require("uuid");
const { Bus, Route, Trip } = require("../models");
const currentDate = require("../utils/currentDate");

const createObjectTrip = async (
  route_id,
  bus_id,
  departure_date,
  departure_time,
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
  // Create a map of existing trips keyed by departure date and time
  const existingTripMap = new Map();
  for (const trip of existingTrips) {
    const key = trip.departure_date + "-" + trip.departure_time;
    existingTripMap.set(key, trip);
  }

  // Generate trips for each departure date and time
  for (const date of departure_date) {
    for (const time of departure_time) {
      const key = date + "-" + time;
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

const getAllTrip = async (req, res) => {};

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
      const { trip, duplicates } = createObjectTrip(
        route_id,
        bus_id,
        departure_dates,
        departure_times,
        ticket_quantity
      );
      console.log("Trip: ", trip);
      console.log("Duplicates: ", duplicates);
      // const newTrip = await Trip.bulkCreate(trip);
      // if (newTrip) {
      //   if (duplicates) {
      //     res.status(200).json({
      //       status: "Success",
      //       message: `Create trips`,
      //       duplicates: duplicates,
      //       data: trip,
      //     });
      //   } else {
      //     res.status(200).json({
      //       status: "Success",
      //       message: `Create trips`,
      //       data: trip,
      //     });
      //   }
      // } else {
      //   res.status(400).json({
      //     status: "Fail",
      //     message: "Create trip failed",
      //   });
      // }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateTrip = async (req, res) => {};

const changeStatus = async (req, res) => {};

module.exports = {
  getAllTrip,
  createTrip,
  updateTrip,
};
