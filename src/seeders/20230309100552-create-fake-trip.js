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
    return queryInterface.bulkInsert("Trip", [

      {
        id: "367874ae-b2c6-4797-a665-11cc89c6c95f",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "09:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "3dae0e80-323d-48b0-a10c-edc9e3d25978",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "12:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "4633f8eb-d18a-4888-b84b-e274950ed873",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "12:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "54336bc1-8e11-4935-8df8-dfb112104257",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "12:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "5c5e7b2d-b27d-4f28-8571-7becee5cc8a7",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "13:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "5e9a0a5f-f05e-4d45-b02a-7ec23ebfdf71",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "10:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "65a9c312-6986-4006-8f25-2a8e01acace2",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "13:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "69fd37e1-146d-4f28-8501-52777cb6ec5e",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "07:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "70257158-71bf-4596-b28f-e9a78ea4bfaf",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "09:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "706b9eee-7f9e-4466-b9f6-cd2c294c259a",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "09:50:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "7f883278-eb7b-4d6f-b295-d6e04277ae56",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "09:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "857be9d7-1b37-4886-bdbf-d62c178ecf16",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "07:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "86db81b6-e9de-4e67-93c9-1e71f96b4c1a",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "13:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "8876f931-a1d4-448b-b666-af6d6e35bb78",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "10:10:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "92459395-93a0-4f0a-88b1-0d781295e3a4",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "10:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "a44ad5dd-ba5c-4318-8417-1a5e94ced319",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "13:50:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "a6c128ff-5111-4867-bd63-b4d8d17e89ff",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "09:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b315d2d2-3ca4-4551-a5f6-991d4276b654",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "12:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b397cb87-d59f-434f-8ac9-c87363733396",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "10:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b582a842-732a-4981-930d-595851a53b7c",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "09:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b68366be-2f38-4e63-8a6e-7d85573d3006",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-12",
        departure_time: "09:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b833ecfc-7e98-451e-8ce1-29872e10bd67",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "09:10:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "b9a7746c-f132-450a-84da-f4d70535fdac",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-13",
        departure_time: "09:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "be0d929b-de8c-4c85-ac78-27d0b1d4d2c2",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "13:50:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "ce46b5f2-24ef-40f2-9739-9d43e1cb72e4",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "09:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "d7141774-9784-403b-a09a-f62b403ee1ae",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "07:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "d870e38a-56d4-4fb2-8908-fb78a373aeeb",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-09",
        departure_time: "10:10:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "dbe5010d-5dac-4c2e-869e-560251b4afae",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "07:00:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "dd031278-d310-47c3-9b24-09ddb40bd58e",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-08",
        departure_time: "12:00:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
      },
      {
        id: "e040cbba-6062-4b61-a536-1eb5f75bd9d5",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        departure_date: "2023-03-10",
        departure_time: "07:00:00",
        ticket_quantity: 40,
        status: 1,
        createdAt: "2023-03-09 10:10:36",
        updatedAt: "2023-03-09 10:10:36"
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
    return queryInterface.bulkDelete("Trip", null, {});
  }
};
