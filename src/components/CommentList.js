import React, {Component} from 'react'
import CommentItem from '../components/CommentItem'

export default class CommentList extends Component {
	constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    commentImageUploaded() {
        var preview = document.getElementById('commentImageLoad');
        var status = document.getElementById('comment_image_field_status');
        var file    = document.getElementById('comment_image_field').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
            status.value = file.name+' - uploaded';
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
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

    handleForm(e) {
        e.preventDefault();
        var imageData = this.refs.comment_image.value;
        var uid = '_' + Math.random().toString(36).substr(2, 9);
        let date = new Date();


        var newItem = {
            comment_user_name: this.refs.comment_user_name.value,
            comment_text: this.refs.comment_textarea.value,
            id: uid,
            key: uid,
            image: imageData,
            timeStamp: date.getTime()
        };

        this.refs.addNewCommentForm.reset();
        this.props.onNewComment(newItem);
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

        let userFieldData;
        let userFieldEditable;
        let user = this.props.userName;
        if (user !== undefined){
            userFieldData = user;
            userFieldEditable = "disabled";
        }else {
            userFieldData = "";
            userFieldEditable = "false";
        }
    
        return (
            <div className="small-container mdl-shadow--2dp commentSection">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__supporting-text commentSection-form">
                        <form ref="addNewCommentForm" action="#" onSubmit={this.handleForm}>
                            <h4>Leave a comment</h4>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input ref="comment_user_name" type="text" className="mdl-textfield__input" id="sample1" disabled={userFieldEditable} value={userFieldData} />
                                <label className="mdl-textfield__label" htmlFor="sample1">Enter your game nickname</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield">
                                <textarea ref="comment_textarea" className="mdl-textfield__input" type="text" rows= "3" id="comment_textarea"></textarea>
                                <label className="mdl-textfield__label" htmlFor="comment_textarea">Enter your message</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                                <input className="mdl-textfield__input" placeholder="File" type="text" id="comment_image_field_status" readOnly />
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
