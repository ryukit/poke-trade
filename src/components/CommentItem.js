import React, {Component} from 'react'

export default class CommentItem extends Component {
	constructor(props) {
		super(props)
	}

	render() {
        return (
        	<div className="commentSection-list" key={this.props.id} id={this.props.id}>
        		<div><strong>{this.props.comment_user_name}</strong></div>
	        	<div>{this.props.comment_text}</div>
			</div>
        );
    }
}
