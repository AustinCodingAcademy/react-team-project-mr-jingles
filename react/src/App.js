import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
import Appointments from './containers/Appointments'
import Login from './containers/Login';

class App extends React.Component{ 
  render = () => {
    return (
      <div>
      <HeaderMenu/>
      <BrowserRouter basename={'/react-team-project-mr-jingles/'}>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pets" component={Pets} />
        <Route exact path="/appointments" component={Appointments} />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
