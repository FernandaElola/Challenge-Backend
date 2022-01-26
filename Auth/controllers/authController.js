const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

module.exports = {
  register: async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    var usr = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    };
    created_user = await db.User.create(usr).then((user) => {
      return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS,
          },
        });

        let mail = {
          from: "Disney Api",
          to: req.body.email,
          subject: "Te has registrado exitosamente",
          text: "Muchas gracias por registrarte en nuestra página.",
        };

        transporter.sendMail(mail, (error, info) => {
          if (error) {
            console.log("error is " + error);
            resolve(false);
          } else {
            console.log("Email enviado: " + info.response);
            resolve(true);
          }
        });
      });
    });
    res.status(200).json(created_user);
  },
  login: async (req, res, next) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email, first_name: user.first_name },
          process.env.SECRET
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(400).json({ error: "User does not exist" });
    }
  },
};
