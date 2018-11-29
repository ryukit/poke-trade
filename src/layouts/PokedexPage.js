import React, {Component} from 'react'
import PokemonList from '../components/PokemonList'
import ShowAddButton from '../components/ShowAddButton'
import PokemonAddForm from '../components/PokemonAddForm'

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
  
    }

    onNewItem(newItem) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(newItem.id).set(newItem);
    }

    onRemoveItem(itemId) {
        var ref = new firebase.database().ref('pokedex/');
        ref.child(itemId).remove();
    }

    onToggleForm() {
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
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

	render() {
    
        return (
            <div>
                <main className="mdl-layout__content">
                    <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} buttonText={this.state.buttonText} />
                    <PokemonAddForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <PokemonList items={this.state.items} onRemoveItem={this.onRemoveItem} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
