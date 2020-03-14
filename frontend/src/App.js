import React, {useState} from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios'
import {Row, Input, Col, Button, message} from 'antd'

const API_URL = process.env.REACT_APP_API_URL 

const App = () => {
  const [portData, setPorts] = useState({loaded: false, ports: []})

  const [studentID, setStudentID] = useState("")

  const [buttonLoad, setButtonLoad] = useState(false)

  const submitStudentID = async () => {
    setButtonLoad(true)
    try{
      const res = await axios.post(API_URL, {
        email: `${studentID.toLowerCase()}@student.rmit.edu.au`
      })
      if(res.data && res.data.port){
        setPorts({loaded:true, ports:res.data.port})
      }
    }
    catch(err){
      console.log(err)
      if(err.response && err.response.data){
        message.error(err.response.data.message)
      }
      else{
        message.error("Please check your connectivity.")
      }
    }
    finally{
      setButtonLoad(false)
    }
  }

  const renderLogo = () => 
    <Row style={{paddingTop: "16px", paddingBottom:"16px"}} className="bounceInDown animated" type="flex" justify="center" align="middle">
        <img src={logo} alt="RMIT logo"></img>
    </Row>

  const renderStudentInput = () => {
    return(
      <Row type="flex" justify="center" align="middle" className="bounceInDown animated delay-1s">
        <Col xs={12} lg={8}>
          <h3>RMIT Port Number Generator</h3>
          <p>Please enter a Student ID:</p>
          <Input value={studentID} onChange={e => setStudentID(e.target.value)}/>
          <div style={{paddingTop: "16px", paddingBottom:"16px"}} >
            <Button loading={buttonLoad} onClick={submitStudentID} type="primary">Generate</Button>
          </div>
        </Col>
      </Row>
    )
  }

  const renderPortNumber = () => {
    return(
      <Row type="flex" justify="center" align="middle" className="bounceInDown animated">
        <Col xs={12} lg={8}>
          <h3>Your port numbers are:</h3>
          {portData.ports.map((port, index) => 
            <p key={index}>{port}</p>
          )}
          <p>An email containing your port numbers has been sent out to your student email.</p>
        </Col>
      </Row>
    )
  }

  return(
    < >
      {renderLogo()}
      {portData.loaded ? renderPortNumber(): renderStudentInput()}
    </>
  )
}

export default App;
