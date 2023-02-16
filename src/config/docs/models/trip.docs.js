module.exports = {
  Trip: {
    type: "object",
    required: ["id", "route_id", "departure_time", "bus_id", "ticket_quantity"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the trip",
      },
      route_id: {
        type: "string",
        description: "The id of the route",
      },
      departure_time: {
        type: "string",
        description: "The departure time of the trip",
      },
      bus_id: {
        type: "string",
        description: "The id of the bus",
      },
      ticket_quantity: {
        type: "integer",
        description: "The quantity of the ticket",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      route_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      departure_time: "2021-05-01T00:00:00.000Z",
      bus_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      ticket_quantity: 10,
    },
  },
};
