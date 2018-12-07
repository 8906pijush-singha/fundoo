import React, { Component } from "react";
import CreateNote from "../components/createNote";
import AppBarComp from "../components/appbar";
import Cards from "../components/cards";

class Note extends Component {
    constructor() {
        super();
        this.state = {
            createNote: false,
            cardStyle:false,
        }
        this.createNoteClick = React.createRef();
        this.noteToCardsRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.setCardStyle=this.setCardStyle.bind(this);
        this.getCreateNoteProps=this.getCreateNoteProps.bind(this);
        this.showCards=this.showCards.bind(this);

    }
    showCards(){
        this.noteToCardsRef.current.showCard();
    }

    setCardStyle(){
        this.setState({cardStyle:!this.state.cardStyle})
    }
    handleClick(e) {
        // console.log(e.target.id);
        if (this.createNoteClick.current.getCreateNoteStatus()) {
            this.createNoteClick.current.setOnCreateNoteClickFalse(e);
        }
        e.preventDefault();
    }
    getCreateNoteProps(){
        const obj= this.createNoteClick.current.getNewNote()
        return obj;
    }
    render() {

        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <div id="card-layout" onClick={this.handleClick} >
                    <AppBarComp parentProps={this.setCardStyle} />
                    <div className="dashBoard">
                        <CreateNote ref={this.createNoteClick} showCardCall={this.showCards} />
                        <Cards parentProps={this.state.cardStyle} newCard={this.getCreateNoteProps} ref={this.noteToCardsRef}/>
                    </div>
                </div>
            )
        }
    }
}
export default Note;