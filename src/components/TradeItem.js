import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class TradeItem extends Component {
	constructor(props) {
		super(props)
	}

	render() {
        var styles = {
            'background': 'url(' + this.props.attachment_image + ') top center no-repeat #46B6AC'
        };
        let spShinyVal = this.props.sp_trade_shiny;
        let spShinyText = '';
        if ( typeof spShinyVal !== 'undefined' && spShinyVal == 'true') {
        	spShinyText = '(*shihy*)'
        }
        let recShinyVal = this.props.rec_trade_shiny;
        let recShinyText = '';
        if ( typeof recShinyVal !== 'undefined' && recShinyVal == 'true') {
        	recShinyText = '(*shihy*)'
        }
        let timestamp = this.props.time_stamp;
		var a = new Date(timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return (
        	<div className="tradeList-item">
	            <div className="demo-card-square mdl-card mdl-shadow--2dp" key={this.props.id} id={this.props.id}>
					<div className="mdl-card__title mdl-card--expand" style={styles}>
						
					</div>
					<div className="mdl-card__supporting-text">
						<p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
						{/* <p>{this.props.adInfo}</p> */}
						<p>{time}</p>
					</div>
					<div className="mdl-card__actions mdl-card--border">
						<Link 
							className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
							to={'/trades/' + this.props.id}>
							View Deal
						</Link>
					</div>
				</div>
			</div>
        );
    }
}
