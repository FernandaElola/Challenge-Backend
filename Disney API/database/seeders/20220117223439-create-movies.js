'use strict';

let movies = [  
  {
     "image": "plane-crazy.jpg",
     "title": "Plane Crazy",
     "releaseDate": "1928-01-01",
     "rating" : 4,
     "genreId": 1,
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "image": "how-to play-football.png",
      "title": "How to Play Football",
      "releaseDate": "1944-05-09",
      "rating" : 5,
      "genreId": 2,
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "image": "the-wise-little-hen.png",
      "title": "The Wise Little Hen",
      "releaseDate": "1934-09-06",
      "rating" : 3,
      "genreId": 3,
      createdAt : new Date,
      updatedAt : new Date
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Movies', movies, {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('Movies', null, {});
    
  }
};

