import React, {Component} from 'react'

export default class PokemonItem extends Component {
	constructor(props) {
		super(props)
		this.removeItem = this.removeItem.bind(this)
		this.toggleInfo = this.toggleInfo.bind(this)
	}

	removeItem(e){
		e.preventDefault();
		let itemId = this.props.id
		this.props.onRemoveItem(itemId)
	}
	toggleInfo(e){
		e.preventDefault();
		debugger;
		let parentItem = e.target.parentNode
		let item = parentItem.getElementsByClassName("js-desc")[0];
		item.classList.toggle('is-hidden');
	}


	render() {
		let typeStr = this.props.pokeType;
		if( typeof typeStr !== 'undefined' ){
			let typeArr = typeStr.split(',');
			console.log(typeArr)
			var tempVar = '';
		
			for (var i = 0; i < typeArr.length; i++) {
		        tempVar += '<li>' + typeArr[i] + '</li>';
		    }

		}
        return (
        	<tr key={this.props.id} id={this.props.id}>
        		<td>
        			{this.props.dex_number}
    			</td>
        		<td className="mdl-data-table__cell--non-numeric">
        			<img src={this.props.image} alt="" className="mdl-list__item-avatar"/>
        		</td>
        		<td className="mdl-data-table__cell--non-numeric">
        			<div><strong>{this.props.name}</strong> - <a href="#" className="mdl-list__item-sub-title" onClick={this.toggleInfo}>More info</a></div>
        			<p className="mdl-list__item-primary-content">
		            	<span className="mdl-list__item-text-body is-hidden js-desc">{this.props.description}</span>
		        	</p>
		        	<ul className="TypeOptions js-pokeType">
		        		{tempVar}
		        	</ul>
        		</td>
        		<td>
        			<a href="#" className="mdl-list__item-secondary-action" onClick={this.removeItem}>
		                <i className="material-icons">clear</i>
		            </a>
        		</td>
            </tr>
        );
    }
}
