"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Seat:
   *       type: object
   *       required:
   *         - id
   *         - seat_code
   *         - bus_id
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the seat
   *         seat_code:
   *           type: string
   *           description: The seat code of the seat
   *         bus_id:
   *          type: string
   *          description: The id of the bus
   *       example:
   *         id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         seat_code: A1
   *         bus_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   */
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.Bus, { foreignKey: "bus_id" });
    }
  }
  Seat.init(
    {
      seat_code: DataTypes.CHAR,
      bus_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
