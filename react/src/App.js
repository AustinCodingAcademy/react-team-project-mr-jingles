import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    clients: []
  }

  componentDidMount = () => {
    this.fetchClients();
  }

  fetchClients = async () => {
    const response = await fetch('/api/clients');
    const clients = await response.json();
    this.setState({ clients: clients });
  }

  addClient = async (e) => {
    e.preventDefault(); // Don't refresh the browser
    await fetch('/api/clients', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": e.target.elements["name"].value,
        "address" : e.target.elements["address"].value,
        "phoneNumber":e.target.elements["phoneNumber"].value
      })
    });
    this.fetchClients();
  }

  render() {
    return (
      <main>
        <form onSubmit={this.addClient}>
          <label> Name
            <input name="name" />
          </label>
          <label> Address
            <input name="address" />
          </label>
          <label> Phone Number
            <input name="phoneNumber" />
          </label>
          <input type="submit" />
        </form>
        <ul>
          {this.state.clients.map(client => <li key={client.id}>{client.name}</li>)}
        </ul>
      </main>
    );
  }
}

export default App;
