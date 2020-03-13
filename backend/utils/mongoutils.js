var Students = require('../models/Students');

const getStudent = (email) => 
  Students.find({email})

const addStudent = (email, portArray, callback) => {
  Students.create({email, port: portArray}, callback)
}

module.exports = { getStudent, addStudent }