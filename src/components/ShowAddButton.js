import React, {Component} from 'react'

export default class ShowAddButton extends Component {
	constructor(props) {
		super(props)

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
            <button className={classString} onClick={this.props.onToggleForm}>
                <i className="material-icons">{buttonText}</i>
            </button>
        );
    }
}