import React, { Component } from 'react'
import {Table, Button,Collapse} from 'reactstrap'


export default class PetList extends Component {
  render() {
    let pets = this.props.pets.map((pet) => {
      return(
        <tr key={pet.id}>
          <td>{pet.id}</td>
          <td>{pet.name}</td>
          <td>{pet.gender}</td>
          <td>{pet.altered}</td>
          <td>{pet.clientId}</td>
          <td align="right">
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm" className="mr-2" >Delete</Button>
          </td>
        </tr>
      )
    });

    return (
  
        <Table striped borderless hover variant="dark">
          <thead >
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Altered</th>
              <th>clientId</th>
            </tr>
          </thead>
          <tbody>       
            {pets}       
          </tbody>
        </Table>    
    
    );
  }
}