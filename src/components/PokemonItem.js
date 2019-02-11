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
		let parentItem = e.target.parentNode.parentNode
		let item = parentItem.getElementsByClassName("js-desc")[0];
		item.classList.toggle('is-hidden');
	}
	componentDidMount(){
	 	let typeStr = this.props.pokeType;
		let currId = this.props.id;
		if( typeof typeStr !== 'undefined' ){
			//let typeArr = typeStr.split(',');
			
			var tempVar = '';
		
			for (var i = 0; i < typeStr.length; i++) {
		        tempVar += '<li class="TypeOptionItem"><span class="pokemontypes ' +typeStr[i].toLowerCase()+'-type-img positionTypeOption">&nbsp;</span></li>';
		       
		    }
		    let currTypeBlock = document.getElementById(currId).getElementsByClassName('js-pokeType')[0];
		    currTypeBlock.insertAdjacentHTML('beforeend', tempVar);
		}
	}


	render() {
		let shinyText = '';
		let shinyVal = '';
		var val = this.props.id;

		while ((val+"").length < 3)
		    val = "0" + val;
		let name = this.props.name.english;
		let formatedName = name.replace(/[^0-9a-z]/gi, '');
		let imgSrc = 'src/thumbnails/'+val+formatedName+'.png';
		// let shinyVal = this.props.isShiny;
		// if ( shinyVal == 'true' ){
		// 	shinyText = '*Has shiny version'
		// }
		
        return (
        	<tr key={this.props.id} id={this.props.id}>
        		<td width="30">
        			{this.props.dex_number}
    			</td>
        		<td width="80" className="mdl-data-table__cell--non-numeric">
        			<img src={imgSrc} alt="" className="mdl-list__item-avatar"/>
        		</td>
        		<td className="mdl-data-table__cell--non-numeric">
        			<div>
        				<strong>{this.props.name.english}</strong> - <a href="#" className="mdl-list__item-sub-title" onClick={this.toggleInfo}>More info </a>
						{shinyText}
        			</div>
        			<p className="mdl-list__item-primary-content js-desc is-hidden">
		            	
		            	currently no info
		        	</p>
		        	<ul className="TypeOptions js-pokeType"></ul>
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
