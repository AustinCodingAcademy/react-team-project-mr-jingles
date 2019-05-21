import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import AddAppointment from '../components/AddAppointment.js'
// for popup
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Calendar extends React.Component{ 
state = {
    // array holding all appointments
    appointments:[],
    // for the modal, false since it's closed by default
    modal: false,
    // blank variables for date and owner chosen in modal
    selectedDate: '',
    selectedOwner: ''
}

// empty for now
componentDidMount() {
    
}

toggle = arg => {
    // flip the modal depending on what state it is
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

handleChange(event) {
    // get the target clicked
    const target = event.target;
    // find out if it's name or date
    const value = target.value
    // get the name of the target
    const name = target.name;
    console.log(value);
    // update the state
    this.setState({
      [name]: value
    });
}

render () {
    
    
    return (
        // 
        <React.Fragment>
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
            // set at componentDidMount
            events={this.state.appointments}
            // dateClick is called whenever a date that isn't an event is clicked
                dateClick={this.handleDateClick}/>
        
        <AddAppointment modal={this.state.modal}/>


        </React.Fragment>
    );
    
    
}


confirmDate = arg => {
    
    // grab the current array of appointments
    var newEvents = this.state.appointments.slice();

    console.log(this.state.selectedOwner);
    console.log(this.state.selectedDate);
    // add the new event from the args
    newEvents.push({title: this.state.selectedOwner, date: this.state.selectedDate});
    // set the array to be the new newEvents array
    this.setState({appointments:newEvents}, () => {
        console.log(this.state.appointments);
    });
    
    // close the modal
    this.setState({modal:false});
}

handleDateClick = arg => {
    // open the modal
    this.setState({modal:true});
    // pick the selected date for the creation to use
    AddAppointment.setState({modal:true});
    this.setState({selectedDate: arg.date});
}

}


export default Calendar;