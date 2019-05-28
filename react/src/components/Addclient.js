import React from 'react';
import '../App.css';
import {Table, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap'

class Addclient extends React.Component{ 

    state ={
        newclientModal:false,
        newclientData : {
          name:'',
          phoneNumber:'',
          address:''
        }       

    }

toggleNewClientModal()
{
  this.setState({
    newclientModal:!this.state.newclientModal
  });
 
}

addClient = async (thisobj) =>  
{    
    await fetch(`${process.env.REACT_APP_API}/api/clients`, {
      method: "POST",     
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      },
      body: JSON.stringify({
        "name": this.state.newclientData.name,
        "address" : this.state.newclientData.address,
        "phoneNumber":this.state.newclientData.phoneNumber
      })
    })

    this.props.thisobj.fetchClients();

    this.setState({
    newclientModal:false,newclientData : {
    name:'',
    phoneNumber:'',
    address:''
        }
    });

}


    render = () => {
      return (
    <div>
        <Button className="my-3 float-right" color="primary" onClick={this.toggleNewClientModal.bind(this)}>Add new client</Button>        
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
          <Button color="primary" onClick={this.addClient.bind(this.props.thisobj)}>Add Client</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewClientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      </div>
      );
    }
  }
  
  export default Addclient;
  