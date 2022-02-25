const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const db = require("../database/models");

const should = chai.should();

chai.use(chaiHttp);