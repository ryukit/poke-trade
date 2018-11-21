import React from 'react';
import { Route, Switch } from 'react-router-dom'
import TradePage from '../layouts/TradePage'
import TradeInnerPage from '../layouts/TradeInnerPage'

const Index = () => <h2>Home</h2>;

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Index} />
            {/*<Route exact path='/' component={HomePage} />*/}
            <Route path='/trades/:itemId' render={ ({ match }) => <TradeInnerPage { ...match.params }/> } />
            <Route path="/trades"
                   render={() => <TradePage /> } />
            <Route render={function () {
                return <p className="notFound">404</p>
            }} />
        </Switch>
    );
}

export default Routes;