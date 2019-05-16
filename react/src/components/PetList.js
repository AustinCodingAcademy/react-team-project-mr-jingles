import React, { Component } from 'react'

export default class PetList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.pets.map(pet => <li key={pet.id} >{pet.name} <a href="#">delete</a></li>)
        }
      </ul>
    )
  }
}