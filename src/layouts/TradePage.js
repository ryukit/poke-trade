import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import TradeList from "../components/TradeList"
import TradeAddForm from '../components/TradeAddForm'
import ShowAddButton from '../components/ShowAddButton'
import TopAnchor from '../components/TopAnchor'

export default class TradePage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            trade_list: [],
            default_trade_list: [],
            page_viewed_trades: 0,
            trade_list_length: 0,
            loadMoreDisplayed: true,
            formDisplayed: false,
            postLoadValue: 12,
            pageTitle: 'Available trades',
            buttonText: "Add new Trade"
        }
        this.onToggleForm = this.onToggleForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onNewTrade = this.onNewTrade.bind(this);
        this.pagiClick = this.pagiClick.bind(this);
        this.toggleMoreState = this.toggleMoreState.bind(this);
    }

    onToggleForm() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    }

    loadTradeData(val) {
        var mainRef = new firebase.database().ref('trade_ticket/');
        var ref = new firebase.database().ref('trade_ticket/').orderByChild("sort_stamp").limitToFirst(val);

        mainRef.once('value', function(snapshot) {
            let trades = [];
            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                trades.push(item);
            });

            this.setState({
                trade_list_length: trades.length
            });

        }.bind(this));

        ref.once('value', function(snapshot) {
            const trades = [];
            let sorted = [];
            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                trades.push(item);
            });

            // sorted = _.sortBy(trades, function(item) {
            //     return item.time_stamp * -1;
            // });

            // console.log(sorted.length)

            // let arrCopy = sorted.slice();
            // let pagedList = [];

            // for (let i=0; i<(sorted.length/2); i++){
            //     let pArr = [];
            //     for ( let j=1; j<=2; j++){
            //         if( arrCopy.length ){
            //             let firstNo = arrCopy.shift();
            //             pArr.push(firstNo);
            //         }
            //         //debugger;
            //     }
            //     pagedList.push(pArr);
            // }

            // debugger;

            this.setState({
                trade_list: trades,
                default_trade_list: trades,
                page_viewed_trades: val
                //paged_trade_list: pagedList
            });

        }.bind(this));
    }
    pagiClick(e){
        e.preventDefault();
        //let page = parseInt(e.target.dataset.page);
        let items = this.state.page_viewed_trades + this.state.postLoadValue
        if ( items >= this.state.trade_list_length ){
            this.toggleMoreState(false);
        }
        
        this.loadTradeData(items);
    }

    componentDidMount() {
        this.loadTradeData(this.state.postLoadValue);
    }

    toggleMoreState(val){
        this.setState({
            loadMoreDisplayed: val
        });
    }

    handleSearch(e){
        //const defaultList = this.state.default_trade_list;

        let searchQuery = e.target.value.toLowerCase();
        let targetValue = e.target.value;
        // let tradeList = this.state.trade_list;
        // tradeList = defaultList.filter(function(el){
        //     var searchValue = el.sp_pokemon.toLowerCase();
        //     return searchValue.indexOf(searchQuery) !== -1;
        // });
        
        var mainRef = new firebase.database().ref('trade_ticket/').orderByChild("sp_pokemon").startAt(searchQuery).endAt(searchQuery+'\uf8ff');
//debugger;
        mainRef.on('value', function(snapshot) {
            let trades = [];
            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                trades.push(item);
            });

            this.setState({
                trade_list: trades,
            });

            if (targetValue === ''){
                this.toggleMoreState(true);
            } else {
                this.toggleMoreState(false);
            }

        }.bind(this));

        // this.setState({
        //     trade_list: tradeList
        // });

        if (targetValue === ''){
            this.loadTradeData(this.state.postLoadValue);
            console.log(this.state.loadMoreDisplayed)
            this.toggleMoreState(true);
        }
    }

    onNewTrade(newItem){
        var ref = new firebase.database();
        let tradeRef = {
            tradeId: newItem.id
        }
        ref.ref('trade_ticket/').child(newItem.id).set(newItem);
        ref.ref('user_list/'+this.props.userId+'/created_trades/').child(newItem.id).set(tradeRef);
        this.loadTradeData(12);
        this.toggleMoreState(true);
        this.onToggleForm();
    }

	render() {
        var trade_value = this.state.trade_list_length;
        //debugger;
        // let rec_trade_list = this.state.paged_trade_list;
        // let num_page_list = [];
        // if ( typeof rec_trade_list !== 'undefined' ) {
        //     num_page_list = rec_trade_list[0]
        // }
        let styles = '';
        if ( this.state.loadMoreDisplayed == true ){
            styles = {'display': 'block'}
        } else {
            styles = {'display': 'none'}
        }
        let tradeForm;
        let showBtn;
        let role = this.props.userRole;
        if (role == 'user' || role == 'admin') {
            showBtn = <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} buttonText={this.state.buttonText} />
            tradeForm = <TradeAddForm displayed={this.state.formDisplayed} onNewTrade={this.onNewTrade} userName={this.props.userName} userRole={this.props.userRole} />    
        } else {
            tradeForm = "";
            showBtn = "";
        }

    
        return (
            <div>
                <main className="mdl-layout__content">
                    <div className="pageTopBar">
                        <h3 className="pageTopBar-title">{this.state.pageTitle}</h3>
                        <h4 className="pageTopBar-meta">{trade_value} items</h4>
                        {(() => {
                            if (role == "user" || role == "admin"){
                                return (
                                    <NavLink className="myTrades-link" to='/my-trades'>My Trades</NavLink>
                                );
                            } else {
                                return (
                                    ""
                                );
                            }
                        })()}
                    </div>
                    {showBtn}
                    {tradeForm}
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <div className="searcField">
                                        <input type="text" className="searcField-input" onChange={this.handleSearch} placeholder="enter pokemon name" />
                                    </div>
                                    <TradeList tradeList={this.state.trade_list} />
                                    <ul style={styles} className="tradeList-loadMore">
                                        <li><a href="#" onClick={this.pagiClick}>Load More</a></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <TopAnchor />
            </div>
        );
    }
}
