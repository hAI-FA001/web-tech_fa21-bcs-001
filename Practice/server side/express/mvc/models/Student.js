const mongoose = require("mongoose");

// we only adding attrs, mongoose class has methods
let studentSchema = mongoose.Schema({
  name: String,
  rollno: String,
});

let Student = mongoose.Model(studentSchema);

module.exports = Student;
