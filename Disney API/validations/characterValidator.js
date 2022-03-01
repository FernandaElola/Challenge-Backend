const { body } = require("express-validator");

module.exports = [
  body("image").notEmpty().withMessage("Character image is required"),

  body("name")
    .notEmpty()
    .withMessage("Character name is required")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("Name must be 2 characters or longer"),

  body("age")
    .isInt({
      min: 0,
    })
    .withMessage("Must enter a valid age"),

  body("weight")
    .isDecimal({
      min: 0,
    })
    .withMessage("Must enter a valid weight"),

  body("history")
    .notEmpty()
    .withMessage("Character history is required")
    .bail()
    .isLength({
      min: 10,
    })
    .withMessage("History must be 10 characters or longer"),
];
