'use strict';


const Helper = require('../helper/helper');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ADMIN_PASSWORD = "Admin123"
    const HASHED_ADMIN_PASSWORD = await Helper.passwordHasher(ADMIN_PASSWORD)
    await queryInterface.bulkInsert("Users", [
      {
        username: "Clifford William",
        password: HASHED_ADMIN_PASSWORD,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
