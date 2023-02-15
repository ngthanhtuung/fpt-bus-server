module.exports = {
  Bus: {
    type: "object",
    required: ["id", "license_plate", "seat_quantity", "driver_id"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the trip",
      },
      license_plate: {
        type: "string",
        description: "The license plate of the bus",
      },
      seat_quantity: {
        type: "integer",
        description: "The quantity of seats",
      },
      status: {
        type: "boolean",
        description: "The status of the bus",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      license_plate: "B 1234 ABC",
      seat_quantity: 50,
      driver_id: "4eb76978-2c07-47ea-asfasdfasfd",
      status: true,
    },
  },
};
