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
    return queryInterface.bulkInsert("Route", [
      {
        id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        route_name: "Tuyến 1",
        departure: "FPT University",
        destination: "HCMC University of Education Student Dormitory",
        status: 1,
        createdAt: "2023-03-07 03:45:01",
        updatedAt: "2023-03-21 06:05:06"
      },
      {
        id: "5405def9-2f0b-4117-80da-f4010593b2d0",
        route_name: "Tuyến 6",
        departure: "FPT University",
        destination: "FPT Software F-Town 3",
        status: 1,
        createdAt: "2023-03-23 12:16:06",
        updatedAt: "2023-03-23 12:16:20"
      },
      {
        id: "7ce3468d-3b09-464c-aecd-510180776775",
        route_name: "Tuyến 4",
        departure: "HCMC University of Education Student Dormitory",
        destination: "FPT University",
        status: 1,
        createdAt: "2023-03-23 11:21:59",
        updatedAt: "2023-03-23 11:21:59"
      },
      {
        id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        route_name: "Tuyến 2",
        departure: "FPT University",
        destination: "Vinhomes Grand Park",
        status: 1,
        createdAt: "2023-03-07 03:47:44",
        updatedAt: "2023-03-23 12:06:14"
      },
      {
        id: "da8f9218-d941-488e-b78a-f499d038294b",
        route_name: "Tuyến 5",
        departure: "FPT Software F-Town 3",
        destination: "FPT University",
        status: 0,
        createdAt: "2023-03-23 12:06:36",
        updatedAt: "2023-03-23 12:15:41"
      },
      {
        id: "e7b8b1f7-82bd-4105-ba92-46bc06e66a54",
        route_name: "Tuyến 3",
        departure: "Vinhomes Grand Park",
        destination: "FPT University",
        status: 1,
        createdAt: "2023-03-23 10:07:22",
        updatedAt: "2023-03-23 11:15:17"
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
    return queryInterface.bulkDelete("Route", null, {});
  },
};
