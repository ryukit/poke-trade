import React, {Component} from 'react'
import CommentItem from '../components/CommentItem'
import CommentForm from '../components/commentForm'

export default class CommentList extends Component {
	constructor(props) {
        super(props)
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
            <div className="small-container mdl-shadow--2dp commentSection">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    {commentForm}
                    
                    <div className="commentSection-list">
                        <div className="mdl-card__supporting-text">
                            {commentItem}
                        </div>
                    </div>
                </div>
                <div className="attachmentPopup js-imagePopup">
                    <a href="#" onClick={this.closePopup}>close attachment</a>
                    <div className="attachmentPopup-inner">
                        <img src="noimage" className="js-imagePopup-image" />
                    </div>
                </div>
            </div>
        );
    }
}
