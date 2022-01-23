'use strict';

let characterMovies = [  
  {
     "characterId" : 1,
     "movieId": 1,
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "characterId" : 2,
      "movieId": 2,
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "characterId" : 3,
      "movieId": 3,
      createdAt : new Date,
      updatedAt : new Date
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('CharacterMovies', characterMovies, {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('CharacterMovies', null, {});
    
  }
};
