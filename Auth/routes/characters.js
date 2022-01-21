var express = require('express');
var router = express.Router();
const db = require('./../models');
const { Op } = require('sequelize')

/* GET characters listing. */
router.get('/', function(req, res) {
    res.send('characters');
  });

router.get('/characters', function(req, res) {
    db.Character.findAll({
        attributes : ['name', 'image']
    })
    .then(characters => {
        let respuesta = {
            meta: {
                status : 200,
                total: characters.length,
                url: 'characters/characters'
            },
            data: {
                characters
            }
        }
            res.json(respuesta);
        })
});

//  CRUD Characters

router.post('/create', function(req, res) {
    const {image, name, age, weigth, history} = req.body;

    db.Character.create({
        image : image,
        name : name.trim(),
        age : +age,
        weigth: weigth.trim(),
        history: history.trim()
    })
});

// AGREGAR ?_method=PUT a la URI
router.put('/update/:id', function(req, res) {

    const {image, name, age, weigth, history} = req.body;

    db.Character.update({
        image : image,
        name : name.trim(),
        age : +age,
        weigth: weigth.trim(),
        history: history.trim()
    },
    {
        where: {id: req.params.id}
    })
    console.log(req.params.id);
    console.log(name);
});

// AGREGAR ?_method=DELETE a la URI
router.delete('/destroy/:id', function(req, res) {
    console.log(req.params.id);
    db.Character.destroy(
        {
            where: {id: req.params.id}
        })
});

router.get('/detail/:id', function(req, res) {
    db.Character.findOne({
        where : {id : req.params.id},
        attributes : ['image', 'name', 'age', 'weight', 'history'],          
        include: [
            { association : 'characterMovie',
              attributes: ['title'] 
            }            
        ]
    })
    .then(characterDetail => {
        let respuesta = {
            meta: {
                status : 200,
                url: 'characters/detail/:id'
            },
            data: {
                characterDetail
            }
        }
            res.json(respuesta);
        })
        .catch(error => console.log(error))
});

router.get('/search', function(req, res) {
    db.Character.findAll({
        where: {
            name: {
                [Op.substring]: req.query.name                
            }
        },
        attributes : ['name']
    }).then(searchName => {
        let respuesta = {
            meta: {
                status : 200,
                url: 'characters/search'
            },
            data: {
                searchName
            }
        }
            res.json(respuesta);
        })
        .catch(error => console.log(error))
});

router.get('/filter', function(req, res) {
    db.Character.findAll({
        where: {
            age: {
                [Op.substring]: req.params.age
            }
        },
        attributes : ['name']
    }).then(searchAge => {
        let respuesta = {
            meta: {
                status : 200,
                url: 'characters/filter'
            },
            data: {
                searchAge
            }
        }
            res.json(respuesta);
        })
        .catch(error => console.log(error))
});

module.exports = router;
