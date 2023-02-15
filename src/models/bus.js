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
   *         - license_plate
   *         - seat_quantity
   *         - driver_id
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the trip
   *         license_plate:
   *           type: string
   *           description: The license plate of the bus
   *         seat_quantity:
   *           type: integer
   *           description: The quantity of seats
   *         driver_id:
   *           type: string
   *           description: The id of the driver
   *         status:
   *           type: boolean
   *           description: The status of the bus
   *       example:
   *         id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         license_plate: "B 1234 ABC"
   *         seat_quantity: 50
   *         driver_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         status: true
   */
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bus.belongsTo(models.Users, { foreignKey: "driver_id" });
      Bus.hasOne(models.Seat, { foreignKey: "bus_id" });
      Bus.hasMany(models.Trip, { foreignKey: "bus_id" });
    }
  }
  Bus.init(
    {
      license_plate: DataTypes.STRING,
      seat_quantity: DataTypes.INTEGER,
      driver_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Bus",
    }
  );
  return Bus;
};
