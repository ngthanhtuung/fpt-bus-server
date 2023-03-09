module.exports = {
  Ticket: {
    type: "object",
    required: ["id", "trip_id", "user_id", "checkInAt", "qrUrl", "status"],
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
      qrUrl: {
        type: "string",
        description: "The QR Code of the ticket",
      },
      status: {
        type: "boolean",
        description: "The status of the ticket",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      trip_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      user_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      qrUrl: "https://firebasestorage.googleapis.com/v0/b/f-bus-system.appspot.com/o/qr-code%2Fqr-code-2023-03-09T15%3A19%3A53Z-4d5f1774-11ff-45c5-9db0-a838952abb7e?alt=media&token=bf6f5d94-7e3e-4ab8-b03a-0db14691c68d",
      status: false,
    },
  },
};
