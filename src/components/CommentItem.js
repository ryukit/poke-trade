import React, {Component} from 'react'

export default class CommentItem extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let timestamp = this.props.timeStamp;
		var a = new Date(timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

        return (
        	<div className="commentSection-list" key={this.props.id} id={this.props.id}>
        		<div><strong>{this.props.comment_user_name}</strong></div>
	        	<div>{this.props.comment_text}</div>
	        	<div>{time}</div>
			</div>
        );
    }
}
