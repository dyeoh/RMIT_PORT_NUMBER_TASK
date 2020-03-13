var Students = require('../models/Students');

const getStudent = (email) => {
  if(email){
    return Students.find({email})
  }
  else{
    return Students.find()
  }
}
  

const addStudent = (email, portArray, callback) => {
  Students.create({email, port: portArray}, callback)
}

module.exports = { getStudent, addStudent }