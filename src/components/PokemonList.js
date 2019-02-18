import React, {Component} from 'react'
import PokemonItem from "../components/PokemonItem"

export default class PokemonList extends Component {
	constructor(props) {
		super(props)

	}


	render() {
        let user = this.props.userName;
        let role = this.props.userRole;
        var pokemonItems = '';
        //console.log('this.props.items', this.props.items)
        let data = this.props.items;
        let shinyList = this.props.shinyItems;
        //debugger;
        // if ( data !== undefined ){
        //     data = JSON.parse(this.props.items);
        //     var pokemonItems = data.map(function(item) {
        //         return <PokemonItem
        //             id={item.id}
        //             key={item.id}
        //             dex_number={item.id}
        //             name={item.name}
        //             image={item.id}
        //             description={item.base}
        //             pokeType={item.type}
        //             isShiny={item.id}
        //             onRemoveItem={this.props.onRemoveItem}
        //         />
        //     }.bind(this));
        // }
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

        var pokemonItems = data.map(function(item) {
            if ( role !== 'admin' && item.isAvailable == false ){
                return;
            } else {
                return <PokemonItem
                    id={item.id}
                    key={item.id}
                    dex_number={item.dex}
                    name={item.name}
                    image={item.id}
                    region={item.region}
                    description={item.id}
                    pokeType={item.type}
                    isShiny={item.isShiny}
                    isAvailable={item.isAvailable}
                    onRemoveItem={this.props.onRemoveItem}
                    userName={this.props.userName}
                    userRole={this.props.userRole}
                    userId={this.props.userId}
                    userShinyData={this.props.shinyItems}
                    userLuckyData={this.props.luckyItems}
                />
            }
        }.bind(this));

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