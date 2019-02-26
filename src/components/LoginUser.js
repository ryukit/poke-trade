import React, {Component} from 'react'

export default class LoginUser extends Component {
	constructor(props) {
		super(props);
        this.handleForm = this.handleForm.bind(this);
	}

    handleForm(e) {
        e.preventDefault();

        var loginInfo = {
            loginPass: this.refs.loginPass.value,
            loginId: this.refs.loginId.value
        };

        var ref = new firebase.database().ref('user_list/').orderByChild('id').equalTo(loginInfo.loginId);
        ref.on('value', function(snapshot) {
            const userInfo = [];

            snapshot.forEach(function(itemSnap) {
                const itemValues = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                userInfo.push(itemValues);
            });
            if (!userInfo.length){
				alert('wrong credentials');
				return;
            }
            if (userInfo[0].password == loginInfo.loginPass){
	         	localStorage.setItem('userName', userInfo[0].name);
	         	localStorage.setItem('userRole', userInfo[0].role);
                localStorage.setItem('userId', userInfo[0].id);
        		this.setState({
	                userName: userInfo[0].name,
	                userRole: userInfo[0].role,
                    userId: userInfo[0].id
	            });
	            this.props.updateGlobalState(userInfo[0].name, userInfo[0].role, userInfo[0].id);
            }else {
            	alert('wrong credentials');
            }
            // this.setState({
            //     userInfo: userInfo
            // });
            location.reload();

        }.bind(this));
    }

    render() {
        

        return (
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__supporting-text">
                    <form ref="addNewUserForm" action="#" onSubmit={this.handleForm}>
                    	<h4>Login form</h4>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="loginId" type="text" className="mdl-textfield__input" id="loginId" />
                            <label className="mdl-textfield__label" htmlFor="loginId">userId...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input ref="loginPass" type="text" className="mdl-textfield__input" id="loginPass" />
                            <label className="mdl-textfield__label" htmlFor="loginPass">user password</label>
                        </div> 
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}