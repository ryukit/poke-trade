import React, {Component} from 'react'

export default class TradeAddForm extends Component {
	constructor(props) {
		super(props)

        this.state = {
            items_short: [],
        }
        //this.imageUploaded = this.imageUploaded.bind(this)
        this.handleForm = this.handleForm.bind(this)
        //this.toggleType = this.toggleType.bind(this)
        this.shinyToggle = this.shinyToggle.bind(this)
        this.searchDrop = this.searchDrop.bind(this)
        this.openSearchDropDown = this.openSearchDropDown.bind(this)
        this.selectItem = this.selectItem.bind(this)
	}


	imageUploaded() {
        var preview = document.getElementById('imageLoadForTrade');
        var file    = document.getElementById('trade_attachment_input').files[0];
        var status  = document.getElementById('trade_attachment_status');
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
            status.value = file.name+' - uploaded';
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    shinyToggle(e){
        e.preventDefault();
        let thisItem = e.target;
        let dataFieldType = thisItem.dataset.self;
        let shinyField = document.getElementById(dataFieldType);
        if ( dataFieldType === "true" ) {
            thisItem.setAttribute("data-shiny", "false");
            shinyField.value = "false"
        } else {
            thisItem.setAttribute("data-shiny", "true");
            shinyField.value = "true"
        }
    }

    loadPokedexData () {
        var ref = new firebase.database().ref('pokedex-short');

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
                items_short: sorted
            });

            // var refShort = new firebase.database().ref('pokedex-short');
            // if (this.state.items_short !== undefined){
            //     let data = this.state.items_short;
            //     var pokemonItems = this.state.items_short.map(function(item) {
            //         var newItem = {name: item.name, dex: item.dex, id: item.id, isShiny: item.isShiny, isAvailable: item.isAvailable}; 
            //         //refShort.child(newItem.id).set(newItem);
            //     }.bind(this));
            // }

        }.bind(this));
    }

    componentDidMount(){
        var $this = this;
        $this.loadPokedexData();
    }

    handleForm(e) {
        e.preventDefault();
        var imageData = this.refs.image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);
        let date = new Date();
        let formStatus = true;

        if (this.refs.sp_pokemon.value == ""){
            document.getElementById('sp_trade-drop-trigger').classList.add('has-error');
            formStatus = false;
        }

        if (this.refs.rec_pokemon.value == ""){
            document.getElementById('rec_trade-drop-trigger').classList.add('has-error');
            formStatus = false;
        }

        if (formStatus == false){
            return false;
        }

        var newItem = {
            user_name: this.refs.user_name.value,
            sp_pokemon: this.refs.sp_pokemon.value.toLowerCase(),
            rec_pokemon: this.refs.rec_pokemon.value.toLowerCase(),
            id: uid,
            status: 'active',
            type: 'get',
            additional_info: this.refs.ad_info.value,
            attachment_image: imageData,
            sp_trade_shiny: document.getElementById('sp_trade_shiny_check').dataset.shiny,
            rec_trade_shiny: document.getElementById('rec_trade_shiny_check').dataset.shiny,
            time_stamp: date.getTime(),
            sort_stamp: date.getTime() * -1,
            comment_list: ''
        };

        this.refs.addTradeForm.reset();
        this.props.onNewTrade(newItem);
        this.formReset();
    }

    formReset(){
        document.getElementById('sp_trade-drop-trigger').classList.remove('has-error');
        document.getElementById('sp_trade-drop-trigger').innerText = document.getElementById('sp_trade-drop-trigger').dataset.defaulttext;
        this.refs.sp_pokemon.value = "";
        document.getElementById('sp_trade_shiny_check').dataset.shiny = "false";
        document.getElementById('sp_trade_shiny_check').classList.add("is-hidden");
        document.getElementById('rec_trade-drop-trigger').classList.remove('has-error');
        document.getElementById('rec_trade-drop-trigger').innerText = document.getElementById('rec_trade-drop-trigger').dataset.defaulttext;
        this.refs.rec_pokemon.value = "";
        document.getElementById('rec_trade_shiny_check').dataset.shiny = "false";
        document.getElementById('rec_trade_shiny_check').classList.add("is-hidden");
        this.refs.ad_info.value = "";
        this.refs.image.value = "";
    }

    openSearchDropDown(e) {
        let target = e.target;
        let bodyEl = target.dataset.dropbody;
        let $bodyEl = document.getElementById(bodyEl)
        $bodyEl.classList.toggle("show");
        $bodyEl.getElementsByTagName('input')[0].focus();
        //debugger;
    }

    searchDrop(e) {
        let targetInput = e.target;
        let searchQuery = e.target.value.toLowerCase();
        let targetValue = e.target.value;
        let filterBlock = document.getElementById(targetInput.dataset.filterblock);

        var input, filter, ul, li, a, i, div;
       // input = document.getElementById("myInput");
        filter = targetInput.value.toUpperCase();
        //div = document.getElementById("myDropdown");
        a = filterBlock.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            let txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              a[i].style.display = "";
            } else {
              a[i].style.display = "none";
            }
        }
    }

    selectItem(e) {
        let targetItem = e.target;
        let targetPokemon = targetItem.dataset.pokemon;
        let targetShiny = targetItem.dataset.shiny;
        let dataFieldType = targetItem.dataset.self;
        let shinyField = document.getElementById(dataFieldType+"_shiny_check");
        let trigger = document.getElementById(dataFieldType+"-drop-trigger");

        let hiddenField = document.getElementById(dataFieldType+"-pokemon");
        let thisDropDown = document.getElementById(dataFieldType+"-drop-body");

        trigger.dataset.selected = targetPokemon;
        trigger.innerText = targetPokemon;
        trigger.classList.remove('has-error');
        hiddenField.value = targetPokemon;
        if ( targetShiny === 'true' ){
            shinyField.classList.remove("is-hidden");
        } else {
            shinyField.classList.add("is-hidden");
        }
        thisDropDown.classList.toggle("show");
    }

    render() {
        var display = this.props.displayed ? '30px' : '-350px';
        var styles = {
            right: display
        };
        let userFieldData;
        let userFieldEditable;
        let user = this.props.userName;
        let role = this.props.userRole;
        if (user !== undefined){
            userFieldData = user;
            userFieldEditable = "disabled";
        }else {
            userFieldData = "";
            userFieldEditable = "false";
        }

        var sp_pokemonEntry = this.state.items_short.map(function(item) {
            if (item.isAvailable == true) {
                return <a href="#" data-pokemon={item.name} data-shiny={item.isShiny} data-self="sp_trade" onClick={this.selectItem}>{item.name}</a>
            } else {
                return;
            }
        }.bind(this));

        var rec_pokemonEntry = this.state.items_short.map(function(item) {
            if (item.isAvailable == true) {
                return <a href="#" data-pokemon={item.name} data-shiny={item.isShiny} data-self="rec_trade" onClick={this.selectItem}>{item.name}</a>
            } else {
                return;
            }
        }.bind(this));

        return (
            <div className="mdl-card mdl-shadow--2dp addForm" style={styles}>
                <div className="mdl-card__supporting-text">
                    <form ref="addTradeForm" action="#" onSubmit={this.handleForm}>
                        {(() => {
                            if (role == "user" || role == "admin"){
                                return (
                                    <div className="mdl-textfield mdl-js-textfield u-display--none">
                                        <input ref="user_name" type="text" className="mdl-textfield__input" disabled={userFieldEditable || 'false'} id="sample1" value={userFieldData || ''}/>
                                        <label className="mdl-textfield__label" htmlFor="sample1">Enter your game nickname</label>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input ref="user_name" type="text" className="mdl-textfield__input" id="sample1" />
                                        <label className="mdl-textfield__label" htmlFor="sample1">Enter your game nickname</label>
                                    </div>
                                );
                            }
                        })()}
                        <div className="dropdown">
                            <a  href="#" 
                                id="sp_trade-drop-trigger"
                                data-dropbody="sp_trade-drop-body"
                                className="dropbtn" 
                                data-defaulttext="Pokemon for trade" 
                                data-selected=""
                                onClick={this.openSearchDropDown}>Pokemon for trade</a>
                            <a href="#" id="sp_trade_shiny_check" className="shinyCheck is-hidden" data-shiny="false" data-self="sp_trade_shiny" onClick={this.shinyToggle}></a>
                            <input ref="sp_trade_shiny" type="hidden" id="sp_trade_shiny" className="is-hidden" value="false"/>
                            <div id="sp_trade-drop-body" className="dropdown-content">
                                <input type="text" placeholder="Search.." autoComplete="off" id="sp_trade_input" data-filterblock="sp_trade-drop-body" onChange={this.searchDrop} />
                                <div className="dropdown-content-listing">
                                    <div className="dropdown-content-listing-inner">
                                        {sp_pokemonEntry}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-textfield is-hidden">
                            <input ref="sp_pokemon" type="text" autoComplete="off" className="custom-textfield__input" id="sp_trade-pokemon" placeholder="Enter Pokemon for trade" />
                        </div>
                        <div className="dropdown">
                            <a  href="#" 
                                id="rec_trade-drop-trigger"
                                data-dropbody="rec_trade-drop-body"
                                className="dropbtn" 
                                data-defaulttext="Pokemon in return" 
                                data-selected=""
                                onClick={this.openSearchDropDown}>Pokemon in return</a>
                            <a href="#" id="rec_trade_shiny_check" className="shinyCheck is-hidden" data-shiny="false" data-self="rec_trade_shiny" onClick={this.shinyToggle}></a>
                            <input ref="rec_trade_shiny" type="hidden" id="rec_trade_shiny" className="is-hidden" value="false"/>
                            <div id="rec_trade-drop-body" className="dropdown-content">
                                <input type="text" placeholder="Search.." autoComplete="off" id="rec_trade_input" data-filterblock="rec_trade-drop-body" onChange={this.searchDrop} />
                                <div className="dropdown-content-listing">
                                    <div className="dropdown-content-listing-inner">
                                        {rec_pokemonEntry}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-textfield is-hidden">
                            <input ref="rec_pokemon" type="text" autoComplete="off" className="custom-textfield__input" id="rec_trade-pokemon" placeholder="Enter required Pokemon"/>
                        </div>
                        <div className="custom-textfield">
                            <input ref="ad_info" type="text" autoComplete="off" className="custom-textfield__input" id="sample2" placeholder="More info here..."/>
                        </div> 
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                            <input className="mdl-textfield__input" placeholder="File" type="text" id="trade_attachment_status" readOnly />
                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                                <i className="material-icons">attach_file</i><input type="file" id="trade_attachment_input" onChange={this.imageUploaded} />
                            </div>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" id="fileLoad">
                            Add Trade Request
                        </button>
                        <input ref="image" type="hidden" id="imageLoadForTrade" className="is-hidden"/>
                    </form>
                </div>
            </div>
        );
    }
}