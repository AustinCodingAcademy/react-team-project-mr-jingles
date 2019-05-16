import React, { Component } from 'react'

export default class AddPetForm extends Component {
  state = {
    'clients': []
    }

  componentDidMount = async () => {
    const response = await fetch('/api/clients', { method: 'GET' });
    const clients = await response.json();
    this.setState({ 'clients': clients }); 

  }
  render() {
    let clientsOption = this.state.clients;
    let optionItems = clientsOption.map((client) =>
                <option key={client.id}>{client.name}</option>
            );
    return (
      <form onSubmit={this.props.addPet}>
        <label>
          name
          <input name="name" />
        </label>
        <label>
          gender
          <select name="gender">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>
        <label>
          altered
          <select name="altered">
            <option value ="True">Yes</option>
            <option value ="False">No</option>
          </select>
        </label>
        <label>
          clientid
          <select name="clientId">
                {optionItems}
          </select>
        </label>
        <input type="submit"/>
      </form>
    )
  }
}