import React, {Component} from 'react'
import TradeList from "../components/TradeList"
import TradeTicket from '../components/TradeTicket'
import CommentList from '../components/CommentList'

export default class TradePage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            item: [],
            comments: [],
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

    loadCommentData() {
    
        let requiredId;
        requiredId = this.props.itemId;
        var ref = new firebase.database().ref('trade_ticket/'+requiredId+'/comment_list');
        ref.on('value', function(snapshot) {
            const itemEl = [];
            let sorted = [];

            snapshot.forEach(function(itemSnap) {
                const itemValues = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                itemEl.push(itemValues);
            });

            sorted = _.sortBy(itemEl, function(item) {
                return item.timeStamp;
            });

            this.setState({
                comments: sorted
            });

        }.bind(this));
    }

    componentDidMount() {
        this.loadTradeData();
        this.loadCommentData();
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
            <div>
                <main className="mdl-layout__content">            
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <TradeTicket item={this.state.item} />
                                    <CommentList comments={this.state.comments} onNewComment={this.onNewComment} userName={this.props.userName}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
