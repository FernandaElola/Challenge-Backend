'use strict';

let movies = [  
  {
     "image": "plane-crazy.jpg",
     "title": "Plane Crazy",
     "releaseDate": "1928-01-01",
     "rating" : 7,
     "genreId": 1,
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "image": "goofy.png",
      "title": "Goofy Movie",
      "releaseDate": "1943-01-01",
      "rating" : 5,
      "genreId": 2,
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "image": "donald.png",
      "title": "Donald Duck Movie",
      "releaseDate": "1996-01-01",
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

