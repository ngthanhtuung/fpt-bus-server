"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     TransactionType:
   *       type: object
   *       required:
   *         - id
   *         - type_name
   *       properties:
   *         id:
   *          type: integer
   *          description: The auto-generated id of the transaction type
   *         type_name:
   *           type: string
   *           description: The name of the transaction type
   *       example:
   *         id: 1
   *         type_name: Payment
   */
  class TransactionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionType.hasMany(models.Transaction, {
        foreignKey: "transaction_type_id",
      });
    }
  }
  TransactionType.init(
    {
      type_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionType",
    }
  );
  return TransactionType;
};
