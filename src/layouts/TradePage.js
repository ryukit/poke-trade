import React, {Component} from 'react'
import TradeList from "../components/TradeList"
import TradeAddForm from '../components/TradeAddForm'
import ShowAddButton from '../components/ShowAddButton'

export default class TradePage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            trade_list: [],
            default_trade_list: [],
            formDisplayed: false,
        }
        this.onToggleForm = this.onToggleForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onNewTrade = this.onNewTrade.bind(this);
    }

    onToggleForm() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    }

    loadTradeData() {
        var ref = new firebase.database().ref('trade_ticket/');
        ref.on('value', function(snapshot) {
            const trades = [];
            let sorted = [];
            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                trades.push(item);
            });

            sorted = _.sortBy(trades, function(item) {
                return item.time_stamp * -1;
            });

            this.setState({
                trade_list: sorted,
                default_trade_list: sorted
            });

        }.bind(this));
    }

    componentDidMount() {
        this.loadTradeData();
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

    onNewTrade(newItem){
        var ref = new firebase.database().ref('trade_ticket/');
        ref.child(newItem.id).set(newItem);
    }

	render() {
    
        return (
            <div>
                <main className="mdl-layout__content">
                    <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
                    <TradeAddForm displayed={this.state.formDisplayed} onNewTrade={this.onNewTrade} />              
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <input type="text" className="searcField" onChange={this.handleSearch} />
                                    <TradeList tradeList={this.state.trade_list} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
