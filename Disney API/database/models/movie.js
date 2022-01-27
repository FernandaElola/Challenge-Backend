'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Genre,{
        as : 'movies',
        foreignKey : 'genreId'
      }),
      Movie.belongsToMany(models.Character,{
        through: 'CharacterMovies',
        as : 'movieCharacter',
        foreignKey : 'movieId'
      })
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};