"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route_Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Route.belongsToMany(models.Station, { through: "Route_Station" });
      models.Station.belongsToMany(models.Route, { through: "Route_Station" });
    }
  }
  Route_Station.init(
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
