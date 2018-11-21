import React, {Component} from 'react'
import TradeList from "../components/TradeList"

export default class TradePage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            trade_list: [],
            default_trade_list: [],
        }
        this.handleSearch = this.handleSearch.bind(this);
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

	render() {
    
        return (
            <div className="wow">
                <input type="text" className="searcField" onChange={this.handleSearch} />
                <TradeList tradeList={this.state.trade_list} />
            </div>
        );
    }
}
