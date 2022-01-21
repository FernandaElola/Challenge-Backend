var express = require('express');
var router = express.Router();
const db = require('./../models');

/* GET movies */
router.get('/', function(req, res) {
    db.Movie.findAll({
        attributes : ['image', 'title', 'releaseDate']
    })
    .then(movies => {
        let respuesta = {
            meta: {
                status : 200,
                total: movies.length,
                url: 'movies'
            },
            data: {
                movies
            }
        }
            res.json(respuesta);
        })
});

router.get('/detail/:id', function(req, res) {
    db.Movie.findOne({
        where : {id : req.params.id},
        attributes : ['image', 'title', 'releaseDate', 'rating'],          
        include: {
            model: db.Genre,
            as: 'movies',
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
});

// AGREGAR ?_method=PUT a la URI
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
});

// AGREGAR ?_method=DELETE a la URI
router.delete('/destroy/:id', function(req, res) {
    db.Movie.destroy(
        {
            where: {id: req.params.id}
        })
});

router.get('/search/:name', function(req, res) {
    db.Movie.findAll({
        where: {
            title: {
                [Op.substring]: req.params.title                
            }
        },
        attributes : ['title']
    }).then(searchTitle => {
        let respuesta = {
            meta: {
                status : 200,
                url: 'characters/search/:title'
            },
            data: {
                searchTitle
            }
        }
            res.json(respuesta);
        })
        .catch(error => console.log(error))
});

module.exports = router;
