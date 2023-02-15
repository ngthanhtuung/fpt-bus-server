"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
