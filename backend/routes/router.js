const express = require("express")
const http = require("http")
const router = express.Router()
const config = require("../config")
const httputils = require("../utils/httputils")
const mongoutils = require("../utils/mongoutils")
const generalutils = require("../utils/generalutils")
const mailutils = require("../utils/mailutils")

const PORT_RANGE = generalutils.generateIntArray(config.PORT_RANGE_START, config.PORT_RANGE_END)

router.post('/', async (req, res)=>{
  if(req.body && req.body.email){
    if(generalutils.checkRmitStudent(req.body.email)){
      try{
        const result = await mongoutils.getStudent(req.body.email)
        
        if(result.length == 0){
          const allStudents = await mongoutils.getStudent()
          
          let takenPorts = []
          allStudents.forEach(student=>{
            takenPorts = [...takenPorts, ...student.port]
          })
          filteredPorts = PORT_RANGE.filter(item=>{if(!takenPorts.includes(item)){
            return item
          }})

          console.log(takenPorts)

          let ports = generalutils.getTwoRandFromArray(filteredPorts)
          
          mongoutils.addStudent(req.body.email, ports, (err, student) => {
            if (err) {
              throw new Error("Failed to add student.")
            }
            else {
              res.json(student)
              console.log(student)
              mailutils.sendMail(student.email, generalutils.generatePortNumberMessage(student.port)).catch(console.error)
            }
          })
          
        }
        else{
          res.json(result[0])
          mailutils.sendMail(result[0].email, generalutils.generatePortNumberMessage(result[0].port)).catch(console.error)
        }
        
      }
      catch(err){
        console.log(err)
        res.status(500).jsonp({error: "Internal server error"})
      }
    }
    else{
      httputils.resBadRequest(res, "Please enter a valid RMIT student email.")
    }
  }
  else{
    httputils.resBadRequest(res, "Please enter an email.")
  }
})

module.exports = router;