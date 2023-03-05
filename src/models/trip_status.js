"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip_Status.hasMany(models.Trip, { foreignKey: "status_id" });
    }
  }
  Trip_Status.init(
    {
      status_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trip_Status",
      tableName: "Trip_Status",
    }
  );
  return Trip_Status;
};
