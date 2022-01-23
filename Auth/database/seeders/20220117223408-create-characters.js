'use strict';

let characters = [  
  {
     "image": "mickey.jpg",
     "name": "Mickey Mouse",
     "age": 95,
     "weight" : 1,
     "history": "mickey mouse is a mouse",
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "image": "goofy.png",
      "name": "Goofy",
      "age": 11,
      "weight" : 40,
      "history": "goofy is a dog",
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "image": "donald.png",
      "name": "Donald Duck",
      "age": 86,
      "weight" : 3,
      "history": "donald is a duck",
      createdAt : new Date,
      updatedAt : new Date
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Characters', characters, {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('Characters', null, {});
    
  }
};
