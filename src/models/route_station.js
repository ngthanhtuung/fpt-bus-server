"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Route_Station:
   *       type: object
   *       required:
   *         - route_id
   *         - station_id
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the route_station
   *         route_id:
   *           type: string
   *           description: The route_id of the route_station
   *         station_id:
   *           type: string
   *           description: The station_id of the route_station
   *       example:
   *         id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         route_id: "4eb76978-2c07-56ab-87eb-d4484c5c3acd"
   *         station_id: "4eb76978-2c07-47ea-87eb-d336c5c3acd"
   */
  class Route_Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Route.belongsToMany(models.Station, { through: "route_station" });
      models.Station.belongsToMany(models.Route, { through: "route_station" });
    }
  }
  route_station.init(
    {
      route_id: DataTypes.UUID,
      station_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "route_station",
    }
  );
  return Route_Station;
};
