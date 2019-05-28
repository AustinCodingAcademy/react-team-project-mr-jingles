import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
import Login from './containers/Login';
import Appointments from './containers/Appointments';
import Home from './containers/Home';
import About from './containers/About';

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
      <BrowserRouter><Route exact path="/pets" component={Pets} /></BrowserRouter>
      <BrowserRouter><Route exact path="/appointments" component={Appointments} /></BrowserRouter> 
      <BrowserRouter><Route exact path="/home" component={Home} /></BrowserRouter> 
      <BrowserRouter><Route exact path="/about" component={About} /></BrowserRouter> 
      </div>

    );
  }
}

export default App;
