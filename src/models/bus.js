"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
      tableName: "Bus",
    }
  );
  return Bus;
};
