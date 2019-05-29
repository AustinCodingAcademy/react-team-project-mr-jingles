import React from 'react';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import Calendar from '../components/Calendar.js'
// for popup

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddAppointment extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        // array holding all appointments
        appointments:[],
        // array holding clients
        clients:[],
        // array holding pets
        pets:[],
        // for the modal, false since it's closed by default
        modal: false,
        // blank variables for date and owner chosen in modal
        selectedDate: new Date(),
        selectedOwner: '',
        selectedClient: ''
    }


    componentDidMount() {
        
    }


    handleChange(event) {
        // update the state
        if (event.target.id)
        this.setState({
          [event.target.id]: [event.target.value]
        });
    }


    confirmDate = async(arg)  => {
        // close the modal

        this.setState({selectedDate: this.props.selectedDate},
            () => this.props.addAppointment(this.state));
        
    }

    render () {
        return (
            <Modal isOpen={this.props.modal}>
        <ModalHeader toggle={this.toggle}>New Pet Appointment</ModalHeader>
          <ModalBody>
            Make a new appointment for your furry friend!
            <br/>
            <br/>
                <b>Client: </b>
                <select id="selectedOwner" value={this.state.value} onChange={this.handleChange}>
                {this.props.clients.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}
                </select>
            <br/>

            <br/>
                <b>Pet: </b>
                <select id="selectedClient" value={this.state.value} onChange={this.handleChange}>
                {this.props.pets.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}
                </select>
            <br/>

            <br/>
            <label>
                <b>Date: </b>
                <input type="text" id="date" value ={this.state.value} placeholder={this.props.selectedDate}/>
            </label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmDate}>Confirm</Button>{' '}
            <Button color="secondary" onClick={() => this.props.modalCallback(false)}>Cancel</Button>
          </ModalFooter>

        </Modal>
        )
    }
}