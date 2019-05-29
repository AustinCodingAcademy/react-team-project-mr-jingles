import React, { Component } from 'react';
import AddAppointment from '../components/AddAppointment';
import Calendar from '../components/Calendar';

export default class Appointments extends Component {

    state = {
        'appointments': [],
        'modal': false,
        'pets': [],
        'clients': [],
        'selectedDate': '',
        'editableAppointment': []
    }

    modalCallback = (bool) => {
      this.setState({'modal': bool});
    }


    modalCallback = (bool, selectedDate, editableAppointment) => {
      if (selectedDate) {
      let day = selectedDate.getDate();
      let month = selectedDate.getMonth()+1;
      let year = selectedDate.getFullYear();
      let newDay = day.toString();
      let newMonth = month.toString();
      let newYear = year.toString();
      if (newDay.length < 2) {
        newDay = "0" + newDay
      }

      if (newMonth.length < 2) {
        newMonth = "0" + newMonth
      }
      console.log(newYear + "-" + newMonth + "-" + newDay)
      this.setState({'selectedDate': newYear + "-" + newMonth + "-" + newDay});
      this.setState({'editableAppointment': editableAppointment});
    }
      this.setState({'modal': bool});
      
    }

    componentDidMount = async () => {
      // appointments API call
      const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const appointments = await response.json();
      this.setState({ 'appointments': appointments });
      // pets API call
      const petsResponse = await fetch(`${process.env.REACT_APP_API}/api/pets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const pets = await petsResponse.json();
      this.setState({ 'pets': pets });
        

      const clientsResponse = await fetch(`${process.env.REACT_APP_API}/api/clients`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      const clients = await clientsResponse.json();
      this.setState({ 'clients': clients });
    }

    deleteAppointment = async(event) => {
      console.log(event)
      await fetch(`${process.env.REACT_APP_API}/api/appointments/` + event.id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        },
        
      });
      
      const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      });
      
      const resp = await response.json();
      this.setState({
        appointments: resp
      })
      this.setState({
        modal: false
      })
    }

      

      addAppointment = async (event) => {
        console.log(event.time)
        // event.preventDefault();
        let ownerID =0;
        let clientID = 0;
        for (let i = 0; i < this.state.pets.length; i++) {
          if (this.state.pets[i].name == event.selectedClient) {
            clientID = this.state.pets[i].id;
          }
        }
        for (let i = 0; i < this.state.clients.length; i++) {
          if (this.state.clients[i].name == event.selectedOwner) {
            ownerID = this.state.clients[i].id;
          }
        }
      
      
        let time = event.selectedTime + ":00"
        await fetch(`${process.env.REACT_APP_API}/api/appointments`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
          },
          body: JSON.stringify({
            "title": event.title,
            "date" : event.selectedDate,
            "time": time,
            "notes": event.notes,
            "petId": clientID,
            "clientId": ownerID
          })
        });
        

        const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
          }
        });
 
        const appointments = await response.json();
        console.log(appointments);
        this.setState({ 'appointments': appointments });
        this.setState({
          'modal': false
        });
        this.setState({editableAppointment: []});
      }

      render() {
        return (
          <div>
            <h1>Calendar</h1>
            <Calendar appointments={this.state.appointments} editableAppointment={this.state.editableAppointment} modal = {this.state.modal} modalCallback={this.modalCallback}/>
            <AddAppointment deleteAppointment ={this.deleteAppointment} addAppointment={this.addAppointment} editableAppointment={this.state.editableAppointment} selectedDate = {this.state.selectedDate} clients={this.state.clients} pets={this.state.pets} modal={this.state.modal} modalCallback={this.modalCallback}/>
          </div>
        )
      }

}