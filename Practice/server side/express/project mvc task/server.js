const express = require("express");
const ejsLayouts = require("express-ejs-layouts");

let server = express();

server.use(express.static("public"));
server.use(ejsLayouts);
server.set("view engine", "ejs");

// reminder/important: put this after setting view engine, else it won't render page correctly
const contactUsRouter = require("./routes/contact-us");
server.use(contactUsRouter);

server.get("/", async (req, res) => {
  res.render("landing-page");
});

server.listen(3000);
