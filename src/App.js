import React, { useState, useEffect} from 'react';
import {Container, Button, NavItem, Navbar, NavbarBrand, Modal, NavLink} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
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
                  "DC",
                  "Delaware",
                  "Florida",
                  "Georgia",
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
    getHighSchoolData(value.toLowerCase(),props.setApiData);
    props.showNational(false);
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
    <div>
      <NavItem as={Button} variant="link" onClick={openMenu}>
        Education
      </NavItem>

      <Modal show={visible} onHide={closeMenu}>
        <Modal.Header >
          <Modal.Title>Choose an Education Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {educationLevel}
        </Modal.Body>
      </Modal>
    </div>
  )
}

const NationalDataLink = (props) =>{
  const updateNational =() =>{
    getHighSchoolData('total',props.setApiData);
    props.showNational(true);
  }
  return (
    <NavItem as={Button} variant="link" onClick={updateNational} >
      National
    </NavItem>
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
        <ListOfUSStates
          showNational={(value) => props.showNational(value)} 
          setUSState={(value) => props.setUSState(value)}
          setApiData={(value) => props.setApiData(value)}
        ></ListOfUSStates>
        <ListOfEducationLevels 
          setEducationLevel={(value) => props.setEducationLevel(value)}
        ></ListOfEducationLevels>
        <NationalDataLink
          showNational={(value) => props.showNational(value)}
          setApiData={(value) => props.setApiData(value)}
        ></NationalDataLink>
      </Nav>
      </NavbarCollapse>
    </Navbar>
  )
}

const SectionlData = (props) =>{
  return(
    <section id="DataCards">
    <DataCard title={"Total Students"} value={props.apiData.TotalStudents}></DataCard>
    <DataCard title={"Prekindergarten"} value={props.apiData.Prekindergarten}></DataCard>
    <DataCard title={"kindergarten"} value={props.apiData.Kindergarten}></DataCard>
    <DataCard title={"Grades 1-8"} value={props.apiData.PreHighSchool}></DataCard>
    <DataCard title={"High School"} value={props.apiData.HighSchool}></DataCard>
    <DataCard title={"Dropout Rate"} value={props.apiData.DropoutRate}></DataCard>
    <DataCard title={"Graduation Rate"} value={props.apiData.GraduationRate}></DataCard>
  </section>
  )
}

const DataSection = (props) =>{
  return (
    <section  id="DataSection">
      <header id="DataHeader">
        <h1>{props.title}</h1>
        <h6>{props.level}</h6>
      </header>

      <SectionlData apiData={props.apiData}/>
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
const getHighSchoolData = (USState, callback) =>{
  const xhr = new XMLHttpRequest();
  xhr.open('GET',API_URL+USState);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        callback(JSON.parse(xhr.responseText));
        return(xhr.responseText);
      } else {
        // Oh no! There has been an error with the request!
        return(status);
      }
  }
}
  xhr.send();
}


const RenderData = (props) =>{
  if(props.national){
    return(
      <DataSection 
      title={'National'} 
      level={props.educationLevel} 
      apiData={props.apiData}>
    </DataSection>
    )
  }else{
    return (
      <DataSection 
        title={props.USState} 
        level={props.educationLevel} 
        apiData={props.apiData}>
      </DataSection>
    );
  }
}

/**
 * root component
 */
function App() {
  let [USState,setUSState] = useState('total');
  let [national,showNational] = useState(true);
  let [educationLevel,setEducationLevel] = useState('k-12')
  let [apiData,setApiData] = useState({});

  useEffect(()=>{
    getHighSchoolData('total',setApiData)
  }, [])
  return (
    <Container id="App" fluid>
      <NavigationBar 
        showNational={(value) => showNational(value)}
        setUSState={(value) => setUSState(value)}
        setEducationLevel={(value) => setEducationLevel(value)}
        setApiData = {(value) => setApiData(value)}
        >
      </NavigationBar>
      <RenderData national={national} USState={USState} educationLevel={educationLevel} apiData={apiData} />
    </Container>
  )
}

export default App;
