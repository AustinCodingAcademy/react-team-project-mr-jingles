import React, { Component } from 'react'

export default class AddPetForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.addPet}>
        <label>
          name
          <input name="name" />
        </label>
        <label>
          gender
          <input name="gender" />
        </label>
        <label>
          altered
          <input name="altered" />
        </label>
        <label>
          clientid
          <input name="clientId" />
        </label>
        <input type="submit"/>
      </form>
    )
  }
}