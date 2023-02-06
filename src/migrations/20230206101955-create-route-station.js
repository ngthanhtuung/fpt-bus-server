"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("route_stations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      route_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "routes",
          key: "id",
        },
      },
      station_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "stations",
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
    await queryInterface.dropTable("route_stations");
  },
};
