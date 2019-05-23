import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
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
      <BrowserRouter><Route exact path="/pets" component={Pets} /></BrowserRouter>     
      </div>
    );
  }
}

export default App;
