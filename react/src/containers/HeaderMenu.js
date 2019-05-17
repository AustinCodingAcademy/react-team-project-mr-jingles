import React, { Component } from 'react';
import Headermenu from '../components/headermenu';
import logo from '../spot_on_light.png';


class HeaderMenu extends Component {
  render= () => {
    let links = [
      { label: 'Home', link: '#home', active: true, showforloggedinUser:true, ShowfornologgedinUser: true  },
      { label: 'About', link: '#about', active: false , showforloggedinUser:true, ShowfornologgedinUser: true },
      { label: 'Clients', link: 'clients', active: false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Pets', link: 'pets', active: false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Appointments', link: '#appointments' , active: false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Login', link: 'login', active: false , showforloggedinUser:false, ShowfornologgedinUser: true },
      { label: 'Logout', link: 'logout', active: false , showforloggedinUser:true, ShowfornologgedinUser: false }
    ];
return(
        <Headermenu links={links} logo={logo}></Headermenu>
        
    )    
  }
}

    export default HeaderMenu;