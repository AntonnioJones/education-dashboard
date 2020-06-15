import React, {useState} from 'react';
import {Container,Row, Col, Button, NavDropdown,NavLink, NavItem, CardColumns, Dropdown, Navbar, NavbarBrand, Modal} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Card from 'react-bootstrap/Card'

import './main.css'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

// a const array of us states
const US_STATES = ["Alaska",
                  "Alabama",
                  "Arkansas",
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
                  "North Dakota",
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
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"]

  //an array of education levels
const EDUCATION_LEVEL = ["K-12","bachelor","Masters","Doctorial"];
 
//The Api endpoint
const API_URL = "https://fnx9a4pb6g.execute-api.us-east-1.amazonaws.com/beta/highschool/";

const ListOfUSStates = (props) =>{
  //a state variable that controls where the modal is visible
  const [visible, setVisible] = useState(false);

  //opens and closes the model
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false);

  /*calls the prop function that updates the US state
  * then it closes the modal
  */
  const updateUSState = (value) =>{
    props.setUSState(value);
    getHighSchoolData(value.toLowerCase());
    closeMenu();
  }

  let listOfStates = US_STATES.map((value,index) => {
    return(
        <Button variant="link" key ={index} onClick={() => updateUSState(value)}>
          {value}
        </Button>
    )
  })
  

  return(
    <>
      <NavItem as={Button} variant="link" onClick={openMenu}>
        States
      </NavItem>

      <Modal show={visible} onHide={closeMenu}>
        <Modal.Header>
          <Modal.Title>Choose a State</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listOfStates}
        </Modal.Body>
      </Modal>
    </>
  )

}

const ListOfEducationLevels = (props) => {
  //a state variable that controls where the modal is visible
  const [visible, setVisible] = useState(false);

  //opens and closes the model
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false);

  /*calls the prop function that updates the education level
  * then it closes the modal
  */
  const updateEducation = (value) =>{
    props.setEducationLevel(value);
    closeMenu();
  }

  //maps out an array of education levels to buttons
  let educationLevel = EDUCATION_LEVEL.map((value,index) => {
    return (
      <Button variant="link" key={index} onClick={() => updateEducation(value)}>
        {value}
      </Button>
    )
  })

  return(
    <>
      <NavItem as={Button} variant="link" onClick={openMenu}>
        Education
      </NavItem>

      <Modal show={visible} onHide={closeMenu}>
        <Modal.Header>
          <Modal.Title>Choose an Education Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {educationLevel}
        </Modal.Body>
      </Modal>
    </>
  )
}

/*
 *The side bar navigation 
*/
const NavigationBar = (props) =>{
  
  return(
    <Navbar bg="dark" variant="dark" expand="md" fixed="top" id="NavBar">
      <NavbarBrand>DashBoard</NavbarBrand>
      <Navbar.Toggle aria-controls="collapseLinks" />
      <NavbarCollapse id="collapseLinks">
      <Nav>
        <ListOfUSStates setUSState={(value) => props.setUSState(value)}></ListOfUSStates>
        <ListOfEducationLevels setEducationLevel={(value) => props.setEducationLevel(value)}></ListOfEducationLevels>
      </Nav>
      </NavbarCollapse>
    </Navbar>
  )
}

const DataSection = (props) =>{
  return (
    <section  id="DataSection">
      <header id="DataHeader">
        <h1>{props.title}</h1>
        <h6>{props.level}</h6>
      </header>
      <section id="DataCards">
        <DataCard title={"Total Students"} value={70000}></DataCard>
        <DataCard title={"Prekindergarten"} value={1000}></DataCard>
        <DataCard title={"kindergarten"} value={1000}></DataCard>
        <DataCard title={"Grades 1-8"} value={1000}></DataCard>
        <DataCard title={"High Schoolers"} value={1000}></DataCard>
        <DataCard title={"Dropout Rate"} value={1000}></DataCard>
        <DataCard title={"Graduation Rate"} value={1000}></DataCard>
      </section>
    </section>
  )
}

const DataCard = (props) =>{
  return(
    <Card border="dark" bg="info" className="text-center DataCard">
      <Card.Body>
        <Card.Header as="h5">{props.title}</Card.Header>
        <Card.Text>
          {props.value}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

/**
 * used to get information on high school data
 * @param {*} usState 
 */
const getHighSchoolData = (usState) =>{
  //create a request
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=(e)=>{
    if (e.status == 200) {
      console.log(this.responseText);
    }
  }
  xhttp.open("GET","https://fnx9a4pb6g.execute-api.us-east-1.amazonaws.com/beta/highschool/alaska");
  xhttp.send();
  
}

/**
 * root component
 */
function App() {
  let [USState,setUSState] = useState('Georgia');
  let [educationlevel,setEducationLevel] = useState('k-12')
  
  return (
    <Container id="App" fluid>
        <NavigationBar 
          setUSState={(value) => setUSState(value)}
          setEducationLevel={(value) => setEducationLevel(value)}
          >
        </NavigationBar>
        <DataSection title={USState} level={educationlevel}></DataSection>
    </Container>
  );
}

export default App;
