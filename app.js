require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const enforce = require("express-sslify");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const https = require("https");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.get("/team", function (req, res) {
  res.sendFile(__dirname + "/team.html");
});

app.get("/gallery", function (req, res) {
  res.sendFile(__dirname + "/gallery.html");
});
app.get("/join", function (req, res) {
  res.sendFile(__dirname + "/join.html");
});
app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/success.html");
});

app.post("/join", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const country = req.body.country;
  const state = req.body.state;
  const dob = req.body.dob;
  const phone = req.body.phone;
  const message = req.body.message;

  const auth = {
    auth: {
      api_key: process.env.KEY,
      domain: process.env.DOMAIN,
    },
  };

  let transporter = nodemailer.createTransport(nodemailMailgun(auth));
  const mailOptions = {
    from: "Gray2green website <emmanuelnwanochie247@gmail.com>",
    to: "gray2greenng@gmail.com",
    subject: "New Member Joined Gray2green",
    text:
      "here is the particulars of the subscriber " +
      name +
      " " +
      dob +
      " " +
      phone +
      " " +
      message +
      " " +
      country +
      " " +
      state,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.redirect("/failure");
    } else {
      res.redirect("/success");
      console.log(data);
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
