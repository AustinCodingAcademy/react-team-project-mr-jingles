import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';
import PetList from '../components/PetList';

export default class Pets extends Component {
  state = {
    pets: []
    }

  componentDidMount = async () => {
    try{
      const response = await fetch('/api/pets', { 
        method: 'GET',
        headers: {
        'Authorization':`Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      });
      const pets = await response.json();
      this.setState({ pets : pets }); 
    } catch (error){
      console.error(error)
    }
  }

  addPet = async (e) => {
    e.preventDefault();

    try {
      const petResponse = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${localStorage.getItem('JWT_TOKEN')}`
        },
        body: JSON.stringify({
          "name": e.target.elements.name.value,
          "gender" : e.target.elements.gender.value,
          "altered": e.target.elements.altered.value,
          "clientId": e.target.elements.clientId.value
      }) 
    })
    const pets = await petResponse.json();
    this.setState({pets: pets});
    } catch (error){
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App container">
        <AddPetForm addPet={this.addPet} pets={this.state.pets}/>        
        <PetList pets={this.state.pets} />
      </div>
    )
  }
}