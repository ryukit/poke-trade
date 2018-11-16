import React, {Component} from 'react'
import PokemonItem from "../components/PokemonItem"

export default class PokemonList extends Component {
	constructor(props) {
		super(props)

	}


	render() {

        var pokemonItems = this.props.items.map(function(item) {
            return <PokemonItem
                id={item.id}
                dex_number={item.dex_number}
                name={item.name}
                image={item.image}
                description={item.description}
                pokeType={item.poke_type}
                isShiny={item.is_shiny}
                onRemoveItem={this.props.onRemoveItem}
            />
        }.bind(this));

        return (
            <div className="itemList small-container">
            	<div className="mdl-spinner mdl-js-spinner is-active itemList-spinner"></div>
	            <table className="mdl-data-table mdl-shadow--2dp">
	            	<tbody>
                		{pokemonItems}
                	</tbody>
                </table>
            </div>
        );
    }
}