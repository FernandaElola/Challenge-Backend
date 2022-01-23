var express = require('express');
var router = express.Router();

const {register, login} = require('../controllers/usersController');

router
.post('/register', register)
.post('/login', login)

module.exports = router;
