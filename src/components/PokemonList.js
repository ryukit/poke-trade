import React, {Component} from 'react'
import PokemonItem from "../components/PokemonItem"

export default class PokemonList extends Component {
	constructor(props) {
		super(props)

	}


	render() {
        var pokemonItems = '';
        //console.log('this.props.items', this.props.items)
        let data = this.props.items;
        //debugger;
        if ( data !== undefined ){
            data = JSON.parse(this.props.items);
            var pokemonItems = data.map(function(item) {
                return <PokemonItem
                    id={item.id}
                    key={item.id}
                    dex_number={item.id}
                    name={item.name}
                    image={item.id}
                    description={item.base}
                    pokeType={item.type}
                    isShiny={item.id}
                    onRemoveItem={this.props.onRemoveItem}
                />
            }.bind(this));
        }
        // if ( data !== undefined ){
        //     let $block = document.getElementById('wow');
        //     debugger;
        //     // for ( let i=0; i < 100; i++ ) {
        //     //     var item = document.createElement("div");
        //     //         item.append(data[i].dex + data[i].name);
        //     //         $block.append(item);
        //     // }

        //     var result = data.reduce(function(map, obj) {
        //         map[obj.key] = obj.val;
        //         return map;
        //     }, {});

        //     console.log(result);
        // }

        return (
            <div className="itemList small-container">
            	<div className="mdl-spinner mdl-js-spinner is-active itemList-spinner"></div>
	            <table className="mdl-data-table mdl-shadow--2dp">
	            	<tbody id="wow">
                		{pokemonItems}
                	</tbody>
                </table>
            </div>
        );
    }
}