import React from 'react';
import '../App.css';
import {Table, Button,Collapse} from 'reactstrap'

import Addclient from './Addclient'
import Editclient from './Editclient'
import PetsforClient  from './PetsforClient'

class Clients extends React.Component{ 
    state ={
        clients:[],
        editclientModal:false,
        editclientData:{id:'', name:'', phoneNumber:'', address:''},
        pets:[],
        collapse:true

}

componentDidMount = () => {
  this.fetchClients();
}

fetchClients = async () => {   
  const response = await fetch('/api/clients');
  const clients = await response.json();
  this.setState({ clients: clients });
}

fetchpets = async (id) => {   
  const response = await fetch('/api/pets/client/'+id);
  const pets = await response.json();
  this.setState({ pets: pets });
  if(pets.length>0)
  this.setState({collapse:false})
  else 
  this.setState({collapse:true})
}


editClient = async(id, name, phoneNumber, address) =>
    {
        this.setState({ editclientModal:true,
        editclientData:{id, name, phoneNumber, address}
        });       

    }


deleteClient = async (id) =>{    
  await fetch('/api/clients/' + id, {
  method: 'DELETE'
  }).then(res => {
      return res;
  }).catch(err => err);
  this.fetchClients();
}


render() {

  let clients= this.state.clients.map((client) =>{
    return(
                <tr key={client.id} onClick={this.fetchpets.bind(this, client.id)}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.address}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editClient.bind(this,client.id, client.name, client.phoneNumber,client.address)}>Edit</Button>
                  <Button color="danger" size="sm" className="mr-2" onClick={this.deleteClient.bind(this,client.id)}>Delete</Button>
                </td>
              </tr>
    )
  });

  let pets= this.state.pets.map((pet) =>{
    return(
                <tr key={pet.id} >
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.gender}</td>
                <td>{pet.altered}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" >Edit</Button>
                  <Button color="danger" size="sm" className="mr-2">Delete</Button>
                </td>
              </tr>
    )
  });


return (
  
  <div className="App container"> 
    <Addclient thisobj={this}/>
    <Editclient thisobj={this} editclientModal={this.state.editclientModal}></Editclient>       
    <Table striped borderless hover variant="dark">
      <thead >
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>       
        {clients}       
      </tbody>
    </Table>     
  <PetsforClient pets={this.state.pets} collapse={this.state.collapse}/>
  </div>

);
}
}
export default Clients;
