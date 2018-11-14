import React, {Component} from 'react'

export default class PokemonAddForm extends Component {
	constructor(props) {
		super(props)
        this.imageUploaded = this.imageUploaded.bind(this)
        this.handleForm = this.handleForm.bind(this)
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

    handleForm(e) {
        e.preventDefault();
        var imageData = this.refs.image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);
        var newItem = {
            name: this.refs.name.value,
            dex_number: this.refs.dex_number.value,
            id: uid,
            description: this.refs.desc.value,
            image: imageData
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
            <div className="mdl-card mdl-shadow--2dp addPokemonForm" style={styles}>
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