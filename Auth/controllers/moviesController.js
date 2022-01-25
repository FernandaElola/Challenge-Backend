const db = require('../database/models');
const { Op } = require('sequelize')

module.exports = {
    moviesList : (req, res) => {
        db.Movie.findAll({
            attributes : ['image', 'title', 'releaseDate']
        })
        function getMovieSearch(req) {
            movieSearch = {};
            
            if (req.query.name) {
              movieSearch.title = {
                [Op.substring]: req.query.name,
              };
            }
            
            if (req.query.genre) {
              movieSearch.genreId = {
                [Op.like]: req.query.genre,
              };
            }
           
            if (req.query.order) {
              movieSearch.releaseDate = {
                [Op.like]: req.query.order
              };
            }

            // order : [
               // ["title",req.query.order && req.query.order.toUpperCase() == "DESC" ? req.query.order : "ASC"]
            //]
      
            return movieSearch;
          }
      
        db.Movie.findAll(
          {
            where: getMovieSearch(req),
          },
        )
      
          .then(data => {
            let respuesta = {
              meta: {
                status: 200,
                url: "movies",
              },
              data: {
                data
              },
            };
            res.json(respuesta);
          })
          .catch((error) => console.log(error));      
    },
    detail : (req, res) => {
        db.Movie.findOne({
            where : {id : req.params.id},
            attributes : ['image', 'title', 'releaseDate', 'rating'],          
            include: {
                model: db.Character,
                through: 'CharacterMovies',
                as : 'movieCharacter',
                attributes: ['name']
              }
        })
        .then(movieDetail => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'movies/detail/:id'
                },
                data: {
                    movieDetail
                }
            }
                res.json(respuesta);
            })
        .catch(error => console.log(error))
    },
    create : (req, res) => {
        const {image, title, releaseDate, rating, genreId} = req.body;
    
        db.Movie.create({
            image : image,
            title : title.trim(),
            releaseDate : releaseDate,
            rating: +rating,
            genreId: +genreId
        })
        .then(create => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'movies/create'
                },
                data: {
                    create
                }
            }
                res.json(respuesta);
            })
        .catch(error => console.log(error))
    },
    update : (req, res) => {

        const {image, title, releaseDate, rating, genreId} = req.body;
    
        db.Movie.update({
            image : image,
            title : title.trim(),
            releaseDate : releaseDate,
            rating: +rating,
            genreId: +genreId
        },
        {
            where: {id: req.params.id}
        })
        
        .then(data => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'movies/update/:id'
                },
                data: {
                    data     
                }
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    destroy : (req, res) => {
        db.Movie.destroy(
            {
                where: {id: req.params.id}
            })
        .then(destroy => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'movies/destroy/:id'
                },
                data: {
                    destroy
                }
            }
                res.json(respuesta);
            })
        .catch(error => console.log(error))
    }
}