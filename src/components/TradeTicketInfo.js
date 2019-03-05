import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class TradeTicketInfo extends Component {
	constructor(props) {
        super(props)
    	this.deleteTradeItem = this.deleteTradeItem.bind(this);
        this.openPopup = this.openPopup.bind(this);
    }

    openPopup(e) {
        let $this = e.target,
            $fadeTarget = document.querySelector(".js-imagePopup"),
            $image = $fadeTarget.querySelector(".js-imagePopup-image");

        $image.src = this.props.attachment_image;
    
        let opacity = 0;
        $fadeTarget.style.display="block";
        var fadeInEffect = setInterval(function () {
            if (!$fadeTarget.style.opacity) {
                $fadeTarget.style.opacity = opacity;
            }
            if (opacity <= 1) {
                opacity = opacity + 0.1;
                $fadeTarget.style.opacity = opacity;
            } else {
                clearInterval(fadeInEffect);
            }
        }, 50);
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
            <div className="ticketInfo">
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
                <div className="ticketInfo-image">
                    {(() => {
                        if (this.props.attachment_image !== ''){
                            return (
                                <a className="ticketInfo-image-fullscreen" onClick={this.openPopup}>
                                    <i className="material-icons">
                                        fullscreen
                                    </i>
                                </a>
                            );
                        }
                    })()}
                
                    <div className="ticketImage" style={styles}></div>
                </div>
                <div className="mdl-card ticketInfo-info">
                    <div className="mdl-card__supporting-text">
                        <p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
    				    <p>{this.props.adInfo}</p>
                    </div>
                </div>
            </div>
        );
    }
}
