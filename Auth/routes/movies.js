var express = require('express');
var router = express.Router();

const {moviesList, detail, create, update, destroy} = require('../controllers/moviesController');

router
.get('/', moviesList)
.get('/detail/:id', detail)
.post('/create', create)
.put('/update/:id', update)
.delete('/destroy/:id', destroy)
   
module.exports = router;
