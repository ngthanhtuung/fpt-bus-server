"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Route_Stations", [
      {
        id: 1,
        route_id: "339fa8f1-e526-489e-93ae-70d615caafe6",
        station_id: "a3fef2dc-b42e-450e-8b4a-dfb17bc703c3",
        createdAt: "2023-03-03 21:52:44",
        updatedAt: "2023-03-03 21:52:44",
        station_index: 1,
      },
      {
        id: 2,
        route_id: "339fa8f1-e526-489e-93ae-70d615caafe6",
        station_id: "e25c34be-8eda-4688-9e79-24289a186b69",
        createdAt: "2023-03-03 21:52:44",
        updatedAt: "2023-03-03 21:52:44",
        station_index: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Route_Stations", null, {});
  },
};
