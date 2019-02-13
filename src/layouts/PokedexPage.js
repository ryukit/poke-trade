import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PokedexPage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
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
        var ref = new firebase.database().ref('poke-dex/other');
        console.log(this.state.items_list);
        // for (let i=0; i < 10; i++){
        //     console.log(this.state.items_list.[]);
        // }
        //ref.child(newItem.id).set(newItem);

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

            sorted = _.sortBy(items, function(item) {
                return item.dex;
            });

            this.setState({
                items: sorted
            });

        }.bind(this));

    }

    renderList(data) {
        console.log(data.length);
    }

    componentDidMount() {
        let $this = this;
        this.loadPokedexData();

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
    }

	render() {
        console.log(this.state.items)
        return (
            <div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
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
