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
    // blank variables for date and owner chosen in modal
    selectedDate: '',
    selectedOwner: '',
    editableAppointment: []
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
            events={this.props.appointments}
            // dateClick is called whenever a date that isn't an event is clicked
            // ={() => this.props.modalCallback(true)}
            eventClick={this.handleEventClick}
            dateClick={this.handleDateClick}/>


        </React.Fragment>
    );
    
    
}

compareDates(arg1, arg2) {
    // arg1 is formatted as "YYYY-MM-DD", arg2 is a Javascript Date format
    if (Number(arg1.substring(arg1.length - 2, arg1.length)) == arg2.getDate()) {
        return true;
    }
    return false;
}

handleEventClick = arg => {
    // find the event in the database
    for (let i = 0; i < this.props.appointments.length; i++) {
        if (this.props.appointments[i].title == arg.event.title) {
            if (this.compareDates(this.props.appointments[i].date, arg.event.start)) {
                console.log(arg.event.start)
                this.setState({
                    editableAppointment: this.props.appointments[i]
                }, () =>this.props.modalCallback(true, arg.event.start, this.state.editableAppointment));
                
            }
        }
    }
}

handleDateClick = arg => {
    // open the modal
    // pick the selected date for the creation to use
    this.props.modalCallback(true, arg.date, this.props.editableAppointment);
}

}


export default Calendar;