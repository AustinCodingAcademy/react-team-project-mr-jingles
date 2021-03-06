import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';
import PetList from '../components/PetList';

export default class Pets extends Component {
  state = {
    pets: []
      }


  componentDidMount = async () => {
    this.fetchPets();
  }

  fetchPets = async (e) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/pets`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      }
    })
    
    const pets = await response.json();
    this.setState({ pets: pets });
  }

  // addPet = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const petResponse = await fetch(`${process.env.REACT_APP_API}/api/pets`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization':`Bearer ${localStorage.getItem('JWT_TOKEN')}`
  //       },
  //       body: JSON.stringify({
  //         "name": this.state.petForm.Data.name,
  //         "gender" : this.state.petForm.gender,
  //         "altered": this.state.petForm.altered,
  //         "clientId": this.state.petForm.clientId
  //     }) 
  //   })
  //   const pets = await petResponse.json();
  //   this.setState({pets: pets});
  //   } catch (error){
  //     console.error(error)
  //   }
  // }

  render() {
    return (
      <div className="App container">
        <AddPetForm addPet={this.addPet}/>        
        <PetList pets={this.state.pets} />
      </div>
    )
  }
}