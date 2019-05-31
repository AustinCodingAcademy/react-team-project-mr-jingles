import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
import Login from './containers/Login';
import Appointments from './containers/Appointments';
import Home from './components/home';

class App extends React.Component{ 

  state ={
   activelink:localStorage.getItem('active_link')
}
  render = () => {
    return (
      <div>
      <HeaderMenu activelink={this.state.activelink} />
      <BrowserRouter basename={'/react-team-project-mr-jingles/'}>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pets" component={Pets} />
        <Route exact path="/appointments" component={Appointments} />
        <Route exact path="/home" component={Home} />
      </BrowserRouter>
      </div>

    );
  }
}

export default App;
