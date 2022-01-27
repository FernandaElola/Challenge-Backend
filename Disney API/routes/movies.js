var express = require('express');
var router = express.Router();
const movieValidator = require('../validations/movieValidator');

const {moviesList, detail, create, update, destroy} = require('../controllers/moviesController');

router
.get('/', moviesList)
.get('/detail/:id', detail)
.post('/create', movieValidator, create)
.put('/update/:id', movieValidator, update)
.delete('/destroy/:id', destroy)
   
module.exports = router;
