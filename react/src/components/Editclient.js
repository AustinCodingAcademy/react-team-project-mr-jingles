import React from 'react';
import '../App.css';
import {Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap'

class Editclient extends React.Component{     
    
toggleeditclientModal = async(parentobj) =>
{
    parentobj.setState({editclientModal:false})  
 
}    
    updateclient = async(parentobj) =>
    {
        await fetch('/api/clients', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id":parentobj.state.editclientData.id,
            "name": parentobj.state.editclientData.name,
            "address" : parentobj.state.editclientData.address,
            "phoneNumber":parentobj.state.editclientData.phoneNumber
        })
        });
        parentobj.fetchClients(); 
        parentobj.setState({
        editclientData : {
            id:'',
            name:'',
            phoneNumber:'',
            address:''
        }
       
        }); 
        parentobj.setState({editclientModal:false})
    }

    render = () => {
      return (
        <div>
            <Modal isOpen={this.props.editclientModal} toggle={this.toggleeditclientModal.bind(this,this.props.thisobj)}>
                <ModalHeader toggle={this.toggleeditclientModal.bind(this,this.props.thisobj)}>Edit Client</ModalHeader>
                <ModalBody>
                <FormGroup>
                <Label for="name">Name</Label>
                <Input name="name" id="name" value={this.props.thisobj.state.editclientData.name} onChange= {(e)=>{
                    let {editclientData}=this.props.thisobj.state;
                    editclientData.name= e.target.value;
                    this.props.thisobj.setState({editclientData});
                }}/>
                </FormGroup>
                <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input name="phoneNumber" id="phoneNumber" value={this.props.thisobj.state.editclientData.phoneNumber} onChange= {(e)=>{
                    let {editclientData}=this.props.thisobj.state;
                    editclientData.phoneNumber= e.target.value;
                    this.props.thisobj.setState({editclientData});
                }}/>
                </FormGroup>
                <FormGroup>
                <Label for="address">Address</Label>
                <Input name="address" id="address" value={this.props.thisobj.state.editclientData.address} onChange= {(e)=>{
                    let {editclientData}=this.props.thisobj.state;
                    editclientData.address= e.target.value;
                    this.props.thisobj.setState({editclientData});
                }}/>
                </FormGroup>
                </ModalBody>    
                <ModalFooter>
                <Button color="primary" onClick={this.updateclient.bind(this, this.props.thisobj)}>Update Client</Button>{' '}
                <Button color="secondary" onClick={this.toggleeditclientModal.bind(this,this.props.thisobj)}>Cancel</Button>
                </ModalFooter>
            </Modal>      
      </div>
      );
    }
  }
  
  export default Editclient;
  