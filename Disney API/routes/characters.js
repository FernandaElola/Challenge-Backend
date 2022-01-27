var express = require("express");
var router = express.Router();

const {list, create, update, destroy, detail} = require('../controllers/charactersController');

router
.get('/', list)
.post('/create', create)
.put('/update/:id', update)
.delete('/destroy/:id', destroy)
.get('/detail/:id', detail)

  module.exports = router;
