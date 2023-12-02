'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commenter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model:"Users",key:"id"}
      },
      commented_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model:"Users",key:"id"}
      },
      is_positive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};