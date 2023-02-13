"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     RoleTypes:
   *       type: object
   *       required:
   *         - id
   *         - role_name
   *         - status
   *       properties:
   *         id:
   *          type: integer
   *          description: The auto-generated id of the role type
   *         role_name:
   *           type: string
   *           description: The name of the role type
   *         status:
   *          type: boolean
   *          description: The status of the role type
   *       example:
   *         id: 1
   *         role_type: Student
   *         status: true
   */
  class RoleTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleTypes.hasMany(models.Users, { foreignKey: "role_id" });
    }
  }
  RoleTypes.init(
    {
      role_name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RoleTypes",
    }
  );
  return RoleTypes;
};
