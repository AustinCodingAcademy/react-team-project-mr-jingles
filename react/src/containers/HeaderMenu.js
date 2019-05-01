import React, { Component } from 'react';
import Headermenu from '../components/headermenu';
import logo from '../spot_on_light.png';


class HeaderMenu extends Component {
  render= () => {
    let links = [
      { label: 'Home', link: '#home', active: true },
      { label: 'About', link: '#about' },
      { label: 'Clients', link: 'clients' },
      { label: 'Pets', link: '#pets' },
      { label: 'Appointments', link: '#appointments' }
    ];
return(
        <Headermenu links={links} logo={logo}></Headermenu>
        
    )    
  }
}

    export default HeaderMenu;