"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Ticket:
   *       type: object
   *       required:
   *         - id
   *         - trip_id
   *         - user_id
   *         - seat_code
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the ticket
   *         trip_id:
   *           type: string
   *           description: The id of the trip
   *         user_id:
   *           type: string
   *           description: The id of the user
   *         seat_code:
   *           type: string
   *           description: The seat code of the ticket
   *       example:
   *         id: 1
   *         trip_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         user_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         seat_code: "A1"
   */

  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.hasMany(models.Transaction, { foreignKey: "ticket_id" });
      Ticket.belongsTo(models.Trip, { foreignKey: "trip_id" });
      Ticket.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Ticket.init(
    {
      trip_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      seat_code: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
