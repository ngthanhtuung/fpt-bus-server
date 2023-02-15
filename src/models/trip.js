"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Trip:
   *       type: object
   *       required:
   *         - id
   *         - route_id
   *         - departure_time
   *         - bus_id
   *         - ticket_quantity
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the trip
   *         route_id:
   *           type: string
   *           description: The id of the route
   *         departure_time:
   *           type: string
   *           description: The departure time of the trip
   *         bus_id:
   *           type: string
   *           description: The id of the bus
   *         ticket_quantity:
   *           type: integer
   *           description: The quantity of tickets
   *       example:
   *         id: 1
   *         route_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         departure_time: "2021-05-01 12:00:00"
   *         bus_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         ticket_quantity: 50
   */

  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.Bus, { foreignKey: "bus_id" });
      Trip.belongsTo(models.Route, { foreignKey: "route_id" });
      Trip.belongsTo(models.Bus, { foreignKey: "bus_id" });
      Trip.hasMany(models.Ticket, { foreignKey: "trip_id" });
    }
  }
  Trip.init(
    {
      route_id: DataTypes.STRING,
      departure: DataTypes.TIME,
      bus_id: DataTypes.STRING,
      ticket_quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
