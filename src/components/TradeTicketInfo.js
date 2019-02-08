import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class TradeTicketInfo extends Component {
	constructor(props) {
        super(props)
    	this.deleteTradeItem = this.deleteTradeItem.bind(this)
    }

    componentDidMount() {
        
    }

    deleteTradeItem(){
        let requiredId;
        requiredId = this.props.id;
        var ref = new firebase.database().ref('trade_ticket/');
        ref.child(requiredId).remove();
    }

	render() {
        var styles = {
            'background': 'url(' + this.props.attachment_image + ') top center no-repeat #46B6AC'
        };
		let spShinyVal = this.props.sp_trade_shiny;
        let spShinyText = '';
        if ( typeof spShinyVal !== 'undefined' && spShinyVal == 'true') {
        	spShinyText = ( <i className="shinyLabel"></i> );
        }
        let recShinyVal = this.props.rec_trade_shiny;
        let recShinyText = '';
        if ( typeof recShinyVal !== 'undefined' && recShinyVal == 'true') {
        	recShinyText = ( <i className="shinyLabel"></i> );
        }
        let commentListArray = this.props.comment_list;
        
        let user = this.props.userName;
        let role = this.props.userRole;

        return (
            <div className="mdl-grid mdl-grid--no-spacing ticketInfo">
                {(() => {
                    if (role == "admin" || user == this.props.user_name ){
                        return (
                            <NavLink to="/trades" 
                                     onClick={this.deleteTradeItem} 
                                     className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored addItem success removeBtn">
                                    <i className="material-icons">add</i>
                            </NavLink>
                        );
                    } else {
                        return (
                            ""
                        );
                    }
                })()}
                <header className="ticketImage mdl-cell mdl-cell--4-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone"  style={styles}>
                    
                </header>
                <div className="mdl-card mdl-cell mdl-cell--8-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <div className="mdl-card__supporting-text">
                        <h4>Title</h4>
                        <p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
    				    <p>{this.props.adInfo}</p>
                    </div>
                </div>
            </div>
        );
    }
}
