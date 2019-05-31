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
        selectedClient: '',
        title: 'Checkup for',
        notes: '',
        selectedTime: '',
        editableAppointment: []
    }


    componentDidMount() {

    }


    handleChange(event) {
        // update the state
        this.setState({
          [event.target.id]: [event.target.value]
        });
    }


    confirmDate = async(arg)  => {
        // check if either of the form fields aren't filled in
        
            if (this.state.selectedClient == "" || this.state.selectedOwner == "" || this.state.time == "") {
                if (this.state.selectedClient == "" && document.getElementById("petTag").innerHTML.indexOf("*") == -1) {
                    document.getElementById("petTag").innerHTML+=" <span style='color:red'>* please pick a pet</span>";
                }
                if (this.state.selectedOwner == "" && document.getElementById("ownerTag").innerHTML.indexOf("*") == -1) {
                    document.getElementById("ownerTag").innerHTML+=" <span style='color:red'>* please pick an owner</span>";
                }
                console.log(this.state.time)
                if (this.state.time==null && document.getElementById("time").innerHTML.indexOf("*") == -1) {
                    document.getElementById("time").innerHTML+=" <span style='color:red'>* please pick a time</span>";
                }
            } else {
                // if the form fields are filled in, submit 
            let title = this.state.title;
            let pet = this.state.selectedClient;
            // this is if the title isn't set since it's optional
            console.log(this.state.selectedTime)
            this.setState({
                'title': title + " " + pet
            }, this.setState({selectedDate: this.props.selectedDate},
                () => this.props.addAppointment(this.state))
            );
            
            }  
        
    }

    delete = async(arg) => {
        if (this.props.editableAppointment.length === 0 ) {
            if (document.getElementById("delete").innerHTML!= "Cannot delete an unsaved item"){
            document.getElementById("delete").innerHTML += "Cannot delete an unsaved item"
            }
            return;
        } else {
            this.props.deleteAppointment(this.props.editableAppointment);
        }
    }

    render () {
        return (
            <Modal isOpen={this.props.modal}>
        <ModalHeader toggle={this.toggle}>Pet Appointment</ModalHeader>
          <ModalBody>
            Make an appointment for your furry friend!
            <br/>
            <br/>
            <b>Title: </b><br/>
            <input type="text" id="title" placeholder="(optional)" onChange={this.handleChange}/>
            <br/>
            <br/>
                <b id="ownerTag">Client: </b><br/>
                <select id="selectedOwner" value={this.state.value} onChange={this.handleChange}>
                {this.props.clients.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}
                </select>
            <br/>

            <br/>
                <b  id="petTag">Pet: </b><br/>
                <select id="selectedClient" value={this.state.value} onChange={this.handleChange}>
                {this.props.pets.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}
                </select>
            <br/>

            <br/>
            <label>
                <b>Date: </b><br/>
                <input type="date" id="date" defaultValue = {this.props.selectedDate}/>
            </label>
            <br/>
            <b id="time" >Time: </b><br/>
            <input type="time" id="selectedTime" onChange={this.handleChange}/>
            <br/>
            <br/>
            <b>Notes: </b><br/>
            <input type="text" id="notes" placeholder="(optional)" onChange={this.handleChange}/>
            <br/>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmDate}>Confirm</Button>
            <span id="delete"/>
            <Button color="danger" onClick={this.delete}>Delete</Button>
            <Button color="secondary" onClick={() => this.props.modalCallback(false)}>Cancel</Button>
            
          </ModalFooter>

        </Modal>
        )
    }
}