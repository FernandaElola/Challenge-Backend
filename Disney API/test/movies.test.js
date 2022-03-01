const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Movies tests", () => {
  it("should show error message if parameter is incorrect or missing while creating a movie", (done) => {
    const movie = {
      image: "movie.jpg",
      title: "movie's title",
      releaseDate: 2,
      rating: 4,
      genreId: 2,
    };

    chai
      .request(app)
      .post("/movies/create")
      .send(movie)
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

  it("should show error message if parameter is incorrect or missing while editing a movie", (done) => {
    const movieUpdated = {
      image: "movie.jpg",
      title: "movie's title",
      releaseDate: 2,
      rating: 4,
      genreId: 2,
    };

    chai
      .request(app)
      .put("/movies/update/1")
      .send(movieUpdated)
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

  it("should return an error if the movie doesn't exist", (done) => {
    chai
      .request(app)
      .get("/movies/detail/-1")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.eq("The movie doesn't exist");
        done();
      });
  });
});
