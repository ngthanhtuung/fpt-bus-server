"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Station:
   *       type: object
   *       required:
   *         - id
   *         - station_name
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the station
   *         station_name:
   *           type: string
   *           description: The name of the station
   *         longitude:
   *           type: string
   *           description: The longitude of the station
   *         latitude:
   *           type: string
   *           description: The latitude of the station
   *         status:
   *           type: boolean
   *           description: The status of the station
   *       example:
   *         id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         station_name: FPT University
   *         longitude: 21.0234
   *         latitude: 105.2345
   *         status: true
   */
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init(
    {
      station_name: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
