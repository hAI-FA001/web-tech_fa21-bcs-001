require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

let server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/products", require("./routes/api/products"));

server.listen(process.env.PORT_NUMBER);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STR)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("DB Error - " + e));
