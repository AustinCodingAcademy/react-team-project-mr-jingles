import React, { Component } from 'react'

export default class AddPetForm extends Component {
  state = {
    clients: JSON.parse( localStorage.getItem( "clientsforPetForm" ) )
    
    }

  // componentDidMount = async () => {
  //   if(!!localStorage.getItem('clientsforPetForm')){
  //     const cliensParse = JSON.parse( localStorage.getItem( "clientsforPetForm" ) );
  //     this.setState( { cliensParse } );
  //   }
  // }
  render() {
    console.log(this.state.clients.length);
    let optionItems = this.state.clients.map((client) =>
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