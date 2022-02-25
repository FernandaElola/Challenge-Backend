const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const db = require("../database/models");

const should = chai.should();

chai.use(chaiHttp);

describe("/GET characters", () => {
  it("it should Get all characters", (done) => {
    chai
      .request(app)
      .get("/characters")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST characters", () => {
  it("it should create a new character", (done) => {
    const character = {
      image: "character.jpg",
      name: "newCharacter",
      age: 2,
      weight: 10,
      history: "character's history",
    };

    chai
      .request(app)
      .post("/characters/create")
      .send(character)
      .end( function(err,res){
        res.body.should.have.property('data');
        res.should.have.status(200);
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
