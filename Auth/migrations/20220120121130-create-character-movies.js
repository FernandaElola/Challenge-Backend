'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CharacterMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: "Characters"
          },
          key : 'id'
        }
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: "Movies"
          },
          key : 'id'
        }
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
    await queryInterface.dropTable('CharacterMovies');
  }
};