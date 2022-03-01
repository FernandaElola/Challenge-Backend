const { body } = require("express-validator");

module.exports = [
  body("image")
    .notEmpty()
    .withMessage("Character image is required"),

  body("name")
    .notEmpty()
    .withMessage("Character name is required")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("Name must be 2 characters or longer"),

  body("age")
    .isDecimal({
      min: 1,
    })
    .withMessage("Must enter a valid number"),

    body("weight")
    .isDecimal({
      min: 1,
    })
    .withMessage("Must enter a valid number"),

    body('history')
        .notEmpty().withMessage('Character history is required').bail()
        .isLength({
            min : 20
        }).withMessage('History must be 20 characters or longer')
];
