import React, {Component} from 'react'

export default class LogoutUser extends Component {
	constructor(props) {
		super(props);
        this.handleForm = this.handleForm.bind(this);
	}

    handleForm(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
     	localStorage.removeItem('userRole');
		this.setState({
            userName: undefined,
            userRole: undefined
        });
        this.props.updateGlobalState(undefined, undefined);
    }

    render() {
        

        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__supporting-text">
                    <form ref="logOut" action="#" onSubmit={this.handleForm}>
                    	<p>You are already logged</p>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                            Log Out
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}