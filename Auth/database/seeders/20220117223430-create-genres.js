'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Genres', [
      {
         name : 'comedy',
         image : 'comedy.jpg',
         createdAt : new Date,
         updatedAt : new Date
        },
        {
         name : 'animation',
         image : 'animation.jpg',
         createdAt : new Date,
         updatedAt : new Date
        },
        {
         name : 'drama',
         image : 'drama.jpg',
         createdAt : new Date,
         updatedAt : new Date
        }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Genres', null, {});
     
  }
};
