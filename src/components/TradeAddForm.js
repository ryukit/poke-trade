import React, {Component} from 'react'

export default class TradeAddForm extends Component {
	constructor(props) {
		super(props)
        //this.imageUploaded = this.imageUploaded.bind(this)
        this.handleForm = this.handleForm.bind(this)
        //this.toggleType = this.toggleType.bind(this)
        this.shinyToggle = this.shinyToggle.bind(this)
	}


	imageUploaded() {
        var preview = document.getElementById('imageLoadForTrade');
        var file    = document.getElementById('trade_attachment_input').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
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

        if ( thisItem.dataset.shiny === "true" ) {
            thisItem.setAttribute("data-shiny", "false");
            shinyField.value = "false"
        } else {
            thisItem.setAttribute("data-shiny", "true");
            shinyField.value = "true"
        }
    }

    handleForm(e) {
        e.preventDefault();
        var imageData = this.refs.image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);

        var newItem = {
            user_name: this.refs.user_name.value,
            sp_pokemon: this.refs.sp_pokemon.value,
            rec_pokemon: this.refs.rec_pokemon.value,
            id: uid,
            status: 'active',
            type: 'get',
            additional_info: this.refs.ad_info.value,
            attachment_image: imageData,
            sp_trade_shiny: this.refs.sp_trade_shiny.value,
            rec_trade_shiny: this.refs.rec_trade_shiny.value
        };
        debugger;

        this.refs.addTradeForm.reset();
        this.props.onNewTrade(newItem);
    }

    render() {
        var display = this.props.displayed ? '30px' : '-350px';
        var styles = {
            right: display
        };

        return (
            <div className="mdl-card mdl-shadow--2dp addForm" style={styles}>
                <div className="mdl-card__supporting-text">
                    <form ref="addTradeForm" action="#" onSubmit={this.handleForm}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="user_name" type="text" className="mdl-textfield__input" id="sample1" />
                            <label className="mdl-textfield__label" htmlFor="sample1">Enter your game nickname</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="sp_pokemon" type="text" className="mdl-textfield__input" id="sample4" />
                            <label className="mdl-textfield__label" htmlFor="sample4">Enter Pokemon for trade</label>
                        </div>
                        <a href="#" className="shinyCheck" data-shiny="false" data-self="sp_trade_shiny" onClick={this.shinyToggle}>
                            Shiny
                        </a>
                        <input ref="sp_trade_shiny" type="hidden" id="sp_trade_shiny" className="is-hidden" value="false"/>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="rec_pokemon" type="text" className="mdl-textfield__input" id="sample5" />
                            <label className="mdl-textfield__label" htmlFor="sample5">Enter required Pokemon</label>
                        </div>
                        <a href="#" className="shinyCheck" data-shiny="false" data-self="rec_trade_shiny" onClick={this.shinyToggle}>
                            Shiny
                        </a>
                        <input ref="rec_trade_shiny" type="hidden" id="rec_trade_shiny" className="is-hidden" value="false"/>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="ad_info" type="text" className="mdl-textfield__input" id="sample2" />
                            <label className="mdl-textfield__label" htmlFor="sample2">More info here...</label>
                        </div> 
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                            <input className="mdl-textfield__input" placeholder="File" type="text" id="uploadFile" readOnly />
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