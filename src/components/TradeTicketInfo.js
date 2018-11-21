import React, {Component} from 'react'
import CommentItem from '../components/CommentItem'

export default class TradeTicketInfo extends Component {
	constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    	this.handleForm = this.handleForm.bind(this)
    }

    loadCommentData() {
    
        let requiredId;
        requiredId = this.props.id;
        var ref = new firebase.database().ref('trade_ticket/'+requiredId+'/comment_list');
        ref.on('value', function(snapshot) {
            const itemEl = [];

            snapshot.forEach(function(itemSnap) {
                const itemValues = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                itemEl.push(itemValues);
            });

            this.setState({
                comments: itemEl
            });

        }.bind(this));
    }

    componentDidMount() {
        this.loadCommentData();
    }

    commentImageUploaded() {
        var preview = document.getElementById('commentImageLoad');
        var file    = document.getElementById('comment_image_field').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    handleForm(e) {
        e.preventDefault();
        var imageData = this.refs.comment_image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);

        var newItem = {
        	comment_user_name: this.refs.comment_user_name.value,
            comment_text: this.refs.comment_textarea.value,
            id: uid,
            key: uid,
            image: imageData
        };

        this.refs.addNewCommentForm.reset();
        this.props.onNewComment(newItem);
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
        
    	const commentItem = this.state.comments.map(function (item) {
            return <CommentItem
                id={item.id}
                key={item.key}
                comment_text={item.comment_text}
                image={item.image}
                comment_user_name={item.comment_user_name}
            />
        });
   
      
        return (
            <div className="wow">
                <p>User - <strong>{this.props.user_name}</strong> trades "{this.props.sp_pokemon}{spShinyText}" for "{this.props.rec_pokemon}{recShinyText}"</p>
				<p>{this.props.adInfo}</p>
				<div className="commentSection">
					<div className="commentSection-form">
						<form ref="addNewCommentForm" action="#" onSubmit={this.handleForm}>
							<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
	                            <input ref="comment_user_name" type="text" className="mdl-textfield__input" id="sample1" />
	                            <label className="mdl-textfield__label" htmlFor="sample1">Enter your game nickname</label>
	                        </div>
	                        <div className="mdl-textfield mdl-js-textfield">
	                            <textarea ref="comment_textarea" className="mdl-textfield__input" type="text" rows= "3" id="comment_textarea"></textarea>
	                            <label className="mdl-textfield__label" htmlFor="comment_textarea">name...</label>
	                        </div>
	                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
	                            <input className="mdl-textfield__input" placeholder="File" type="text" id="uploadFile" readOnly />
	                            <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
	                                <i className="material-icons">attach_file</i><input type="file" id="comment_image_field" onChange={this.commentImageUploaded} />
	                            </div>
	                        </div>
	                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" id="fileLoad">
	                            Add Comment
	                        </button>
	                        <input ref="comment_image" type="hidden" id="commentImageLoad" className="is-hidden"/>
	                    </form>
					</div>
					<div className="commentSection-list">
						{commentItem}
					</div>
				</div>
            </div>
        );
    }
}
