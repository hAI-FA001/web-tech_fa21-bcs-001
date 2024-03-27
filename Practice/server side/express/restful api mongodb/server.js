const express = require("express");
const mongoose = require("mongoose");

// for mongodb connection str
require("dotenv").config();

let server = express();
server.use(express.json());

// mongoose auto created DB + collection, actually executed createDB and createCollection
// collection is just json object, we web devs don't actually even open/see DB, do it all through code
let Student = require("./models/students.js");

server.get("/api/students", async (req, res) => {
  // called something over configuration
  // name of model = Student, name of collection = students (plural)

  // class has helper methods, find() like SELECT, also converts to JSON
  let students = await Student.find(); // is IO call, is a Promise, will run later

  res.send(students);
});

// issue: create endpoints for each record, but records are created/destroyed all the time => use regex
// server.get("/api/students/xyz", async (req, res) => {
//   let students = await Student.findById("xyz");
// });

// :id -> id variable, regex
server.get("/api/students/:id", async (req, res) => {
  let students = await Student.findById(req.params.id); //use variable here

  res.send(students);
});

// method changed to DELETE
server.delete("/api/students/:id", async (req, res) => {
  // changed function too, 2 queries (SELECT WHERE ID + DELETE), can also do in 1 query (diff syntax)
  // also returns record (those not deleted), so we store in students and show it to user
  let students = await Student.findByIdAndDelete(req.params.id);

  res.send(students);
});

// client sends data, diff ways
// jQuery -> $.ajax(..., data: json.stringify(...))
server.post("/api/students", async (req, res) => {
  let data = req.body;

  //   doesn't work out of the box, won't see response in Postman, cuz express is lightweight, need to tell it
  //   need to require express.json()
  //   res.send(data)

  //   ORM makes object/model, creates query, etc
  let student = new Student(data);
  await student.save();

  res.send(student);
});

server.put("/api/students/:id", async (req, res) => {
  //   let data = req.body;
  let id = req.params.id;

  let student = await Student.findById(id);

  //   error handling
  if (!student) {
    return res.status(404).send("Record Not Found");
  }

  //   modify it like an object
  student.name = req.body.name;
  student.address = req.body.address;

  //   ORM beauty, same method for update and insert
  await student.save();

  res.send(student);
});

server.listen(4000, () => {
  console.log("Running at port 4000");
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STR)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`DB connection error: ${err}`));
