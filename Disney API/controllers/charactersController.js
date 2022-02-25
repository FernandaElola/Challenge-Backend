const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  list: (req, res) => {

    function getCharacterSearch(req) {
      characterSearch = {};

      if (req.query.name) {
        characterSearch.name = {
          [Op.substring]: req.query.name,
        };
      }

      if (req.query.age) {
        characterSearch.age = {
          [Op.like]: req.query.age,
        };
      }

      if (req.query.weight) {
        characterSearch.weight = {
          [Op.like]: req.query.weight,
        };
      }

      return characterSearch;
    }

    db.Character.findAll({
      attributes: ["name", "image"],
      where: getCharacterSearch(req),
      // include: req.query.movie ? 
      //     [
      //       {
      //         model: db.Movie,
      //         through: "CharacterMovies",
      //         as: "characterMovie",
      //         where: {
      //             id: {
      //               [Op.like]: req.query.movie,
      //             },                
      //         },
      //       },
      //     ]
      //   : null,
    })

      .then((data) => {
        let response = {
          meta: {
            status: 200,
            url: "characters",
          },
          data: {
            data
          },
        };
        res.json(response);
      })
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    const { image, name, age, weight, history } = req.body;

    db.Character.create({
      image: image,
      name: name.trim(),
      age: +age,
      weight: +weight,
      history: history.trim(),
    })

      .then((data) => {
        let response = {
          meta: {
            status: 200,
            url: "characters/create",
          },
          data: {
            data
          },
        };
        res.json(response);
      })
      .catch((error) => console.log(error));
  },
  update: (req, res) => {
    const { image, name, age, weight, history } = req.body;

    db.Character.update(
      {
        image: image,
        name: name.trim(),
        age: +age,
        weight: +weight,
        history: history.trim(),
        },
        {
          where: { id: req.params.id },
        }
    )
      .then((data) => {
        let response = {
          meta: {
            status: 200,
            url: "characters/update/:id",
          },
          data: {
            data
          },
        };
        res.json(response);
      })
      .catch((error) => console.log(error));
  },
  destroy: (req, res) => {
    console.log(req.params.id);
    db.Character.destroy({
      where: { id: req.params.id },
    })
      .then((data) => {
        let response = {
          meta: {
            status: 200,
            url: "characters/destroy/:id",
          },
          data: {
            data,
          },
        };
        res.json(response);
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Character.findOne({
      where: { id: req.params.id },
      attributes: ["image", "name", "age", "weight", "history"],
      include: [
        {
          model: db.Movie,
          through: "CharacterMovies",
          as: "characterMovie",
          attributes: ["title"],
        },
      ],
    })
      .then((data) => {
        let response = {
          meta: {
            status: 200,
            url: "characters/detail/:id",
          },
          data: {
            data
          },
        };
        res.json(response);
      })
      .catch((error) => console.log(error));
  },
};
