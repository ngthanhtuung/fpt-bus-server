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
        id: 44,
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        station_id: "6f26f99f-51ab-494b-8b65-911b0e164b0c",
        station_index: 1,
        createdAt: "2023-03-21 11:23:54",
        updatedAt: "2023-03-21 11:23:54"
      },
      {
        id: 45,
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        station_id: "e25c34be-8eda-4688-9e79-24289a186b69",
        station_index: 2,
        createdAt: "2023-03-21 11:23:54",
        updatedAt: "2023-03-21 11:23:54"
      },
      {
        id: 49,
        route_id: "da8f9218-d941-488e-b78a-f499d038294b",
        station_id: "bc74c575-9bb2-4a57-b5d1-a4dc10446f3d",
        station_index: 1,
        createdAt: "2023-03-23 19:06:52",
        updatedAt: "2023-03-23 19:06:52"
      },
      {
        id: 51,
        route_id: "5405def9-2f0b-4117-80da-f4010593b2d0",
        station_id: "bc74c575-9bb2-4a57-b5d1-a4dc10446f3d",
        station_index: 1,
        createdAt: "2023-03-23 19:16:20",
        updatedAt: "2023-03-23 19:16:20"
      }
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
