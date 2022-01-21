'use strict';

let movies = [  
  {
     "image": "plane-crazy.jpg",
     "title": "Plane Crazy",
     "releaseDate": 1/1/1928,
     "rating" : 7,
     "genreId": 1,
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "image": "goofy.png",
      "title": "Goofy Movie",
      "releaseDate": 2/2/1943,
      "rating" : 5,
      "genreId": 2,
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "image": "donald.png",
      "title": "Donald Duck Movie",
      "releaseDate": 3/3/1096,
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

