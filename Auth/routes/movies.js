var express = require('express');
var router = express.Router();
const db = require('./../models');
const { Op } = require('sequelize');
const movie = require('../models/movie');

/* GET movies */
router.get('/movies', function(req, res) {
    db.Movie.findAll({
        attributes : ['image', 'title', 'releaseDate']
    })
    .then(movies => {
        let respuesta = {
            meta: {
                status : 200,
                total: movies.length,
                url: 'movies/movies'
            },
            data: {
                movies
            }
        }
            res.json(respuesta);
        })
    .catch(error => console.log(error))
});

router.get('/detail/:id', function(req, res) {
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
});

//  CRUD Movies

router.post('/create', function(req, res) {
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
});

router.put('/update/:id', function(req, res) {

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
});

router.delete('/destroy/:id', function(req, res) {
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
});

router.get('/', function(req, res) {
    let searchTitle = db.Movie.findAll({
        where: {
            title: {
                [Op.substring]: req.query.name                
            }
        },
        attributes : ['title']
    });

    let searchGenre = db.Movie.findAll({
        where: {
            genreId: {
                [Op.like]: req.query.genre            
            }
        },   
        attributes: ['title']
    });

    // let releaseDate = db.Movie.findAll({
    //     order: [
    //         ['releaseDate', 'ASC'],
    //         ['releaseDate', 'DESC']
    //     ]
    // });

    Promise.all([searchTitle, searchGenre])
    
    .then(([searchTitle, searchGenre]) => {
        let respuesta = {
            meta: {
                status : 200,
                url: 'movies'
            },
            data: {
                searchTitle,
                searchGenre        
            }
        }
            res.json(respuesta);
        })
        .catch(error => console.log(error))
});

module.exports = router;
