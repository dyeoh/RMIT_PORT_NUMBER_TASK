const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true
  },
  port:[{
    type: Number,
    unique: true
  }]
})

const Students = mongoose.model('Students', StudentSchema);
module.exports = Students