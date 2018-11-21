import React, {Component} from 'react'
import TradeList from "../components/TradeList"
import TradeTicket from '../components/TradeTicket'

export default class TradePage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            item: []
        }
        this.onNewComment = this.onNewComment.bind(this)
    }

    loadTradeData() {
    
        let requiredId;
        requiredId = this.props.itemId;
        var ref = new firebase.database().ref('trade_ticket/').orderByChild('id').equalTo(requiredId);
        ref.on('value', function(snapshot) {
            const itemEl = [];

            snapshot.forEach(function(itemSnap) {
                const itemValues = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                itemEl.push(itemValues);
            });

            this.setState({
                item: itemEl
            });

        }.bind(this));
    }

    componentDidMount() {
        this.loadTradeData();
    }

    onNewComment(newItem){
        let requiredId;
        requiredId = this.props.itemId;
        let rel_url = 'trade_ticket/'+requiredId+'/'
        var refComment = new firebase.database().ref('trade_ticket/'+requiredId+'/comment_list');
        refComment.child(newItem.id).set(newItem);
    }

	render() {
    
        return (
            <div className="wow">
                <TradeTicket item={this.state.item} onNewComment={this.onNewComment}/>
            </div>
        );
    }
}
