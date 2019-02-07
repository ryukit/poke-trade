import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import TradePage from '../layouts/TradePage'
import TradeInnerPage from '../layouts/TradeInnerPage'
import PokedexPage from '../layouts/PokedexPage'
import HomePage from '../layouts/HomePage'

//const Routes = () => {
export default class Routes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: localStorage.getItem('userName'),
            userRole: localStorage.getItem('userRole')
        }
        this.updateGlobalState = this.updateGlobalState.bind(this);
    }
    updateGlobalState(userName, userRole) {
        this.setState({
            userName: userName,
            userRole: userRole
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <HomePage userRole={this.state.userRole} userName={this.state.userName} updateGlobalState={this.updateGlobalState} /> } />
                {/*<Route exact path='/' component={HomePage} />*/}
                <Route path='/trades/:itemId' render={ ({ match }) => <TradeInnerPage { ...match.params } userName={this.state.userName} userRole={this.state.userRole} /> } />
                <Route path="/trades" render={() => <TradePage userName={this.state.userName} userRole={this.state.userRole} /> } />
                <Route path="/pokedex" render={() => <PokedexPage /> } />
                <Route render={function () { return <p className="notFound">404</p> }} />
            </Switch>
        )
    }
}

//export default Routes;