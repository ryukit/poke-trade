import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class HomePage extends Component {
	constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

	render() {
    
        return (
            <div>
                <main className="mdl-layout__content">            
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <ul className="">
                                        <li><NavLink to='/trades'>Trades</NavLink></li>
                                        <li><NavLink to='/pokedex'>Pokedex</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
