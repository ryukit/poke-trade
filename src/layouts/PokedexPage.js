import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PokedexPage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            items_short: [],
            formDisplayed: false,
            buttonText: "Add new Pokedex entry"
        }
        this.onToggleForm = this.onToggleForm.bind(this);
        this.onNewItem = this.onNewItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.sendSomeItems = this.sendSomeItems.bind(this);
  
    }

    onNewItem(newItem) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(newItem.id).set(newItem);
    }

    onRemoveItem(itemId) {
        // var ref = new firebase.database().ref('pokedex/');
        // ref.child(itemId).remove();
        debugger;
    }

    onToggleForm() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    }

    sendSomeItems() {
        var getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status === 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status, xhr.response);
                }
            };
            xhr.send();
        };

        getJSON('../src/poke-data/pokedex-other.json',
        function(err, data) {
            if (err !== null) {
                
            } else {
                $this.renderList(data);
                $this.setState({
                    items_list: JSON.stringify(data)
                });
            }
        });

        var ref = new firebase.database().ref('poke-dex/other');
        console.log(this.state.items_list);

        let data = JSON.parse(this.state.items_list);
        var pokemonItems = data.map(function(item) {
            var newItem = {name: item.name, dex: item.dex, id: item.id, type: item.types, region: 'other', isShiny: false, isAvailable: false}; 
            ref.child(newItem.id).set(newItem);
        }.bind(this));
    }

    loadPokedexData () {
        var ref = new firebase.database().ref('poke-dex/other');

        ref.on('value', function(snapshot) {
            const items = [];
            var sorted = [];

            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                items.push(item);
            });
            debugger;

            sorted = _.sortBy(items, function(item) {
                return item.dex;
            });

            this.setState({
                items_short: sorted
            });
            debugger;

            // var refShort = new firebase.database().ref('pokedex-short');
            // if (this.state.items_short !== undefined){
            //     let data = this.state.items_short;
            //     var pokemonItems = this.state.items_short.map(function(item) {
            //         var newItem = {name: item.name, dex: item.dex, id: item.id, isShiny: item.isShiny, isAvailable: item.isAvailable}; 
            //         //refShort.child(newItem.id).set(newItem);
            //     }.bind(this));
            // }

        }.bind(this));
        debugger;   
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
                let shinyCount = 0;
                for(let i=0; i<shiny_items.length; i++){
                    if (shiny_items[i].isShiny == true){
                        shinyCount++
                    }
                }

                this.setState({
                    shiny_items: shiny_items,
                    shiny_items_value: shinyCount
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
                let luckyCount = 0;
                for(let i=0; i<lucky_items.length; i++){
                    if (lucky_items[i].isLucky == true){
                        luckyCount++
                    }
                }

                this.setState({
                    lucky_items: lucky_items,
                    lucky_items_value: luckyCount
                });

            }.bind(this));
        }
    }

    renderList(data) {
        console.log(data.length);
    }

    componentDidMount() {
        let $this = this;
        $this.loadUserShinyData();
        $this.loadUserLuckyData();
        //$this.loadPokedexData();
    }

	render() {
        let luckyCount;
        let shinyCount;
        if (this.state.lucky_items_value !== undefined && this.state.shiny_items_value !== undefined){
            luckyCount = this.state.lucky_items_value;
            shinyCount = this.state.shiny_items_value;
        }
        let user = this.props.userName;
        let role = this.props.userRole;

        return (
            <div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">

                                {(() => {
                                    if (role == "user" || role == "admin"){
                                        return (
                                            <div className="mdl-cell mdl-cell--12-col statTable">
                                                <p>Your Lucky: {luckyCount}</p>
                                                <p>Your Shiny: {shinyCount}</p>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            ''
                                        );
                                    }
                                })()}
                            
                                <div className="mdl-cell mdl-cell--12-col">
                                    {/* <a href="#" onClick={this.sendSomeItems}>Click</a> /part of the admin functionality/ */}
                                    
                                    <Link 
                                        className="customLink" 
                                        to={'/region/kanto'}>
                                        Kanto region
                                    </Link>
                                    <Link 
                                        className="customLink" 
                                        to={'/region/johto'}>
                                        Johto region
                                    </Link>
                                    <Link 
                                        className="customLink" 
                                        to={'/region/hoenn'}>
                                        Hoenn region
                                    </Link>
                                    <Link 
                                        className="customLink" 
                                        to={'/region/sinnoh'}>
                                        Sinnoh region
                                    </Link>
                                    <Link 
                                        className="customLink" 
                                        to={'/region/other'}>
                                        Other region
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
