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

export default class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: []
		}
		this.onNewItem = this.onNewItem.bind(this);
	}

	loadPokedexData () {
        var ref = new firebase.database().ref('pokedex/');

        ref.on('value', function(snapshot) {
            const items = [];
            var sorted = [];

            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                items.push(item);
            });

            sorted = _.sortBy(items, function(item) {
                return item.dex_number;
            });

            this.setState({
                items: sorted
            });

        }.bind(this));

    }

    componentDidMount() {
        this.loadPokedexData();
    }

    onNewItem(newItem) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(newItem.id).set(newItem);
    }

    onRemoveItem(itemId) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(itemId).remove();
    }



	render() {
        const tradeList=this.state.trade_list;
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header pageHeader">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title"><NavLink className="mdl-navigation__link" exact to='/'>Home</NavLink></span>

                    </div>
                    {/* <PokemonAddForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem}  /> */}
                    
                </header>
                <div className="mdl-layout__drawer">
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