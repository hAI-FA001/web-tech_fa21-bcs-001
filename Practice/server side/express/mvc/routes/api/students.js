const express = require("express");
// separation of concern -> 1 type of routes should go into 1 file/place => arch decision, does not affect working (could write all in main file)
let router = express.Router();

let Student = require("../../models/Student");

// same stuff/work/job as in server.js, but now saying "router.get", not "server.get"
router.get("/api/students/", async function (req, res) {
  let data = req.params;
  let student = Student(data);

  await student.save();

  res.send(student);
});

module.exports = router;
