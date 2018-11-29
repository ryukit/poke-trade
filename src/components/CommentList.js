import React, {Component} from 'react'
import CommentItem from '../components/CommentItem'

export default class CommentList extends Component {
	constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this)
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
    
        return (
            <div className="small-container mdl-shadow--2dp commentSection">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__supporting-text commentSection-form">
                        <form ref="addNewCommentForm" action="#" onSubmit={this.handleForm}>
                            <h4>Leave a comment</h4>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input ref="comment_user_name" type="text" className="mdl-textfield__input" id="sample1" />
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
            </div>
        );
    }
}
