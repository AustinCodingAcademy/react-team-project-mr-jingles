import React from 'react';
import '../App.css';
import {Table, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap'

class Clients extends React.Component{ 
    state ={
        clients:[],
        newclientModal:false,
        editclientModal:false,
        newclientData : {
          name:'',
          phoneNumber:'',
          address:''
        },
        editclientData : {
          id:'',
          name:'',
          phoneNumber:'',
          address:''
        }
}

componentDidMount = () => {
  this.fetchClients();
}

fetchClients = async () => {   
  const response = await fetch('/api/clients');
  const clients = await response.json();
  this.setState({ clients: clients });
}

toggleNewClientModal()
{
  this.setState({
    newclientModal:!this.state.newclientModal
  });
 
}

toggleeditclientModal()
{
  this.setState({
    editclientModal:!this.state.editclientModal
  });
 
}

addClient = async () =>  
{    
    await fetch('/api/clients', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.newclientData.name,
        "address" : this.state.newclientData.address,
        "phoneNumber":this.state.newclientData.phoneNumber
      })
    });
    this.fetchClients();
    this.setState({
      newclientModal:false,newclientData : {
        name:'',
        phoneNumber:'',
        address:''
      }
    });

}

editClient = async(id, name, phoneNumber, address) =>
{
    this.setState({
      editclientData:{id, name, phoneNumber, address}, editclientModal:!this.state.editclientModal
    });

}

updateclient = async() =>
{
    await fetch('/api/clients', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id":this.state.editclientData.id,
        "name": this.state.editclientData.name,
        "address" : this.state.editclientData.address,
        "phoneNumber":this.state.editclientData.phoneNumber
      })
    });
    this.fetchClients(); this.setState({
      editclientModal:false,editclientData : {
        id:'',
        name:'',
        phoneNumber:'',
        address:''
      }
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
                <tr key={client.id}>
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


return (
  <div className="App container">
  <h1>Clients List</h1>
  <Button className="my-3" color="primary" onClick={this.toggleNewClientModal.bind(this)}>Add new client</Button>
      <Modal isOpen={this.state.newclientModal} toggle={this.toggleNewClientModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewClientModal.bind(this)}>Add new Client</ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input name="name" id="name" value={this.state.newclientData.name} onChange= {(e)=>{
            let {newclientData}=this.state;
            newclientData.name= e.target.value;
            this.setState({newclientData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input name="phoneNumber" id="phoneNumber" value={this.state.newclientData.phoneNumber} onChange= {(e)=>{
            let {newclientData}=this.state;
            newclientData.phoneNumber= e.target.value;
            this.setState({newclientData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input name="address" id="address" value={this.state.newclientData.address} onChange= {(e)=>{
            let {newclientData}=this.state;
            newclientData.address= e.target.value;
            this.setState({newclientData});
          }}/>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addClient.bind(this)}>Add Client</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewClientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

       <Modal isOpen={this.state.editclientModal} toggle={this.toggleeditclientModal.bind(this)}>
        <ModalHeader toggle={this.toggleeditclientModal.bind(this)}>Edit Client</ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input name="name" id="name" value={this.state.editclientData.name} onChange= {(e)=>{
            let {editclientData}=this.state;
            editclientData.name= e.target.value;
            this.setState({editclientData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input name="phoneNumber" id="phoneNumber" value={this.state.editclientData.phoneNumber} onChange= {(e)=>{
            let {editclientData}=this.state;
            editclientData.phoneNumber= e.target.value;
            this.setState({editclientData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input name="address" id="address" value={this.state.editclientData.address} onChange= {(e)=>{
            let {editclientData}=this.state;
            editclientData.address= e.target.value;
            this.setState({editclientData});
          }}/>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateclient.bind(this)}>Update Client</Button>{' '}
          <Button color="secondary" onClick={this.toggleeditclientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
  <Table>
    <thead>
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
   
  </div>
);
}
}

export default Clients;
