import React, {Component} from 'react'
import CommentItem from '../components/CommentItem'
import CommentForm from '../components/commentForm'

export default class CommentList extends Component {
	constructor(props) {
        super(props)
    }

	render() {
        // let onNewComment = this.props.onNewComment;
        const commentItem = this.props.comments.map(function (item) {
            return <CommentItem
                id={item.id}
                key={item.key}
                comment_text={item.comment_text}
                image={item.image}
                comment_user_name={item.comment_user_name}
                timeStamp={item.timeStamp}
            />
        });

        let commentForm;
        let role = this.props.userRole;
        if (role == 'user' || role == 'admin') {
          commentForm = <CommentForm onNewComment={this.props.onNewComment} userName={this.props.userName}  userRole={this.props.userRole}/>
        } else {
          commentForm = '';
        }
    
        return (
            <div className="mdl-shadow--2dp commentSection">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    {commentForm}
                    
                    <div className="commentSection-list">
                        <div className="mdl-card__supporting-text">
                            {commentItem}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
