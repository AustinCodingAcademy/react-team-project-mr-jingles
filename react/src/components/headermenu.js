import React, { Component } from 'react';

import searchicon from '../search_icon.png';

class Headermenu extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            loggedIn: !!localStorage.getItem('JWT_TOKEN'),
            activemenutem:localStorage.getItem('active_link')

        };


    } 
    logout = () => {

       // e.preventDefault();
        console.log("came into logout menu");
        localStorage.clear();
        this.setState({ loggedIn: false })
        window.location.href = '/'
        //window.location.reload();         
       }

    showForm() {      
       
        this.setState({
            showForm: !this.state.showForm
        });
    }

    searchpage= (e) =>
    {   
        var searchvalue=e.target.value;  
        if(localStorage.getItem('active_link')==='clients')   
        {
            var filteredclients=[];
            if(searchvalue!=="")
            {
                filteredclients= this.props.state.clients.filter((client) =>
                {
                
                
                    var flag=client.name.toLowerCase().search(searchvalue);
                    if(flag===0)
                    return client;
                });
           }
           else
                filteredclients=this.props.state.clients;
            this.props.setState({ clients: filteredclients });
        }

        else if(localStorage.getItem('active_link')==='clients')   
        {
            var filteredpets=[];
            if(searchvalue!=="")
            {
                filteredpets= this.props.state.pets.filter((client) =>
                {
                
                
                    var flag=client.name.toLowerCase().search(searchvalue);
                    if(flag===0)
                    return client;
                });
           }
           else
           filteredpets=this.props.state.pets;
            this.props.setState({ pets: filteredpets });
        }
    }

    clickMenu = (linklabel) =>{      
       
        console.log("came into click menu");
        this.setState({
            activemenutem: linklabel
        });
        localStorage.setItem('active_link',linklabel);
    }

    render() {
        let searchForm = this.state.showForm ? (
            <form className="menu__search-form" method="POST">
                <input className="menu__search-input" placeholder="Search Text" onChange={this.searchpage} />
            </form>
        ) : '';

       

        let linksMarkup = this.props.links.map((link, index) => {
           if((link.showforloggedinUser && this.state.loggedIn))
           {

            if(link.link==='logout')
            {
                let linkMarkup = 
                    <a className={ this.state.activemenutem===link.label?'menu__link menu__link--active' :'menu__link'} href={link.link} onClick={this.logout}>{link.label}</a>
               
                return (                
                    <li key={index} className="menu__list-item">
                        {linkMarkup}
                    </li>
                );
            }
            else
            {
                let linkMarkup = 
                    <a className={ this.state.activemenutem===link.link?'menu__link menu__link--active' :'menu__link'} href={link.link} onClick={()  => this.clickMenu(link.link)}>{link.label}</a>
                ;

                return (                
                    <li key={index} className="menu__list-item">
                        {linkMarkup}
                    </li>
                );
            }
           
           }
           else if((link.ShowfornologgedinUser && !this.state.loggedIn) || (link.showforloggedinUser && link.ShowfornologgedinUser))
           {         
            let linkMarkup = 
                <a className={ this.state.activemenutem===link.link?'menu__link menu__link--active' :'menu__link'} href={link.link} onClick={() => this.clickMenu(link.link)}>{link.label}</a>
            ;

            return (                
                <li key={index} className="menu__list-item">
                    {linkMarkup}
                </li>
            );
           
           
           }
        });

        return (
            <nav className="menu">
                <h1 style={{
                backgroundImage: 'url(' + this.props.logo + ')'
                }} className="menu__logo">Pet Care at your service</h1>

                <div className="menu__right">
                    <ul className="menu__list">
                        {linksMarkup}
                    </ul>                    
                    <button onClick={this.showForm.bind(this)} style={{
                    backgroundImage: 'url(' + searchicon + ')'
                    }} className="menu__search-button"></button>

                    {searchForm}
                </div>
            </nav>           
            
        );
    }
}

export default Headermenu;