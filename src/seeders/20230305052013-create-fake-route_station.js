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
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        station_id: "6f26f99f-51ab-494b-8b65-911b0e164b0c",
        station_index: 1,
        createdAt: "2023-03-07 10:45:01",
        updatedAt: "2023-03-07 10:45:01",
      },
      {
        id: 2,
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        station_id: "e25c34be-8eda-4688-9e79-24289a186b69",
        station_index: 2,
        createdAt: "2023-03-07 10:45:01",
        updatedAt: "2023-03-07 10:45:01",
      },
      {
        id: 3,
        route_id: "96e01504-4bf3-4429-9b8a-1df25c603177",
        station_id: "e25c34be-8eda-4688-9e79-24289a186b69",
        station_index: 1,
        createdAt: "2023-03-07 10:47:06",
        updatedAt: "2023-03-07 10:47:06",
      },
      {
        id: 4,
        route_id: "96e01504-4bf3-4429-9b8a-1df25c603177",
        station_id: "6f26f99f-51ab-494b-8b65-911b0e164b0c",
        station_index: 2,
        createdAt: "2023-03-07 10:47:06",
        updatedAt: "2023-03-07 10:47:06",
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
