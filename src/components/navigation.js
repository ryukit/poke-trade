import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Links = () => {
    return (
        <div className="nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink className="mdl-navigation__link" exact to='/'>Home</NavLink></li>
                <li><NavLink className="mdl-navigation__link" to='/trades'>Trades</NavLink></li>
            </ul>
        </div>
    )
}

export default Links;