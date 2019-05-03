import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'

class App extends React.Component{ 
  render = () => {
    return (
      <div>
      <HeaderMenu></HeaderMenu>
      <BrowserRouter><Route exact path="/clients" component={Clients} /></BrowserRouter>
      <BrowserRouter><Route exact path="/pets" component={Pets} /></BrowserRouter>
      </div>
    );
  }
}

export default App;
