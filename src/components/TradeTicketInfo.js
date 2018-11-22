import React, {Component} from 'react'

export default class TradeTicketInfo extends Component {
	constructor(props) {
        super(props)
    	
    }

    

    componentDidMount() {
        
    }

	render() {
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
        let commentListArray = this.props.comment_list;
      
        return (
            <div className="wow">
                <p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
				<p>{this.props.adInfo}</p>
            </div>
        );
    }
}
