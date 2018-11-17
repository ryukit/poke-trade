import React, {Component} from 'react'
import PokemonList from '../components/PokemonList'
import ShowAddButton from '../components/ShowAddButton'
import PokemonAddForm from '../components/PokemonAddForm'
import TradeList from '../components/TradeList'
import TradeAddForm from '../components/TradeAddForm'

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
			items: [],
			trade_list: [],
			default_trade_list: [],
			formDisplayed: false,
		}
		this.onToggleForm = this.onToggleForm.bind(this);
		this.onNewItem = this.onNewItem.bind(this);
		this.onNewTrade = this.onNewTrade.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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

    loadTradeData() {
    	var ref = new firebase.database().ref('trade_ticket/');
		ref.on('value', function(snapshot) {
            const trades = [];
            
            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                trades.push(item);
            });

            this.setState({
                trade_list: trades,
                default_trade_list: trades
            });

        }.bind(this));

    }

    handleSearch(e){
		const defaultList = this.state.default_trade_list;
		let searchQuery = e.target.value.toLowerCase();
		let tradeList = this.state.trade_list;
        tradeList = defaultList.filter(function(el){
            var searchValue = el.sp_pokemon.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            trade_list: tradeList
        });
        if (e.target.value == ''){
        	this.loadTradeData();
        }
    }

    componentDidMount() {
        this.loadPokedexData();
        this.loadTradeData();
    }

    onToggleForm() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    }

    onNewItem(newItem) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(newItem.id).set(newItem);
    }

    onRemoveItem(itemId) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(itemId).remove();
    }

    onNewTrade(newItem){
    	var ref = new firebase.database().ref('trade_ticket/');
        ref.child(newItem.id).set(newItem);
    }


	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header pageHeader">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">HELLO</span>
                        <input type="text" className="searcField" onChange={this.handleSearch} />
                        <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
                    </div>
                    {/* <PokemonAddForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem}  /> */}
                    <TradeAddForm displayed={this.state.formDisplayed} onNewTrade={this.onNewTrade} />
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Title</span>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    {/* <PokemonList items={this.state.items} onRemoveItem={this.onRemoveItem} /> */}

                                    <TradeList tradeList={this.state.trade_list} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
		)
	}
}