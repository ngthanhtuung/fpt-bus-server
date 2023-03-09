"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.hasMany(models.Trip, { foreignKey: "route_id" });
      Route.belongsToMany(models.Station, { through: "Route_Station" });
    }
  }
  Route.init(
    {
      route_name: DataTypes.STRING,
      departure: DataTypes.STRING,
      destination: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Route",
      tableName: "Route",
    }
  );
  return Route;
};
