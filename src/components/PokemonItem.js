import React, {Component} from 'react'

export default class PokemonItem extends Component {
	constructor(props) {
		super(props)
		this.removeItem = this.removeItem.bind(this)
		this.toggleInfo = this.toggleInfo.bind(this)
		this.changeAvailability = this.changeAvailability.bind(this)
		this.changeShinyState = this.changeShinyState.bind(this)
		this.changeUserShinyState = this.changeUserShinyState.bind(this)
		this.changeUserLuckyState = this.changeUserLuckyState.bind(this)
	}

	changeAvailability(e){
		let targerVal = e.target.checked;
		//console.log('poke-dex/'+this.props.region+'/'+this.props.id+'/isAvailable')
		//console.log(targerVal);
		var ref = new firebase.database().ref('poke-dex/'+this.props.region+'/'+this.props.id+'/isAvailable');
        ref.set(targerVal);
	}

	changeShinyState(e){
		let targerVal = e.target.checked;
		//console.log('poke-dex/'+this.props.region+'/'+this.props.id+'/isShiny')
		//console.log(targerVal);
		var ref = new firebase.database().ref('poke-dex/'+this.props.region+'/'+this.props.id+'/isShiny');
        ref.set(targerVal);
	}

	changeUserShinyState(e){
		let targerVal = e.target.checked;
		let userId = this.props.userId;
		var ref = new firebase.database().ref('user_list/'+userId+'/shiny_list/'+this.props.id);
		//debugger;
		ref.child('dex').set(this.props.dex_number);
		ref.child('isShiny').set(targerVal);
	}

	changeUserLuckyState(e){
		let targerVal = e.target.checked;
		let userId = this.props.userId;
		var ref = new firebase.database().ref('user_list/'+userId+'/lucky_list/'+this.props.id);
		//debugger;
		ref.child('dex').set(this.props.dex_number);
		ref.child('isLucky').set(targerVal);
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
		if( typeof typeStr !== 'undefined' && false ){
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
		let user = this.props.userName;
        let role = this.props.userRole;
		let val = this.props.dex_number;
		let userShinyData = this.props.userShinyData;
		let userLuckyData = this.props.luckyItems;
		//debugger;

		let checkedState;
		if (this.props.isAvailable == true){
			checkedState = 'checked';
		}
		let shinyState;
		if (this.props.isShiny == true){
			shinyState = 'checked';
		}

		while ((val+"").length < 3)
		   val = "0" + val;
		let name = this.props.name;
		let formatedName = name.replace(/[^0-9a-z]/gi, '');
		
		let imgSrc = '/src/thumbnails/'+val+formatedName+'.png';
		let shinyText;

		let shinyVal = this.props.isShiny;
		if ( shinyVal == true ){
			shinyText = <i className="shinyLabel"></i>;
		}

		let userShinyState;
		if (userShinyData !== undefined || userShinyData !== null) {
			//debugger;
			for ( let i=0; i<userShinyData.length; i++){
				//debugger;
				if( userShinyData[i].dex == this.props.dex_number){
					//debugger;
					userShinyState = 'checked';
				}
			}
		}

		let userLuckyState;
		if (userLuckyData !== undefined || userLuckyData !== null) {
			//debugger;
			for ( let i=0; i<userLuckyData.length; i++){
				//debugger;
				if( userLuckyData[i].dex == this.props.dex_number){
					//debugger;
					userLuckyState = 'checked';
				}
			}
		}

		
        return (
        	<tr key={this.props.id} id={this.props.id}>
        		<td width="30">
        			{this.props.dex_number}
    			</td>
        		<td width="80" className="mdl-data-table__cell--non-numeric">
        			<div className="mdl-list__item-holder">
	        			<img src={imgSrc} alt="" className="mdl-list__item-avatar"/>
						{shinyText}
					</div>
        		</td>
        		<td className="mdl-data-table__cell--non-numeric">
        			<div>
        				<strong>{this.props.name}</strong> <a href="#" className="mdl-list__item-sub-title is-hidden" onClick={this.toggleInfo}>More info </a>
        			</div>
        			<p className="mdl-list__item-primary-content js-desc is-hidden">
		            	
		            	currently no info
		        	</p>
		        	<ul className="TypeOptions js-pokeType"></ul>
        		</td>
        		<td>
	        		{(() => {
	                    if (role == "admin"){
	                        return (
	                        	<div>
	                            	<p>A: <input type="checkbox" defaultChecked={checkedState} onChange={this.changeAvailability} /></p>
        							<p>S: <input type="checkbox" defaultChecked={shinyState} onChange={this.changeShinyState} /></p>
        						</div>
	                        );
	                    } else {
	                        return (
	                            ""
	                        );
	                    }
	                })()}

	                {(() => {
	                    if (role == "admin" || role == "user" && shinyVal == true){
	                        return (
	                        	<div>
	                        		<p>P_Shiny: <input type="checkbox" defaultChecked={userShinyState} onChange={this.changeUserShinyState} /></p>
        						</div>
	                        );
	                    } else {
	                        return (
	                            ""
	                        );
	                    }
	                })()}

	                {(() => {
	                    if (role == "admin" || role == "user"){
	                        return (
	                        	<div>
	                        		<p>P_Lucky: <input type="checkbox" defaultChecked={userLuckyState} onChange={this.changeUserLuckyState} /></p>
        						</div>
	                        );
	                    } else {
	                        return (
	                            ""
	                        );
	                    }
	                })()}
        			
        			{/* <a href="#" className="mdl-list__item-secondary-action" onClick={this.removeItem}>
		                <i className="material-icons">clear</i>
		            </a> /part of old functionality/ */}
        		</td>
            </tr>
        );
    }
}
