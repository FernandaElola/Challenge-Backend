'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsToMany(models.Movie,{
        through: 'CharacterMovies',
        as : 'characterMovie',
        foreignKey : 'characterId'
      })
    }
  }
  Character.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    history: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};