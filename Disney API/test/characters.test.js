const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Characters tests", () => {
  it("should show error message if parameter is incorrect or missing while creating a character", (done) => {
    const character = {
      image: "character.jpg",
      name: "character's name",
      age: 2,
      weight: "ten",
      history: "character's history",
    };

    chai
      .request(app)
      .post("/characters/create")
      .send(character)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.eq(
          "Missing or invalid request parameters"
        );
        done();
      });
  });

  it("should show error message if parameter is incorrect or missing while editing a character", (done) => {
    const characterUpdated = {
      image: "character.jpg",
      name: null,
      age: 2,
      weight: 10,
      history: "character's history",
    };

    chai
      .request(app)
      .put("/characters/update/1")
      .send(characterUpdated)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.eq(
          "Missing or invalid request parameters"
        );
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
