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
        this.closePopup = this.closePopup.bind(this);
    }

    closePopup(e) {
        let $this = e.target,
            $fadeTarget = document.querySelector(".js-imagePopup"),
            $image = $fadeTarget.querySelector(".js-imagePopup-image");
    
        let opacity = 1;
        var fadeOutEffect = setInterval(function () {
            if (!$fadeTarget.style.opacity) {
                $fadeTarget.style.opacity = opacity;
            }
            if (opacity > 0) {
                opacity = opacity - 0.1;
                $fadeTarget.style.opacity = opacity;
            } else {
                clearInterval(fadeOutEffect);
                $fadeTarget.style.display="none";
                $image.src = '';
            }
        }, 50);
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
                        <section className="sectionItemList small-container">
                            <div className="tradeCardItem">
                                <div className="tradeCardItem-left">
                                    <TradeTicket item={this.state.item} userName={this.props.userName} userRole={this.props.userRole}/>
                                </div>                     
                                <div className="tradeCardItem-right">        
                                    <CommentList comments={this.state.comments} onNewComment={this.onNewComment} userName={this.props.userName} userRole={this.props.userRole}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <div className="attachmentPopup js-imagePopup">
                    <a href="#" onClick={this.closePopup}><i className="material-icons">add</i></a>
                    <div className="attachmentPopup-inner">
                        <img src="noimage" className="js-imagePopup-image" />
                    </div>
                </div>
            </div>
        );
    }
}
