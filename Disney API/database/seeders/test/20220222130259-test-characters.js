'use strict';

let characters = [  
  {
     "image": "mickey.jpg",
     "name": "Mickey Mouse Test",
     "age": 95,
     "weight" : 6,
     "history": "Mickey Mouse is a cartoon character created in 1928 by Walt Disney, and is the mascot of The Walt Disney Company. An anthropomorphic mouse who typically wears red shorts, large yellow shoes, and white gloves, Mickey is one of the world's most recognizable fictional characters.",
     createdAt : new Date,
     updatedAt : new Date
  },
  {
      "image": "goofy.png",
      "name": "Goofy Test",
      "age": 11,
      "weight" : 10,
      "history": "Goofy is a cartoon character created by The Walt Disney Company. He is a tall, anthropomorphic dog who typically wears a turtle neck and vest, with pants, shoes, white gloves, and a tall hat originally designed as a rumpled fedora.",
      createdAt : new Date,
      updatedAt : new Date
  },
  {
      "image": "donald.png",
      "name": "Donald Duck Test",
      "age": 86,
      "weight" : 6,
      "history": "Donald Fauntleroy Duck is a cartoon character created by The Walt Disney Company. Donald is an anthropomorphic white duck with a yellow-orange bill, legs, and feet. He typically wears a sailor shirt and cap with a bow tie. Donald is known for his semi-intelligible speech and his mischievous, temperamental, and pompous personality.",
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
