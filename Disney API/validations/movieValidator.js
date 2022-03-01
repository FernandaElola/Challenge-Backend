const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("image").notEmpty().withMessage("Movie image is required"),

  body("title")
    .notEmpty()
    .withMessage("Movie title is required")
    .bail()
    .isLength({
      min: 2,
    })
    .withMessage("Title must be 2 characters or longer"),

  body("releaseDate").isDate().withMessage("Must enter a valid date"),

  body("rating")
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage("Debe ingresar un valor entre 1 y 5"),

  body("genreId").custom((value) => {
    return db.Genre.findOne({
      where: {
        genreId: value,
      },
    })
      .then((genreId) => {
        if (genreId) {
          return Promise.resolve();
        }
      })
      .catch(() =>
        Promise.reject("Must enter a genre registered in the database")
      );
  }),
];
