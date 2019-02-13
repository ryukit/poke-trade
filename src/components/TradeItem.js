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
        	spShinyText = ( <i className="shinyLabel"></i> );
        }
        let recShinyVal = this.props.rec_trade_shiny;
        let recShinyText = '';
        if ( typeof recShinyVal !== 'undefined' && recShinyVal == 'true') {
        	recShinyText = ( <i className="shinyLabel"></i> );
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
	            <Link 
					className="" 
					to={'/trades/' + this.props.id}>
	            	<div className="tradeList-item-inner mdl-shadow--2dp" key={this.props.id} id={this.props.id} style={styles}>
						<div className="tradeList-item-topInfo">
							<div>
								<h3 className="croppedText">{this.props.user_name}</h3>
								<p className="croppedText">&#8595; {spShinyText}{this.props.sp_pokemon}</p>
								<p className="croppedText">&#8593; {recShinyText}{this.props.rec_pokemon}</p>
							</div>
						</div>
						{/* <p>{this.props.adInfo}</p> */}
						<div className="tradeList-item-bottomInfo">
							<p className="croppedText">{time} // Comments: {this.props.commentValue}</p>
						</div>
					</div>
				</Link>
			</div>
        );
    }
}
