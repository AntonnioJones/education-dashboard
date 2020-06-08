import React, {useState} from 'react';
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
    return <li className="usState" key={index}><button className="btn btn-link" onClick={() => props.setStateName(value)}>{value}</button></li>
  })

  return(listOfStates)

}

const ListOfEducationLevels = (props) =>{
  let educationLevel = EDUCATION_LEVEL.map((value,index) =>{
    return <li className="educationLevel" key={index}><button className="btn btn-link">{value}</button></li>
  })

  return(educationLevel)
}

/*
 *The side bar navigation 
*/
const SideNav = (props) =>{
  
  return(
    <div className="col" id="sideNav">
      <h3 className="border-bottom">DashBoard</h3>
       <ul className="nav flex-column fixed-left ">
        <li className="nav-item ">
          <h4 className="dropdown-toggle" data-toggle="collapse" href="#statesList" role="button" aria-expanded="false" aria-controls="statesList">
            States
          </h4>
        </li>
        <div className="collapse" id="statesList">
            <ListOfUSStates setStateName={(stateName) => props.setStateName(stateName)}/>
        </div>
        <li>
          <h4 className="dropdown-toggle" data-toggle="collapse" href="#EducationLevel" role="button" aria-expanded="false" aria-controls="EducationLevel">
            Education Level
          </h4>
        </li>
        <div className="collapse" id="EducationLevel">
           
        </div>
      </ul>
      
    </div>
  )
}

const DataSection = (props) =>{
  return (
    <div className="col" id="DataSection">
      <h1>{props.title}</h1>
    </div>
  )
}

const DataCard = () =>{

}

/**
 * root component
 */
function App() {
  let [stateName,setStateName] = useState('Georgia')
  
  return (
    <div className="App container-fluid">
      <div id="row">
        <SideNav setStateName={(value) => setStateName(value)}></SideNav>
        <DataSection title={stateName}></DataSection>
      </div>
    </div>
  );
}

export default App;
