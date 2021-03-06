const db = require('../database/models');
const { Op } = require('sequelize')
const {validationResult} = require('express-validator');

module.exports = {
    moviesList : (req, res) => {

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
            return movieSearch;
          }
      
        db.Movie.findAll(
          {
            attributes : ['image', 'title', 'releaseDate'],
            where: getMovieSearch(req),
            order : [
                ["releaseDate", req.query.order == "DESC" ? req.query.order : "ASC"]
            ]
          },
        )
      
          .then(data => {
            let response = {
              meta: {
                status: 200,
                url: "movies",
              },
              data: {
                data
              },
            };
            res.json(response);
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
        .then(data => {
            let response = {
                meta: {
                    status : 200,
                    url: 'movies/detail/:id'
                },
                data: {
                    data
                }
            }
                res.json(response);
            })
        .catch(error => console.log(error))
    },
    create : (req, res) => {

        let errors = validationResult(req);
        
        if(errors.isEmpty()){

        const {image, title, releaseDate, rating, genreId} = req.body;
    
        db.Movie.create({
            image : image,
            title : title.trim(),
            releaseDate : releaseDate,
            rating: +rating,
            genreId: +genreId
        })
        .then((data) => {
            let response = {
                meta: {
                    status : 200,
                    url: 'movies/create'
                },
                data: {
                    data
                }
            }
                res.json(response);
            })
        .catch(error => console.log(error))
        
    }else{
        let response = {
            meta: {
                status : 400,
                errors: errors.mapped()
            }
        }
        res.status(400).json(response);
    }
    },
    update : (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){

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
        
        .then((data) => {
            let response = {
                meta: {
                    status : 200,
                    url: 'movies/update/:id'
                },
                data: {
                    data     
                }
            }
                res.json(response);
            })
            .catch(error => console.log(error))
        }else{
            let response = {
                meta: {
                    status : 400,
                    errors: errors.mapped()
                }
            }
            res.status(400).json(response);
        }
    },
    destroy : (req, res) => {
        db.Movie.destroy(
            {
                where: {id: req.params.id}
            })
        .then((data) => {
            let response = {
                meta: {
                    status : 200,
                    url: 'movies/destroy/:id'
                },
                data: {
                    data
                }
            }
                res.json(response);
            })
        .catch(error => console.log(error))
    }
}