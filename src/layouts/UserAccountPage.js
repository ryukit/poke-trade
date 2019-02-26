import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserAccountPage extends Component {
	constructor(props) {
        super(props)

        this.state = {
            items: [],
            shiny_items: [],
            lucky_items: [],
            personal_image_data: 'http://placehold.it/300x300'
        }  
        this.callImageRefresh = this.callImageRefresh.bind(this);
    }

    loadUserShinyData(){
        let loggedUser = this.props.userId;
        if (loggedUser !== undefined && loggedUser !== null) {
            var ref = new firebase.database().ref('user_list/'+loggedUser+"/shiny_list").orderByChild("dex");
            //debugger;
            ref.on('value', function(snapshot) {
                //debugger;
                const shiny_items = [];
                var sorted = [];

                snapshot.forEach(function(itemSnap) {
                    const item1 = itemSnap.val();
                    //item.key = itemSnap.getKey();
                    //item.id = itemSnap.getKey();
                    shiny_items.push(item1);
                });
                //debugger;
                // sorted = _.sortBy(shiny_items, function(item) {
                //     return item.dex;
                // });
                let shinyCount = 0;
                for(let i=0; i<shiny_items.length; i++){
                    if (shiny_items[i].isShiny == true){
                        shinyCount++
                    }
                }

                this.setState({
                    shiny_items: shiny_items,
                    shiny_items_value: shinyCount
                });

            }.bind(this));
        }
    }

    loadUserLuckyData(){
        let loggedUser = this.props.userId;
        if (loggedUser !== undefined && loggedUser !== null) {
            var ref = new firebase.database().ref('user_list/'+loggedUser+"/lucky_list");
            //debugger;
            ref.on('value', function(snapshot) {
                //debugger;
                const lucky_items = [];
                var sorted = [];

                snapshot.forEach(function(itemSnap) {
                    const item2 = itemSnap.val();
                    //item.key = itemSnap.getKey();
                    //item.id = itemSnap.getKey();
                    lucky_items.push(item2);
                });
                //debugger;
                // sorted = _.sortBy(shiny_items, function(item) {
                //     return item.dex;
                // });
                let luckyCount = 0;
                for(let i=0; i<lucky_items.length; i++){
                    if (lucky_items[i].isLucky == true){
                        luckyCount++
                    }
                }

                this.setState({
                    lucky_items: lucky_items,
                    lucky_items_value: luckyCount
                });

            }.bind(this));
        }
    }

    imageUploaded($this) {
        var preview = document.getElementById('imageLoadForPersonal');
        var file    = document.getElementById('personal_attachment_input').files[0];
        var status  = document.getElementById('personal_attachment_status');
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.value = reader.result;
            //status.value = file.name+' - uploaded';
            var imageForPersonal = document.getElementById('imageForPersonal');
            imageForPersonal.src = preview.value;
            var personal_image = document.getElementById('personal_image');
            personal_image.classList.add('canSave')
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

    }

    callImageRefresh(e) {
        e.preventDefault();
        var preview = document.getElementById('imageLoadForPersonal');
        var image = preview.value;
        let loggedUser = this.props.userId;
        var ref = new firebase.database().ref('user_list/'+loggedUser);
        ref.child('personal_image').set(image);
        var personal_image = document.getElementById('personal_image');
        personal_image.classList.remove('canSave')
    }

    toggleDropDown(e) {
        var target = e.target,
            parentEl = target.parentNode,
            bodyEl = parentEl.querySelector('[data-body]');

        parentEl.classList.toggle('is-opened');
        if (bodyEl.classList.contains('js-input')){
            bodyEl.focus();
        }
    }

    levelInput(e){
        var target = e.target,
            value = target.value;

        target.value = value.replace(/\D/g,'').substring(0, 2);
    }

    levelFields(e){
        var target = e.target,
            value = target.value,
            loggedUser = e.target.dataset.userid;
            //debugger;
        var ref = new firebase.database().ref('user_list/'+loggedUser);
        ref.child('user_lvl').set(value);
    }

    componentDidMount() {
        let $this = this;
        this.loadUserShinyData();
        this.loadUserLuckyData();
        let loggedUser = this.props.userId;
        var ref = new firebase.database().ref('user_list/').orderByChild('id').equalTo(loggedUser);
        ref.on('value', function(snapshot) {
            //debugger;
            const personal_data = [];

            snapshot.forEach(function(itemSnap) {
                const item = itemSnap.val();
                //item.key = itemSnap.getKey();
                //item.id = itemSnap.getKey();
                personal_data.push(item);
            });
            // const lucky_list = [];
            // console.log(personal_data[0].lucky_list)
            // personal_data[0].lucky_list.forEach(function(itemSnap) {
            //     const item = itemSnap.val();
            //     //item.key = itemSnap.getKey();
            //     //item.id = itemSnap.getKey();
            //     lucky_list.push(item);
            // });

            // let luckyCount = 0;
            // for(let i=0; i<lucky_list.length; i++){
            //     if (lucky_list[i].isLucky == true){
            //         luckyCount++
            //     }
            // }
            if( personal_data[0].personal_image != undefined && personal_data[0].personal_image != "" ){

                this.setState({
                    //lucky_items: lucky_list,
                    user_lvl: personal_data[0].user_lvl,
                    personal_image_data: personal_data[0].personal_image
                });
            }

        }.bind(this));
    }

	render() {
        let loggedUser = this.props.userId;
        let luckyCount;
        let shinyCount;
        let userShinyData = this.state.shiny_items;
        if (this.state.lucky_items_value !== undefined && this.state.shiny_items_value !== undefined){
            luckyCount = this.state.lucky_items_value;
            shinyCount = this.state.shiny_items_value;
        }
        if (this.state.shiny_items !== undefined || this.state.shiny_items !== null) {
            var shinyList = this.state.shiny_items.map(function (item) {
                //debugger;
                let val = item.dex;
                while ((val+"").length < 3)
                   val = "0" + val;
                let name = item.name || '';
                let formatedName = name.replace(/[^0-9a-z]/gi, '');
                let imgSrc = '/src/thumbnails/'+val+formatedName+'.png';
                if (item.isShiny){
                    return (
                        <div className="userShinyList-item" key={val+formatedName}>
                            <img src={imgSrc} alt="" />
                            {item.dex}
                        </div>
                    )
                }
            })
        }
        let actualLvl = this.state.user_lvl || '0';

        return (
            <div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <section className="sectionItemList">
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col">
                                    <div className="small-container personalPage">
                                        <div className="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone personalPage-card">
                                            <div className="personalPage-left">
                                                <div className="personalPage-image">
                                                    <div className="personalPage-image-level">
                                                        <span onClick={this.toggleDropDown}>{actualLvl}</span>
                                                        <input type="text" className="js-input" data-body data-userid={loggedUser} onChange={this.levelInput} onBlur={this.levelFields}/>
                                                    </div>
                                                    <div className="personalPage-image-imageWrapp">
                                                        <img src={this.state.personal_image_data} alt="image" id="imageForPersonal" />
                                                    </div>
                                                    <div className="personalPage-image-fileLoad" id="personal_image">
                                                        <label htmlFor="personal_attachment_input" className="personalPage-image-fileLoad-label">
                                                            U
                                                        </label>
                                                        <input type="file" id="personal_attachment_input" onChange={this.imageUploaded} />
                                                        <input ref="image" type="hidden" id="imageLoadForPersonal" className="is-hidden"/>
                                                        <a href="#" className="personalPage-image-fileLoad-link" onClick={this.callImageRefresh}>S</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="personalPage-right">
                                                <h4 className="personalPage-title">{this.props.userName}</h4>
                                                <div className="personalPage-infoLine">
                                                    <div className="personalPage-infoLine-title" onClick={this.toggleDropDown}>
                                                        Your Lucky: {luckyCount}
                                                    </div>
                                                </div>
                                                <div className="personalPage-infoLine">
                                                    <div className="personalPage-infoLine-title" onClick={this.toggleDropDown}>
                                                        Your Shiny: {shinyCount}
                                                    </div>
                                                    <div className="personalPage-infoLine-content userShinyList" data-body>
                                                        {shinyList}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}
