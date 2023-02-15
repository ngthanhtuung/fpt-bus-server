module.exports = {
  Ticket: {
    type: "object",
    required: ["id", "trip_id", "user_id", "seat_code"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the ticket",
      },
      trip_id: {
        type: "string",
        description: "The id of the trip",
      },
      user_id: {
        type: "string",
        description: "The id of the user",
      },
      seat_code: {
        type: "string",
        description: "The seat code of the ticket",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      trip_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      user_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      seat_code: "A1",
    },
  },
};
