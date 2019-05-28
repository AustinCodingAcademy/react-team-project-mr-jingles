import React from 'react';
import './App.css';
import HeaderMenu from './containers/HeaderMenu';

import { BrowserRouter, Route, Link } from "react-router-dom";

import Clients from './components/Clients'
import Pets from './containers/Pets'
import Login from './containers/Login';
<<<<<<< HEAD
import Appointments from './containers/Appointments';
=======
import Appointments from './containers/Appointments'
>>>>>>> cf37dd2667c989db21c1cfeff6f941ae3656ff7d

class App extends React.Component{ 

  state ={
   activelink:localStorage.getItem('active_link')
}
  render = () => {
    return (
      <div>
      <HeaderMenu activelink={this.state.activelink}/>
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
