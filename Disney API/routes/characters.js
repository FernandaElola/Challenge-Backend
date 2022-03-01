var express = require("express");
var router = express.Router();
const characterValidator = require('../validations/characterValidator');

const {list, create, update, destroy, detail} = require('../controllers/charactersController');

router
.get('/', list)
.post('/create', characterValidator, create)
.put('/update/:id', characterValidator, update)
.delete('/destroy/:id', destroy)
.get('/detail/:id', detail)

  module.exports = router;
