module.exports = {
  Route_Station: {
    type: "object",
    required: ["id", "route_id", "station_id"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the route_station",
      },
      route_id: {
        type: "string",
        description: "The route_id of the route_station",
      },
      station_id: {
        type: "string",
        description: "The station_id of the route_station",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      route_id: "4eb76978-2c07-56ab-87eb-d4484c5c3acd",
      station_id: "4eb76978-2c07-47ea-87eb-d336c5c3acd",
    },
  },
};
