import React, {Component} from 'react'
import TradeItem from "../components/TradeItem"

export default class TradeList extends Component {
	constructor(props) {
		super(props)

	}

	render() {
       
       var tradeItems = this.props.tradeList.map(function(item) {
            return <TradeItem
                id={item.id}
                key={item.id}
                user_name={item.user_name}
                sp_pokemon={item.sp_pokemon}
                rec_pokemon={item.rec_pokemon}
                adInfo={item.additional_info}
                attachment_image={item.attachment_image}
                sp_trade_shiny={item.sp_trade_shiny}
                rec_trade_shiny={item.rec_trade_shiny}
                time_stamp={item.time_stamp}
                commentValue={_.size(item.comment_list)}
            />
        }.bind(this));

        return (
            <div className="small-container">
                <div className="mdl-spinner mdl-js-spinner is-active itemList-spinner"></div>
                <div className="tradeList">
                    {tradeItems}
                </div>
            </div>
        );
    }
}
