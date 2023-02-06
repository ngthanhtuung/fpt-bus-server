"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Route:
   *       type: object
   *       required:
   *         - id
   *         - departure
   *         - destination
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the route
   *         departure:
   *           type: string
   *           description: The departure of the route
   *         destination:
   *           type: string
   *           description: The destination of the route
   *         status:
   *           type: boolean
   *           description: The status of the route
   *       example:
   *         id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         departure: FPT University
   *         destination: Vinhomes Grank Park
   *         status: true
   */

  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.hasMany(models.Trip, { foreignKey: "route_id" });
    }
  }
  Route.init(
    {
      departure: DataTypes.STRING,
      destination: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};
