module.exports = {
  Route: {
    type: "object",
    required: ["id", "departure", "destination"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the route",
      },
      departure: {
        type: "string",
        description: "The departure of the route",
      },
      destination: {
        type: "string",
        description: "The destination of the route",
      },
      status: {
        type: "boolean",
        description: "The status of the route",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      departure: "FPT University",
      destination: "Vinhomes Grand Park",
      status: true,
    },
  },
};
