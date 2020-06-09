import React, {useState} from 'react';
import {Container,Row, Col, Button, NavDropdown} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownItem from 'react-bootstrap/DropdownItem';

import './main.css'

// a const array of us states
  const US_STATES = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"]

  //an array of education levels
  const EDUCATION_LEVEL = ["K-12","bachelor","Masters","Doctorial"];
  

const ListOfUSStates = (props) =>{
  let listOfStates = US_STATES.map((value,index) => {
    return(
      <DropdownItem key={index}>
        <Button onClick={() => props.setStateName(value)}>
          {value}
        </Button>
      </DropdownItem>
    )
  })

  return(
    <NavDropdown title={"States"}>
        {listOfStates}
    </NavDropdown>
  )

}

const ListOfEducationLevels = (props) => {
  let educationLevel = EDUCATION_LEVEL.map((value,index) => {
    return (
      <DropdownItem key={index}>
        <Button onClick={() => props.setEducationLevel(value)}>
          {value}
        </Button>
      </DropdownItem>
    )
  })

  return(
    <NavDropdown title={"Education Level"} >
      {educationLevel}
    </NavDropdown>
  )
}

/*
 *The side bar navigation 
*/
const SideNav = (props) =>{
  
  return(
    <Col xs={6} md={4}>
      <h3 id="SideNav">DashBoard</h3>
      <Nav className="flex-column">
        <ListOfUSStates setStateName={(value) => props.setStateName(value)}></ListOfUSStates>
        <ListOfEducationLevels setEducationLevel={(value) => props.setEducationLevel(value)}></ListOfEducationLevels>
      </Nav>
    </Col>
  )
}

const DataSection = (props) =>{
  return (
    <Col xs={12} md={8}>
      <h1>{props.title}</h1>
      <h6>{props.level}</h6>
    </Col>
  )
}

const DataCard = () =>{

}

/**
 * root component
 */
function App() {
  let [stateName,setStateName] = useState('Georgia');
  let [educationlevel,setEducationLevel] = useState('k-12')
  
  return (
    <Container fluid>
      <Row>
        <SideNav 
          setStateName={(value) => setStateName(value)}
          setEducationLevel={(value) => setEducationLevel(value)}
          >
        </SideNav>
        <DataSection title={stateName} level={educationlevel}></DataSection>
      </Row>
    </Container>
  );
}

export default App;
