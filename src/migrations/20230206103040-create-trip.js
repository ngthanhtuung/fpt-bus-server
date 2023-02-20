"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Trip", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      route_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Route",
          key: "id",
        },
      },
      departure: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      bus_id: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: "Bus",
          key: "id",
        },
      },
      ticket_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        minVal: 0,
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
    await queryInterface.dropTable("Trip");
  },
};
