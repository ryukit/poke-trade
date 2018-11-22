import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Links extends Component {
	constructor(props) {
        super(props)
        this.onLinkClick = this.onLinkClick.bind(this)
    }

    onLinkClick(){
    	let button = document.getElementsByClassName('mdl-layout__drawer-button')[0];
    	button.click();
    }

    render() {
	    return (
	        <div className="nav-wrapper">
	            <ul id="nav-mobile" className="right hide-on-med-and-down">
	                <li onClick={this.onLinkClick}><NavLink className="mdl-navigation__link" exact to='/'>Home</NavLink></li>
	                <li onClick={this.onLinkClick}><NavLink className="mdl-navigation__link" to='/trades'>Trades</NavLink></li>
	            </ul>
	        </div>
	    )
	}
}