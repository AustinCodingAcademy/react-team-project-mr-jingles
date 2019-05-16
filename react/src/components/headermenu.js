import React, { Component } from 'react';

import searchicon from '../search_icon.png';

class Headermenu extends Component {
    constructor() {
        super();

        this.state = {
            showForm: false,
            loggedIn: !!localStorage.getItem('JWT_TOKEN')
        };
    }

    logout = () => {
        localStorage.clear();
        this.setState({ loggedIn: false })
        window.location.href = '/'
      }

    showForm() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    render() {
        let searchForm = this.state.showForm ? (
            <form className="menu__search-form" method="POST">
                <input className="menu__search-input" placeholder="Type and hit enter" />
            </form>
        ) : '';

        let linksMarkup = this.props.links.map((link, index) => {
           
            let linkMarkup = link.active ? (
                <a className="menu__link menu__link--active" href={link.link}>{link.label}</a>
            ) : (
                <a className="menu__link" href={link.link}>{link.label}</a>
            );

            return (
                <li key={index} className="menu__list-item">
                    {linkMarkup}
                </li>
            );
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