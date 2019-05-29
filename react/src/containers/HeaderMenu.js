import React, { Component } from 'react';
import Headermenu from '../components/headermenu';
import logo from '../spot_on_light.png';


class HeaderMenu extends Component {
  render= () => {
    let links = [
      { label: 'Home', link: 'home', active: this.props.activelink==='home'?true:false, showforloggedinUser:true, ShowfornologgedinUser: true  },
      { label: 'Clients', link: 'clients', active: this.props.activelink==='clients'?true:false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Pets', link: 'pets', active: this.props.activelink==='pets'?true:false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Appointments', link: 'appointments' , active: this.props.activelink==='Appointments'?true:false , showforloggedinUser:true, ShowfornologgedinUser: false },
      { label: 'Login', link: 'login', active: this.props.activelink==='Login'?true:false , showforloggedinUser:false, ShowfornologgedinUser: true },
      { label: 'Logout', link: 'logout',active: this.props.activelink==='Logout'?true:false , showforloggedinUser:true, ShowfornologgedinUser: false }
    ];
return(
      <Headermenu links={links} logo={logo}></Headermenu>     
    )    
  }
}

    export default HeaderMenu;