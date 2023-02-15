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
    return queryInterface.bulkInsert("Users", [
      {
        id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
        fullname: "Nguyen Thanh Tung",
        email: "tungntse151167@fpt.edu.vn",
        phone_number: "0868649875",
        student_id: "SE151167",
        status: true,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4eb76978-2c07-47ea-87eb-d4484c5b6acd",
        fullname: "Nguyễn Hoàng Tân",
        email: "tannhse151046@fpt.edu.vn",
        phone_number: "0868999999",
        student_id: "SE151046",
        status: true,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
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
  },
};
