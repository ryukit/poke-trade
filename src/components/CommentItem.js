import React, {Component} from 'react'

export default class CommentItem extends Component {
	constructor(props) {
		super(props);
		this.openPopup = this.openPopup.bind(this);
	}


	openPopup(e) {
		let $this = e.target,
			$fadeTarget = document.querySelector(".js-imagePopup"),
			$image = $fadeTarget.querySelector(".js-imagePopup-image");

		$image.src = this.props.image;
	
		let opacity = 0;
		$fadeTarget.style.display="block";
		var fadeInEffect = setInterval(function () {
	        if (!$fadeTarget.style.opacity) {
	            $fadeTarget.style.opacity = opacity;
	        }
	        if (opacity <= 1) {
	        	opacity = opacity + 0.1;
	            $fadeTarget.style.opacity = opacity;
	        } else {
	            clearInterval(fadeInEffect);
	        }
	    }, 50);
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
        	<div className="commentSection-list-item js-triggerParent" key={this.props.id} id={this.props.id}>
        		<div><strong>{this.props.comment_user_name}</strong></div>
	        	<div>{this.props.comment_text}</div>
	        	<div>{time}</div>
	        	<div>
	        		<a href="#" onClick={this.openPopup}>open attachment</a>
        		</div>
			</div>
        );
    }
}
