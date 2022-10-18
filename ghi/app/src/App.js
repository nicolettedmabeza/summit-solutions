import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import TestAttendeeForm from './TestAttendeeForm';

function App(props) {
  // a component is a function in React that return JSX
  //props has attendees property


  if (props.attendees === undefined) {
    return null;
  }
  return (

    <React.Fragment>
    <Nav />

    <div className="container">
    {/* <LocationForm/> */}
    {/* <AttendeesList attendees={props.attendees}/> */}
    {/* <ConferenceForm/> */}
    {/* <AttendeeForm/> */}
    <TestAttendeeForm/>
    </div>
  </React.Fragment>
  )

}

export default App;
