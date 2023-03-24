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
    return queryInterface.bulkInsert("Station", [

      {
        id: "693316da-7934-4347-adc2-314371b6a283",
        station_name: "FPT Software F-Town 3",
        longitude: "106.8061947",
        latitude: "10.8362668",
        status: 1,
        createdAt: "2023-03-20 16:27:00",
        updatedAt: "2023-03-21 14:28:49"
      },
      {
        "id": "6f26f99f-51ab-494b-8b65-911b0e164b0c",
        station_name: "C6 Apartment",
        longitude: "106.7969946",
        latitude: "10.8481729",
        status: 1,
        createdAt: "2023-02-27 12:55:30",
        updatedAt: "2023-02-27 05:55:30"
      },
      {
        "id": "a3fef2dc-b42e-450e-8b4a-dfb17bc703c3",
        station_name: "HCMC University of Education Student Dormitory",
        longitude: "106.6423002",
        latitude: "10.7716603",
        status: 1,
        createdAt: "2023-02-27 12:56:32",
        updatedAt: "2023-02-27 05:56:32"
      },
      {
        "id": "bc74c575-9bb2-4a57-b5d1-a4dc10446f3d",
        station_name: "Vinhomes Grand Park",
        longitude: "106.828426",
        latitude: "10.8372245",
        status: 1,
        createdAt: "2023-02-27 12:59:47",
        updatedAt: "2023-03-21 14:28:51"
      },
      {
        "id": "e25c34be-8eda-4688-9e79-24289a186b69",
        station_name: "University of Transportation",
        longitude: "106.7919828",
        latitude: "10.8457017",
        status: 1,
        createdAt: "2023-02-27 12:58:53",
        updatedAt: "2023-03-21 14:28:52"
      },
      {
        "id": "fa91cc94-35bf-4f7c-8340-8c50b7892146",
        station_name: "FPT University",
        longitude: "106.8076943",
        latitude: "10.8411329",
        status: 1,
        createdAt: "2023-02-27 12:57:30",
        updatedAt: "2023-02-27 05:57:30"
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
    return queryInterface.bulkDelete("Station", null, {});
  },
};
