import React, {Component} from 'react'
import PokemonList from '../components/PokemonList'
import PokemonAddForm from '../components/PokemonAddForm'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Routes from '../components/routes'
import Links from '../components/navigation'
import { HashRouter } from 'react-router-dom'

var config = {
    apiKey: "AIzaSyDtoR-x8n38H05-bi561PGmGmvjxXJwUvc",
    authDomain: "poke-trade-2648d.firebaseapp.com",
    databaseURL: "https://poke-trade-2648d.firebaseio.com",
    projectId: "poke-trade-2648d",
    storageBucket: "poke-trade-2648d.appspot.com",
    messagingSenderId: "801632338799"
  };
firebase.initializeApp(config);

export default class Layout extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: []
		}
	}

	render() {
        const tradeList=this.state.trade_list;
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header pageHeader">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title"><NavLink className="mdl-navigation__link" exact to='/'>Kharkiv Trade</NavLink></span>

                    </div>
                    {/* <PokemonAddForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem}  /> */}
                    
                </header>
                <div className="mdl-layout__drawer pageSideMenu">
                    <span className="mdl-layout-title">Title</span>    
                    <div>
                        <nav className="mdl-navigation">
                            <Links />
                        </nav>
                    </div>
                </div>
                <Routes />
            </div>
		)
	}
}