"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ticket_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      content: {
        type: Sequelize.TEXT,
      },
      transaction_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "transaction_types",
          key: "id",
        },
      },
      wallet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "wallet",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
