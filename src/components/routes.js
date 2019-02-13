import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import TradePage from '../layouts/TradePage'
import UserTradesPage from '../layouts/UserTradesPage'
import TradeInnerPage from '../layouts/TradeInnerPage'
import PokedexPage from '../layouts/PokedexPage'
import HomePage from '../layouts/HomePage'
import PokedexRegionPage from '../layouts/PokedexRegionPage'

//const Routes = () => {
export default class Routes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: localStorage.getItem('userName'),
            userRole: localStorage.getItem('userRole'),
            userId: localStorage.getItem('userId')
        }
        this.updateGlobalState = this.updateGlobalState.bind(this);
    }
    updateGlobalState(userName, userRole, userId) {
        this.setState({
            userName: userName,
            userRole: userRole,
            userId: userId
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <HomePage userRole={this.state.userRole} userName={this.state.userName} updateGlobalState={this.updateGlobalState} /> } />
                {/*<Route exact path='/' component={HomePage} />*/}
                <Route path='/trades/:itemId' render={ ({ match }) => <TradeInnerPage { ...match.params } userName={this.state.userName} userRole={this.state.userRole} /> } />
                <Route path="/trades" render={() => <TradePage userName={this.state.userName} userRole={this.state.userRole} userId={this.state.userId}/> } />
                <Route path="/my-trades" render={() => <UserTradesPage userName={this.state.userName} userRole={this.state.userRole} userId={this.state.userId}/> } />
                <Route path="/pokedex" render={() => <PokedexPage /> } />
                <Route path='/region/:regionName' render={ ({ match }) => <PokedexRegionPage { ...match.params } userId={this.state.userId} userName={this.state.userName} userRole={this.state.userRole} /> } />
                <Route render={function () { return <p className="notFound">404</p> }} />
            </Switch>
        )
    }
}

//export default Routes;