const express = require("express");
let server = express();

////////////////////////////////////////////////
server.set("view engine", "ejs");
server.use(express.static("public"));

////////////////////////////////////////////////
server.get("/", function (req, res) {
  res.render("landing-page");
});

server.get("/cv", function (req, res) {
  res.render("cv-page");
});

server.get("/contact", function (req, res) {
  res.render("contact-page");
});

server.get("/api/restful-api", function (req, res) {
  res.render("api-page");
});

////////////////////////////////////////////////
server.listen(4000);
