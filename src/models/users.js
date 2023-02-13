"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - id
   *         - fullname
   *         - role_id
   *       properties:
   *         id:
   *          type: integer
   *          description: The auto-generated id of the role type
   *         fullname:
   *           type: string
   *           description: The name of the user
   *         email:
   *           type: string
   *           description: The email of the user
   *         phone_number:
   *           type: string
   *           description: The phone number of the user
   *         student_id:
   *           type: string
   *           description: The student id of the user
   *         status:
   *           type: boolean
   *           description: The status of the user
   *         role_id:
   *            type: integer
   *            description: The id of the role type
   *       example:
   *         id: 1
   *         fullname: "Nguyen Van A"
   *         email: "nguyenvana@fpt.edu.vn"
   *         phone_number: "0123456789"
   *         student_id: "B1700001"
   *         status: true
   *         role_id: 1
   */

  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.RoleTypes, { foreignKey: "role_id" });
      Users.hasMany(models.Bus, { foreignKey: "driver_id" });
      Users.hasMany(models.Ticket, { foreignKey: "user_id" });
      Users.hasOne(models.Wallet, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      student_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
