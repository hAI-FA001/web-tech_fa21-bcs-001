const mongoose = require("mongoose");

let studentSchema = mongoose.Schema({
  name: String,
  address: String,
});

//told mongoose to make class/model/schema for us, to avoid mistakes (name vs fname)
let Student = mongoose.model("Student", studentSchema);

// require, export
module.exports = Student;
