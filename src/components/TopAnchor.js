import React, {Component} from 'react'

export default class TopAnchor extends Component {
	constructor(props) {
		super(props);
        this.goTop = this.goTop.bind(this);
	}

    goTop(e) {
        e.preventDefault();

        var scrollStep = -window.scrollY / (500 / 15),
        scrollInterval = setInterval(function(){
            if ( window.scrollY != 0 ) {
                window.scrollBy( 0, scrollStep );
            }
            else clearInterval(scrollInterval); 
        },15);

    }

    render() {
        

        return (
            <a href="#" className="anchorLink" onClick={this.goTop}>&nbsp;</a>
        );
    }
}