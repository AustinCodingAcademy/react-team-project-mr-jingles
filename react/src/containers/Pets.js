import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';
import PetList from '../components/PetList';

export default class Pets extends Component {
  state = {
    'pets': []
  }

  componentDidMount = async () => {
    const response = await fetch('/api/pets', { method: 'GET' });
    const pets = await response.json();
    this.setState({ 'pets': pets })
  }

  addPet = async (e) => {
    e.preventDefault();
    console.log('name', e.target.elements.name.value)
    console.log('gender', e.target.elements.gender.value)
    console.log('altered', e.target.elements.altered.value)

    await fetch('/api/pets', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": e.target.elements.name.value,
        "gender" : e.target.elements.gender.value,
        "altered": e.target.elements.altered.value,
        "clientId": e.target.elements.clientId.value
      })
    });
    const response = await fetch('/api/pets');
    const pets = await response.json();
    this.setState({ 'pets': pets });
  }

  render() {
    return (
      <div>
        <h1>Pets</h1>
        <AddPetForm addPet={this.addPet} />
        <PetList pets={this.state.pets} />
      </div>
    )
  }
}