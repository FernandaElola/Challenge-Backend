'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Genres', [
      {
         name : 'comedia',
         createdAt : new Date,
         updatedAt : new Date
        },
        {
         name : 'animacion',
         createdAt : new Date,
         updatedAt : new Date
        },
        {
         name : 'drama',
         createdAt : new Date,
         updatedAt : new Date
        }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Genres', null, {});
     
  }
};
