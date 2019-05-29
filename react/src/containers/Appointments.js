import React, { Component } from 'react';
import AddAppointment from '../components/AddAppointment';
import Calendar from '../components/Calendar';

export default class Appointments extends Component {

    state = {
        'appointments': [],
        'modal': false,
        'pets': [],
        'clients': [],
        'selectedDate': ''
    }

    modalCallback = (bool) => {
      this.setState({'modal': bool});
    }

    modalCallback = (bool, selectedDate) => {
      this.setState({'modal': bool});
      this.setState({'selectedDate': selectedDate});
    }

    componentDidMount = async () => {
      // appointments API call
      const response = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const appointments = await response.json();
      this.setState({ 'appointments': appointments });
      console.log(appointments);
      // pets API call
      const petsResponse = await fetch('/api/pets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const pets = await petsResponse.json();
      this.setState({ 'pets': pets });
        

      const clientsResponse = await fetch('/api/clients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const clients = await clientsResponse.json();
      console.log(pets);
      console.log(clients);
      this.setState({ 'clients': clients });
    }

      

      addAppointment = async (event) => {
        // event.preventDefault();
        console.log(event);
        let ownerID =0;
        let clientID = 0;
        console.log(event.selectedClient);
        for (let i = 0; i < this.state.pets.length; i++) {
          if (this.state.pets[i].name == event.selectedClient) {
            clientID = this.state.pets[i].id;
          }
        }
        console.log(event.selectedDate.getHours());
        for (let i = 0; i < this.state.clients.length; i++) {
          if (this.state.clients[i].name == event.selectedOwner) {
            ownerID = this.state.clients[i].id;
          }
        }
        await fetch('/api/appointments', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
          },
          body: JSON.stringify({
            "title": "placeholder",
            "date" : event.selectedDate.date,
            "time": event.selectedDate.time,
            "notes": "none",
            "petId": clientID,
            "clientId": ownerID
          })
        });
        
        const response = await fetch('/api/appointments', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
          }
        });
        
        const appointments = await response.json();
        console.log(appointments);
        // console.log(newAppointments)
        // this.setState({ 'appointments': appointments });
      }



      render() {
        return (
          <div>
            <h1>Calendar</h1>
            <Calendar appointments={this.state.appointments} modal = {this.state.modal} modalCallback={this.modalCallback}/>
            <AddAppointment addAppointment={this.addAppointment} selectedDate = {this.state.selectedDate} clients={this.state.clients} pets={this.state.pets} modal={this.state.modal} modalCallback={this.modalCallback}/>
          </div>
        )
      }

}