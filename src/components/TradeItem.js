import React, {Component} from 'react'

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
        return (
        	<div className="tradeList-item">
	            <div className="demo-card-square mdl-card mdl-shadow--2dp" key={this.props.id} id={this.props.id}>
					<div className="mdl-card__title mdl-card--expand" style={styles}>
						
					</div>
					<div className="mdl-card__supporting-text">
						<p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
						{/* <p>{this.props.adInfo}</p> */}
					</div>
					<div className="mdl-card__actions mdl-card--border">
						<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
						View Deal
						</a>
					</div>
				</div>
			</div>
        );
    }
}
