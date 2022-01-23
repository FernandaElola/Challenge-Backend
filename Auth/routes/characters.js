var express = require("express");
var router = express.Router();
const db = require("./../models");
const { Op } = require("sequelize");

/* GET characters listing. */

router.get("/characters", function (req, res) {
  db.Character.findAll({
    attributes: ["name", "image"],
  })
    .then((characters) => {
      let respuesta = {
        meta: {
          status: 200,
          total: characters.length,
          url: "characters/characters",
        },
        data: {
          characters,
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
});

//  CRUD Characters

router.post("/create", function (req, res) {
  const { image, name, age, weight, history } = req.body;

  db.Character.create({
    image: image,
    name: name.trim(),
    age: +age,
    weight: +weight,
    history: history.trim(),
  })

    .then((data) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "characters/create",
        },
        data: {
          data,
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
});

router.put("/update/:id", function (req, res) {
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
      let respuesta = {
        meta: {
          status: 200,
          url: "characters/update/:id",
        },
        data: {
          data,
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
});

router.delete("/destroy/:id", function (req, res) {
  console.log(req.params.id);
  db.Character.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "characters/destroy/:id",
        },
        data: {
          data,
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
});

router.get("/detail/:id", function (req, res) {
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
    .then((characterDetail) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "characters/detail/:id",
        },
        data: {
          characterDetail,
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
});

router.get("/", function (req, res) { 

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

    //   if (req.query.idMovie) {
    //     characterSearch.idMovie = {
    //       [Op.like]: req.query.idMovie,
    //     };
    //   }

      return characterSearch;
    }

  db.Character.findAll(
    {
      where: getCharacterSearch(req),
    },
  )

    .then(searchResults => {
      let respuesta = {
        meta: {
          status: 200,
          url: "characters",
        },
        data: {
          searchResults
        },
      };
      res.json(respuesta);
    })
    .catch((error) => console.log(error));
})

  module.exports = router;
