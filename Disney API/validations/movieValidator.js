const { body } = require("express-validator");

module.exports = [
  body("rating")
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage("Debe ingresar un valor entre 1 y 5"),
];
