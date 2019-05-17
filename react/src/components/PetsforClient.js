import React from 'react';
import '../App.css';

import {Button, Modal, ModalHeader,ModalBody, Table} from 'reactstrap'

class PetsforClient extends React.Component{ 

  toggleshowPets = async(parentobj) =>
{
  parentobj.setState({openpets:false})  
 
}  


render() {  

  let pets= this.props.pets.map((pet) =>{
    return(
                <tr key={pet.id} >
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.gender}</td>
                <td>{pet.altered}</td>               
              </tr>
    )
  });


return ( 
  

<Modal isOpen={this.props.openpets} toggle={this.toggleshowPets.bind(this, this.props.thisobj)}>
                <ModalHeader toggle={this.toggleshowPets.bind(this,this.props.thisobj)}>Pets for Client</ModalHeader>
                <ModalBody>  
              <Table striped borderless hover variant="dark" responsive >
                <thead >
                  <tr >
                    <th>#</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Altered</th>
                  </tr>
                </thead>
                <tbody>       
                  {pets}       
                </tbody>
              </Table>
            </ModalBody>    
  </Modal> 

);
}
}
export default PetsforClient;
