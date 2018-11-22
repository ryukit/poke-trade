import React from 'react';
import { Route, Switch } from 'react-router-dom'
import TradePage from '../layouts/TradePage'
import TradeInnerPage from '../layouts/TradeInnerPage'
import PokedexPage from '../layouts/PokedexPage'
import HomePage from '../layouts/HomePage'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact render={() => <HomePage /> } />
            {/*<Route exact path='/' component={HomePage} />*/}
            <Route path='/trades/:itemId' render={ ({ match }) => <TradeInnerPage { ...match.params }/> } />
            <Route path="/trades" render={() => <TradePage /> } />
            <Route path="/pokedex" render={() => <PokedexPage /> } />
            <Route render={function () { return <p className="notFound">404</p> }} />
        </Switch>
    );
}

export default Routes;