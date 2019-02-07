import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import AddNewUserForm from '../components/AddNewUserForm'
import LoginUser from '../components/LoginUser'
import LogoutUser from '../components/LogoutUser'

export default class HomePage extends Component {
	constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

	render() {
        let user = this.props.userName;
        let role = this.props.userRole;
        let authForm;
        let addNewUser;
        if (user == undefined){
            authForm = <LoginUser updateGlobalState={this.props.updateGlobalState}/>
        } else {
            authForm = <LogoutUser updateGlobalState={this.props.updateGlobalState}/>
        }
        if (role !== undefined & role !== null){
            if (role == "admin"){
                addNewUser = <AddNewUserForm />
            } else {
                addNewUser = '';
            }
        }
        return (
            <div>
                <main className="mdl-layout__content">            
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    {/* <ul className="">
                                        <li><NavLink to='/trades'>Trades</NavLink></li>
                                        <li><NavLink to='/pokedex'>Pokedex</NavLink></li>
                                    </ul> */}
                                
                                    <div>
                                        {(() => {
                                            if (role == "admin" || role == "user"){
                                                return (
                                                    <h1 className="homePage-title" data-role={role}>Hello {user}</h1>
                                                );
                                            } else {
                                                return (
                                                    <h1 className="homePage-title" data-role="guest">Hello guest, please login or contact Admin</h1>
                                                );
                                            }
                                        })()}
                                    </div>
                                    <div className="homePage-functional">
                                        {authForm}
                                        {addNewUser}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
