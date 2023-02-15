"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Transaction:
   *       type: object
   *       required:
   *         - id
   *         - ticket_id
   *         - content
   *         - transaction_type_id
   *         - wallet_id
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the transaction
   *         ticket_id:
   *           type: string
   *           description: The id of the ticket
   *         content:
   *           type: string
   *           description: The content of the transaction
   *         transaction_type_id:
   *           type: integer
   *           description: The id of the transaction type
   *         wallet_id:
   *           type: string
   *           description: The id of the wallet
   *       example:
   *         id: 1
   *         ticket_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   *         content: "Buy ticket successfully"
   *         transaction_type_id: 1
   *         wallet_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd"
   */
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet, { foreignKey: "wallet_id" });
      Transaction.belongsTo(models.Ticket, { foreignKey: "ticket_id" });
      Transaction.belongsTo(models.TransactionType, {
        foreignKey: "transaction_type_id",
      });
    }
  }
  Transaction.init(
    {
      ticket_id: DataTypes.STRING,
      content: DataTypes.TEXT,
      transaction_type_id: DataTypes.INTEGER,
      wallet_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
