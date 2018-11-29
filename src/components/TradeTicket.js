import React, {Component} from 'react'
import TradeTicketInfo from '../components/TradeTicketInfo'

export default class TradeTicket extends Component {
	constructor(props) {
        super(props)

    }

	render() {
        let onNewComment = this.props.onNewComment;
        const tradeTicketInfo = this.props.item.map(function (item) {
            return <TradeTicketInfo
                id={item.id}
                key={item.id}
                user_name={item.user_name}
                sp_pokemon={item.sp_pokemon}
                rec_pokemon={item.rec_pokemon}
                adInfo={item.additional_info}
                attachment_image={item.attachment_image}
                sp_trade_shiny={item.sp_trade_shiny}
                rec_trade_shiny={item.rec_trade_shiny}
                onNewComment={onNewComment}
            />
        });
    
        return (
            <div className="small-container mdl-shadow--2dp">
                {tradeTicketInfo} 
            </div>
        );
    }
}
