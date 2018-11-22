import React, {Component} from 'react'

export default class PokemonAddForm extends Component {
	constructor(props) {
		super(props)
        this.imageUploaded = this.imageUploaded.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.toggleType = this.toggleType.bind(this)
        this.shinyToggle = this.shinyToggle.bind(this)
	}


	imageUploaded() {
        var preview = document.getElementById('imageLoad');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    toggleType(e) {
        e.stopPropagation();
        let thisItem = e.target.parentNode;
        let fieldStr = document.getElementById('poke-type');
        let currType = thisItem.dataset.toggle;
        // console.log(document.getElementById('poke-type'))
        // console.log('text_field_value', fieldStr.value)
        // console.log(currType)
        if ( thisItem.classList.contains('is-active') ){
            thisItem.classList.remove('is-active');
            let newStr = fieldStr.value.replace(currType+",", '');
            fieldStr.value = newStr;
        } else {
            thisItem.classList.add('is-active');
            let newStr = fieldStr.value += ( currType+",");
            fieldStr.value = newStr;
            console.log(e.target.parentNode)
        }
    }
    shinyToggle(e){
        e.preventDefault();
        let thisItem = e.target;
        let shinyField = document.getElementById('shiny_field');
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
        let typeValue = this.refs.poke_type.value;
        let newTypeValue = typeValue.slice(0, -1);
        let seletRegion = this.refs.region;
        let seletRegionValue = seletRegion.options[seletRegion.selectedIndex].value;

        var newItem = {
            name: this.refs.name.value,
            dex_number: this.refs.dex_number.value,
            id: uid,
            description: this.refs.desc.value,
            image: imageData,
            poke_type: newTypeValue,
            region: seletRegionValue,
            is_shiny: this.refs.is_shiny.value
        };

        this.refs.feedForm.reset();
        this.props.onNewItem(newItem);
    }

    render() {
        var display = this.props.displayed ? '30px' : '-350px';
        var styles = {
            right: display
        };

        return (
            <div className="mdl-card mdl-shadow--2dp addForm" style={styles}>
                <div className="mdl-card__supporting-text">
                    <form ref="feedForm" action="#" onSubmit={this.handleForm}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="name" type="text" className="mdl-textfield__input" id="sample1" />
                            <label className="mdl-textfield__label" htmlFor="sample1">name...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="dex_number" type="text" className="mdl-textfield__input" id="sample4" />
                            <label className="mdl-textfield__label" htmlFor="sample4">dex number</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="desc" type="text" className="mdl-textfield__input" id="sample2" />
                            <label className="mdl-textfield__label" htmlFor="sample2">Description</label>
                        </div>
                        <p>Select type:</p>
                        <ul className="TypeOptions js-typeToggle">
                            <li className="TypeOptionItem" data-toggle="bug"><span onClick={this.toggleType} className="pokemontypes bug-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="dark"><span onClick={this.toggleType} className="pokemontypes dark-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="dragon"><span onClick={this.toggleType} className="pokemontypes dragon-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="electric"><span onClick={this.toggleType} className="pokemontypes electric-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="fairy"><span onClick={this.toggleType} className="pokemontypes fairy-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="fighting"><span onClick={this.toggleType} className="pokemontypes fighting-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="fire"><span onClick={this.toggleType} className="pokemontypes fire-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="flying"><span onClick={this.toggleType} className="pokemontypes flying-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="ghost"><span onClick={this.toggleType} className="pokemontypes ghost-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="grass"><span onClick={this.toggleType} className="pokemontypes grass-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="ground"><span onClick={this.toggleType} className="pokemontypes ground-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="ice"><span onClick={this.toggleType} className="pokemontypes ice-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="normal"><span onClick={this.toggleType} className="pokemontypes normal-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="poison"><span onClick={this.toggleType} className="pokemontypes poison-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="psychic"><span onClick={this.toggleType} className="pokemontypes psychic-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="rock"><span onClick={this.toggleType} className="pokemontypes rock-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="steel"><span onClick={this.toggleType} className="pokemontypes steel-type-img positionTypeOption">&nbsp;</span></li>
                            <li className="TypeOptionItem" data-toggle="water"><span onClick={this.toggleType} className="pokemontypes water-type-img positionTypeOption">&nbsp;</span></li>
                        </ul>
                        <div className="">
                            <p>Select region:</p>
                            <select ref="region" defaultValue="kanto">
                                <option value="kanto">Kanto</option>
                                <option value="johto">Johto</option>
                                <option value="hoenn">Hoenn</option>
                                <option value="sinnoh">Sinnoh</option>
                            </select>
                        </div>
                        <a href="#" className="shinyCheck" data-shiny="false" onClick={this.shinyToggle}>
                            Shiny
                        </a>
                        <input ref="is_shiny" type="hidden" id="shiny_field" className="is-hidden" value="false"/> 
                        <input ref="poke_type" type="hidden" id="poke-type" className="is-hidden"/>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                            <input className="mdl-textfield__input" placeholder="File" type="text" id="uploadFile" readOnly />
                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                                <i className="material-icons">attach_file</i><input type="file" id="uploadBtn" onChange={this.imageUploaded} />
                            </div>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" id="fileLoad">
                            Add
                        </button>
                        <input ref="image" type="hidden" id="imageLoad" className="is-hidden"/>
                    </form>
                </div>
            </div>
        );
    }
}