module.exports = {
  Station: {
    type: "object",
    required: ["id", "station_name"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the station",
      },
      station_name: {
        type: "string",
        description: "The name of the station",
      },
      longitude: {
        type: "string",
        description: "The longitude of the station",
      },
      latitude: {
        type: "string",
        description: "The latitude of the station",
      },
      status: {
        type: "boolean",
        description: "The status of the station",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      station_name: "FPT University",
      longitude: "21.0234",
      latitude: "105.2345",
      status: true,
    },
  },
};
