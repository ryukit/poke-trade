import React, {Component} from 'react'

export default class ShowAddButton extends Component {
	constructor(props) {
		super(props)

	}

    componentDidMount() {
        let button = document.getElementById('mdl-tooltip');
        componentHandler.upgradeElement(button);
    }


	render() {
        var classString, buttonText;

        if(this.props.displayed) {
            classString = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored addItem';
            buttonText = 'clear';
        } else {
            classString = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored addItem success';
            buttonText = 'add';
        }

        return (
            <div id="button-show-more">
                <button id="add-button" className={classString} onClick={this.props.onToggleForm} title={this.props.buttonText}>
                    <i className="material-icons">{buttonText}</i>
                </button>
                <div className="mdl-tooltip" id="mdl-tooltip" data-mdl-for="add-button">{this.props.buttonText}</div>
            </div>
        );
    }
}