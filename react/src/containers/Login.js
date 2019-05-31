import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

  state = {
    loggedIn: false
  }

  onSubmit = async (e) => {
    e.preventDefault();
    // e.target.elements.username.value => 'kevin'
    // e.target.elements.password.value => 'hello123'
    console.log(e);
    const response = await fetch(`${process.env.REACT_APP_API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: e.target.elements.username.value,
          password: e.target.elements.password.value
        })
      }
    );
    const token = await response.text();
    console.log(token);
    localStorage.setItem('JWT_TOKEN', token);
    this.setState({ loggedIn: true });   
    window.location.href = 'home';
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/clients" />
    }
    return (
      <Form onSubmit={this.onSubmit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Username</Label>
          <Input type="text" name="username" id="exampleEmail" placeholder="something" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
        </FormGroup>
        <Button>Signin</Button>
      </Form>
    )
  }
}
