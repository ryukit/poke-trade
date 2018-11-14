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
        return (
        	<li className="mdl-list__item mdl-list__item--three-line" key={this.props.id} id={this.props.id}>
	        	<span className="mdl-list__item-primary-content">
		            <img src={this.props.image} alt="" className="mdl-list__item-avatar"/>
	            	<span className="title">{this.props.dex_number} - {this.props.name}</span>
	            	<a href="#" className="mdl-list__item-sub-title" onClick={this.toggleInfo}>More info</a>
	            	<span className="mdl-list__item-text-body is-hidden js-desc">{this.props.description}</span>
	        	</span>
					
	            <a href="#" className="mdl-list__item-secondary-action" onClick={this.removeItem}>
	                <i className="material-icons">clear</i>
	            </a>
	           
            </li>
        );
    }
}