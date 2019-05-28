import React, { Component } from 'react'
import '../App.css';
import {Table, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

export default class AddPetForm extends Component {
  state = {
    clients: [],
    newPetModal:false,
    newPetData : {
      name:'',
      gender:'',
      altered:'',
      clientId: ''
        },
    dropdownOpen: false,
    dropDownValue:'Choose Owner'
  }
  
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    toggleNewPetModal()
    {
      this.setState({
        newPetModal:!this.state.newPetModal
      });
     
    }

    changeValue() {
      this.setState({
        dropDownValue: this.state.clients.name
      });
    }

    componentDidMount = async() => {
      const response = await fetch(`${process.env.REACT_APP_API}/api/clients`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        }
      })
      
      const clients = await response.json();
      this.setState({ clients: clients });
    }

    addPet = async (e) => {  
      e.preventDefault();

      try {
        await fetch(`${process.env.REACT_APP_API}/api/pets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem('JWT_TOKEN')}`
          },
          body: JSON.stringify({
            "name": this.state.newPetData.name,
            "gender" : this.state.newPetData.gender,
            "altered": this.state.newPetData.altered,
            "clientId": this.state.newPetData.clientId
        }) 
      })
      this.props.e.fetchPets();
      this.setState({newPetModal:false, 
        newPetData: {
          name:'',
          gender:'',
          altered:'',
          clientId:''
        }
      });
      } catch (error){
        console.error(error)
      }
    }

  render() {
    console.log(this.state.clients.length);

    let optionItems = this.state.clients.map((client) =>
                <DropdownItem onClick={this.changeValue} key={client.id}> {client.name}</DropdownItem>
            );
    return (
      <div>
        <Button className="my-3 float-right" color="primary" onClick={this.toggleNewPetModal.bind(this)}>Add new pet</Button>        
        <Modal isOpen={this.state.newPetModal} toggle={this.toggleNewPetModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewPetModal.bind(this)}>Add new pet</ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input name="name" id="name" value={this.state.newPetData.name} onChange= {(e)=>{
            let {newPetData}=this.state;
            newPetData.name= e.target.value;
            this.setState({newPetData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input name="gender" id="gender" value={this.state.newPetData.gender} onChange= {(e)=>{
            let {newPetData}=this.state;
            newPetData.gender= e.target.value;
            this.setState({newPetData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="altered">Altered?</Label>
          <Input name="altered" id="altered" value={this.state.newPetData.altered} onChange= {(e)=>{
            let {newPetData}=this.state;
            newPetData.altered= e.target.value;
            this.setState({newPetData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="clientId"></Label>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}  name="clientId" id="clientId" value={this.state.newPetData.clientId} onChange= {(e)=>{
            let {newPetData}=this.state;
            newPetData.clientId= e.target.value;
            this.setState({newPetData});
          }}>
            <DropdownToggle caret>
            {this.state.dropDownValue}
        </DropdownToggle>
          <DropdownMenu>
           <DropdownItem header>Choose Client</DropdownItem>
            {optionItems}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addPet.bind(this.props.e)}>Add Pet</Button>
          <Button color="secondary" onClick={this.toggleNewPetModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      </div>
    )
  }
}