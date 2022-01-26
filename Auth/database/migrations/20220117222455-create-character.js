'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING, //temporary info for images
        allowNull : false
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      age: {
        type: Sequelize.DECIMAL,
        allowNull : false
      },
      weight: {
        type: Sequelize.DECIMAL,
        allowNull : false
      },
      history: {
        type: Sequelize.STRING(500),
        allowNull : false
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
    await queryInterface.dropTable('Characters');
  }
};