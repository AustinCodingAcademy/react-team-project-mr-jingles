import React, { Component } from 'react';
import Headermenu from '../components/headermenu';
import logo from '../spot_on_light.png';


class HeaderMenu extends Component {
  render= () => {
    let links = [
      { label: 'Home', link: '#home', active: true, showforloggedinUser:false },
      { label: 'About', link: '#about', active: false , showforloggedinUser:false},
      { label: 'Clients', link: 'clients', active: false , showforloggedinUser:true },
      { label: 'Pets', link: 'pets', active: false , showforloggedinUser:true},
      { label: 'Appointments', link: '#appointments' , active: false , showforloggedinUser:true},
      { label: 'Login', link: 'login', active: false , showforloggedinUser:false},
      { label: 'Logout', link: 'logout', active: false , showforloggedinUser:true}
    ];
return(
        <Headermenu links={links} logo={logo}></Headermenu>
        
    )    
  }
}

    export default HeaderMenu;