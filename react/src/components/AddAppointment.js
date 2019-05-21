import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// for popup

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddAppointment extends React.Component {

    state = {
        // array holding all appointments
        appointments:[],
        // for the modal, false since it's closed by default
        modal: false,
        // blank variables for date and owner chosen in modal
        selectedDate: '',
        selectedOwner: ''
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
            <Modal isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Make a new appointment for your furry friend!
            <br/>
            <br/>
                <b>Pet Name: </b>
                <select id="name" value={this.state.selectedName} onChange={this.handleChange}>
                    <option value = "Kevin">Kevin</option>
                    <option value = "Lynn">Lynn</option>
                    <option value = "Jeremy">Jeremy</option>
                    <option value = "Karen">Karen</option>
                </select>
            <br/>
            <br/>
            <label>
                <b>Date: </b>
                <input type="text" value ={this.state.selectedDate} onChange={this.handleChange} placeholder=""/>
            </label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmDate}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

        </Modal>
        )
    }
}