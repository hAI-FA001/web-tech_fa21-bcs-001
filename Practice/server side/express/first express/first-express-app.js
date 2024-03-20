// node -v, npm -v
// node = compiler for JS (server side, not client side)
// server side js runs on cmd, not browser -> no window, document etc objects
// npm = node package manager, this is our ecosystem (how to deal w/ packages/install them etc, no need to download and put folders, just commands)

// only put package.json on github, just need this to install dependencies and run app
// only need to run npm install, will look at package.json

// gitignore for node_modules
// cv, 2nd asn, landing page
// npm i express -> locally install, in current folder (also install dependencies, whole hierarchy)
// npm i -g nodemon -> -g = globally install, do it only once
// npm i ejs
// nodemon my-express.js

const express = require("express");
let server = express(); // express is just a function

server.use(express.static("public")); // don't want everything to be public, also don't want to manually write routes for all html, css, etc -> this automatically creates routes/makes files available
// also don't need to put "public" in url, just directly reference files inside it

server.set("view engine", "ejs"); // view engine = html + something else (e.g. variables)
// browser requests file -> server gets file -> sends to ejs/view engine/compiler -> gives back final html
// useful later for auth etc, don't want anyone to get transcript/private info, can use variables to render html

// 3 things: method, url/route, callback
// callback has 2 args injected: request and response, use them to get info from request & to send back response
server.get("/", function (req, res) {
  //   can send any data (str, html, etc) from any source (DB, file, excel, json, etc)
  //   res.send("abc"); // browser will add <head>, <body> etc
  // arg to render() is our ejs file, it assumes there is views folder
  //   ejs errors will render as html (it adds head, body etc)
  res.render("homepage");
});

server.get("/contact-us", function (req, res) {
  res.render("contact-us");
});

// can create routes a/c to requirement, like this is API route
server.get("/api/stories", function (req, res) {
  res.send([
    {
      title: "story 1",
      content: "story 1 content",
    },
    {
      title: "story 2",
      content: "story 2 content",
    },
    {
      title: "story 3",
      content: "story 3 content",
    },
    {
      title: "story 4",
      content: "story 4 content",
    },
    {
      title: "story 5",
      content: "story 5 content",
    },
  ]);
});

server.listen(4000);
