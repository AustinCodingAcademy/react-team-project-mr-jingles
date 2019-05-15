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
        openpets:false,
        haspets:false

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
  this.fetchpetforclient(id);
  if(this.state.pets.length>0)
  this.setState({openpets:true})
  else 
  this.setState({openpets:false})
}

fetchpetforclient = async(id) =>
{
  const response = await fetch('/api/pets/client/'+id);
  const pets = await response.json();
  this.setState({ pets: pets });

}


editClient = async(id, name, phoneNumber, address) =>
    {
        this.setState({ editclientModal:true,
        editclientData:{id, name, phoneNumber, address}
        });       

    }


checkClienttobedeleted = async (id) =>{    

  this.fetchpetforclient(id);
  if(this.state.pets.length>0 && !this.state.haspets)
  {
    this.setState({haspets:true})
  }
  else
  {
    this.deleteClient(id)
  }
}

deleteClientsandAssociatedPets = async(id) =>
{ 
  this.state.pets.map((pet) => async() => {
    await fetch('/api/pets/' + pet.id, {
      method: 'DELETE'
      }).then(res => {
          return res;
      }).catch(err => err);
  });
  this.setState({haspets:false})   
  this.deleteClient(id);
}

deleteClient = async(id) =>
{
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
                <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.address}</td>
                <td align="right">
                  <Button color="info" size="sm" className="mr-2"  onClick={this.fetchpets.bind(this,client.id)}>Associated Pets</Button>
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
    <PetsforClient pets={this.state.pets} openpets={this.state.openpets} thisobj={this}/>
  </div>

);
}
}
export default Clients;
