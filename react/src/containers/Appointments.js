import React, { Component } from 'react';
import AddAppointment from '../components/AddAppointment';
import Calendar from '../components/Calendar';

export default class Appointments extends Component {

    state = {
        'appointments': []
    }

    componentDidMount = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`, { method: 'GET' });
        const appointments = await response.json();
        this.setState({ 'appointments': appointments });
        console.log(this.state.appointments);
      }

      addAppointment = async (e) => {
        e.preventDefault();
        console.log('name', e.target.elements.name.value)
        console.log('gender', e.target.elements.gender.value)
        console.log('altered', e.target.elements.altered.value)
    
        await fetch(`${process.env.REACT_APP_API}/api/appointments`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "title": e.target.elements.title.value,
            "date" : e.target.elements.date.value,
            "time": e.target.elements.time.value,
            "notes": e.target.elements.notes.value,
            "petId": e.target.elements.petId.value,
            "clientId": e.target.elements.clientId.value
          })
        });
        
        const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`);
        const appointments = await response.json();
        this.setState({ 'appointments': appointments });
      }

      fetchAppointments = async () => {   
        const response = await fetch(`${process.env.REACT_APP_API}/api/appointments`);
        const appointments = await response.json();
        this.setState({ 'appointments': appointments });
      }

      render() {
        return (
          <div>
            <h1>Calendar</h1>
            <Calendar/>
            <AddAppointment/>
          </div>
        )
      }

}