const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const db = require("../database/models");

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("Characters tests", () => {
  // it("should get all characters name and image", (done) => {
  //   chai
  //     .request(app)
  //     .get("/characters")
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res).to.have.property("body");
  //       expect(res.body).to.have.property("data")
  //       expect(res.body.data.data).to.be.an('array');
  //       done();
  //     });
  // });

  it("should send error message if body info is incorrect or missing", (done) => {
    const character = {
      image: "character.jpg",
      name: null,
      age: 2,
      weight: 10,
      history: "character's history",
    };

    chai
      .request(app)
      .post("/characters/create")
      .send(character)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.nested.property("data.data");
        expect(res.body)
          .to.deep.nested.property("data.data.name")
          .eq("newCharacter");
        done();
      });
  });

  it("should return an error if the character doesn't exist", (done) => {
    chai
      .request(app)
      .get("/characters/detail/-1")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.eq("The character doesn't exist");
        done();
      });
  });
});

// describe("Test Character", function () {
//   it("Should create a new caracter", function (done) {
//     db.Character.create({
//       image: "characterTest.jpg",
//       name: "characterTest",
//       age: 2,
//       weight: 10,
//       history: "test character´s history",
//     }).then(function (character) {
//       expect(character.name).to.be.equal("characterTest");
//     });
//     done();
//   });

// describe("POST /register", function () {
//   it("register a new user", function (done) {
//     db.User.create({
//       first_name: "name",
//       last_name: "lastname",
//       email: "emailemail@gmail.com",
//       password: "123123",
//     }).then(function (user) {
//       expect(user.name).to.be.equal('name');
//     });
//     done();
//   });
// });

// describe("POST /login", function () {
//   it("Should success if credential is valid", function (done) {
//     let data = {
//       email: "email@gmail.com",
//       password: "123123",
//     };
//     request(app).post("/auth/login").send(data).expect(200).end(done);
//   });
// });

// describe("GET /characters", function () {
//   it("Shows characters list", function (done) {
//     request(app)
//       .get("/characters")
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
