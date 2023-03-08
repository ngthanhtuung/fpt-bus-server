"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
      Ticket.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Ticket.init(
    {
      trip_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
