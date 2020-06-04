import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

/*
 *The side bar navigation 
*/
const SideNav = () =>{

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

  const EDUCATION_LEVEL = ["High School","Bacholr","Masters","Doctorial"];

  let listOfStates = US_STATES.map((value,index) => {
    return <li className="usState"><button className="btn btn-link">{value}</button></li>
  })


  let educationLevel = EDUCATION_LEVEL.map((value,index) =>{
  return <li className="educationLevel"><button className="btn btn-link">{value}</button></li>
  })

  return(
    <div>
      <h3>DashBoard</h3>
      <ul className="nav flex-column fixed-left">
        <li className="nav-item">
          <h4  data-toggle="collapse" href="#statesList" role="button" aria-expanded="false" aria-controls="statesList">
            States
          </h4>
        </li>
        <div class="collapse" id="statesList">
            {listOfStates}
        </div>
        <li>
          <h4 data-toggle="collapse" href="#EducationLevel" role="button" aria-expanded="false" aria-controls="EducationLevel">
            Education Level
          </h4>
        </li>
        <div class="collapse" id="EducationLevel">
            {educationLevel}
        </div>
      </ul>
    </div>

    //controls the collapse
    
  )
}

function App() {
  return (
    <div className="App">

      <SideNav></SideNav>
    </div>
  );
}

export default App;
