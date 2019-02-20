import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PokemonList from '../components/PokemonList'
import TopAnchor from '../components/TopAnchor'

export default class PokedexRegionPage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            shiny_items: [],
            lucky_items: []
        }  
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    // onNewItem(newItem) {
    //     var ref = new firebase.database().ref('pokedex/');
    //     ref.child(newItem.id).set(newItem);
    // }

    onRemoveItem(itemId) {
        // var ref = new firebase.database().ref('pokedex/');
        // ref.child(itemId).remove();
        //debugger;
    }

    loadPokedexData () {
        var region = this.props.regionName;
        var ref = new firebase.database().ref('poke-dex/'+region);
        //debugger;
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
                return item.dex;
            });

            this.setState({
                items: sorted
            });

        }.bind(this));

    }

    loadUserShinyData(){
        let loggedUser = this.props.userId;
        if (loggedUser !== undefined && loggedUser !== null) {
            var ref = new firebase.database().ref('user_list/'+loggedUser+"/shiny_list");
            //debugger;
            ref.on('value', function(snapshot) {
                //debugger;
                const shiny_items = [];
                var sorted = [];

                snapshot.forEach(function(itemSnap) {
                    const item1 = itemSnap.val();
                    //item.key = itemSnap.getKey();
                    //item.id = itemSnap.getKey();
                    shiny_items.push(item1);
                });
                //debugger;
                // sorted = _.sortBy(shiny_items, function(item) {
                //     return item.dex;
                // });

                this.setState({
                    shiny_items: shiny_items
                });

            }.bind(this));
        }
    }

    loadUserLuckyData(){
        let loggedUser = this.props.userId;
        if (loggedUser !== undefined && loggedUser !== null) {
            var ref = new firebase.database().ref('user_list/'+loggedUser+"/lucky_list");
            //debugger;
            ref.on('value', function(snapshot) {
                //debugger;
                const lucky_items = [];
                var sorted = [];

                snapshot.forEach(function(itemSnap) {
                    const item2 = itemSnap.val();
                    //item.key = itemSnap.getKey();
                    //item.id = itemSnap.getKey();
                    lucky_items.push(item2);
                });
                //debugger;
                // sorted = _.sortBy(shiny_items, function(item) {
                //     return item.dex;
                // });

                this.setState({
                    lucky_items: lucky_items
                });

            }.bind(this));
        }
    }

    componentDidMount() {
        let $this = this;
        this.loadPokedexData();
        this.loadUserShinyData();
        this.loadUserLuckyData();
    }
    updateRegionDex(){
        let region = e.target.dataset.region;
        var ref = new firebase.database().ref('poke-dex/'+region);
        //debugger;
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
                return item.dex;
            });

            this.setState({
                items: sorted
            });

        }.bind(this));
    }

	render() {
        var region = this.props.regionName;
        let linkNext, linkPrev;

        switch (region) {
            case "kanto":
                linkNext = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/johto'} data-region="johto"> Johto region </Link>;
            break;
            case "johto":
                linkPrev = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/kanto'} data-region="kanto"> Kanto region </Link>;
                linkNext = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/hoenn'} data-region="hoenn"> Hoenn region </Link>;
            break;
            case "hoenn":
                linkPrev = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/johto'} data-region="johto"> Johto region </Link>;
                linkNext = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/sinnoh'} data-region="sinnoh"> Sinnoh region </Link>;
            break;
            case "sinnoh":
                linkPrev = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/hoenn'} data-region="hoenn"> Hoenn region </Link>;
                linkNext = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/other'} data-region="other"> Other region </Link>;
            break;
            case "other":
                linkPrev = <Link className="customLink" onClick={this.updateRegionDex} to={'/region/sinnoh'} data-region="sinnoh"> Sinnoh region </Link>;
            break;
        }

        return (
            <div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <PokemonList items={this.state.items} shinyItems={this.state.shiny_items} luckyItems={this.state.lucky_items} onRemoveItem={this.onRemoveItem} userName={this.props.userName} userRole={this.props.userRole} userId={this.props.userId} />
                                    <div className="paginationButtons">
                                        <div className="paginationBittons-left">{linkPrev}</div>
                                        <div className="paginationBittons-right">{linkNext}</div>
                                    </div>
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
