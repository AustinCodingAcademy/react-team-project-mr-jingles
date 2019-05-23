import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
import Appointments from './containers/Appointments'
import Login from './containers/Login';

class App extends React.Component{ 

  state ={
   activelink:localStorage.getItem('active_link')
}
  render = () => {
    return (
      <div>
      <HeaderMenu activelink={this.state.activelink}/>
      <BrowserRouter><Route exact path="/clients" component={Clients} />
      <Route exact path="/login" component={Login} /></BrowserRouter>
<<<<<<< HEAD
      <BrowserRouter><Route exact path="/pets" component={Pets} /></BrowserRouter>     
=======
      <BrowserRouter><Route exact path="/pets" component={Pets} /></BrowserRouter>
      <BrowserRouter><Route exact path="/appointments" component={Appointments} /></BrowserRouter>
>>>>>>> 82bfa9c60adc306a42a353fce8bcb19b34f25953
      </div>
    );
  }
}

export default App;
