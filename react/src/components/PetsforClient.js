import React from 'react';
import '../App.css';
import {Table, Button,Collapse} from 'reactstrap'

class PetsforClient extends React.Component{ 


render() {  

  let pets= this.props.pets.map((pet) =>{
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
  

<div>
  
  <Table striped borderless hover variant="dark" responsive hidden={this.props.collapse} >
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
</div>
);
}
}
export default PetsforClient;
