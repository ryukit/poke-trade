import React, {Component} from 'react'

export default class AddNewUserForm extends Component {
	constructor(props) {
		super(props);
        this.handleForm = this.handleForm.bind(this);
	}

    handleForm(e) {
        e.preventDefault();
        // var imageData = this.refs.image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);
        // let typeValue = this.refs.poke_type.value;
        // let newTypeValue = typeValue.slice(0, -1);
        // let seletRegion = this.refs.region;
        // let seletRegionValue = seletRegion.options[seletRegion.selectedIndex].value;

        var newItem = {
            name: this.refs.userName.value,
            password: this.refs.userPass.value,
            role: 'user',
            id: uid
        };
        debugger;

        var ref = new firebase.database().ref('user_list/');
        ref.child(newItem.id).set(newItem);
        debugger;
        // this.refs.feedForm.reset();
        // this.props.onNewItem(newItem);
    }

    render() {
        

        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__supporting-text">
                    <p>Add new user form</p>
                    <form ref="addNewUserForm" action="#" onSubmit={this.handleForm}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="userName" type="text" className="mdl-textfield__input" id="userName" />
                            <label className="mdl-textfield__label" htmlFor="userName">userName...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="userPass" type="text" className="mdl-textfield__input" id="userPass" />
                            <label className="mdl-textfield__label" htmlFor="userPass">user password</label>
                        </div> 
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}