import React, { Component } from "react";
import CreateNote from "../components/createNote";
import AppBarComp from "../components/appbar";
import Cards from "../components/cards";

class Note extends Component {
    constructor() {
        super();
        this.state = {
            createNote: false,
            cardStyle: false,
            reminder: false,
            archive: false,
            trash: false
        }
        this.createNoteClick = React.createRef();
        this.noteToCardsRef = React.createRef();
        // this.handleClick = this.handleClick.bind(this);
        this.setCardStyle = this.setCardStyle.bind(this);
        this.showCards = this.showCards.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this)

    }
    showCards(newCard) {
        this.noteToCardsRef.current.showCard(newCard);
    }

    setCardStyle() {
        this.setState({ cardStyle: !this.state.cardStyle })
    }
    // handleClick(e) {
    //     // console.log(e.target.id);
    //     if (this.createNoteClick.current !== null && this.createNoteClick.current.getCreateNoteStatus()) {
    //         this.createNoteClick.current.setOnCreateNoteClickFalse(e);
    //     }
    //     e.preventDefault();
    // }

    handleNavigation(reminder, archive, trash) {
        console.log("handleNAvigation", reminder, archive, trash);

        if (reminder === true || archive === true || trash === true) {
            console.log("kodhgbridbo");

            this.setState({
                reminder: reminder,
                archive: archive,
                trash: trash
            })
        } else {
            this.setState({
                reminder: false,
                archive: false,
                trash: false
            })
        }
    }

    render() {

        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <div id="card-layout" onClick={this.handleClick} >
                    <AppBarComp parentProps={this.setCardStyle} handleNavigation={this.handleNavigation} />
                    <div className="dashBoard">
                        {(this.state.archive || this.state.trash) ? null :
                            <CreateNote ref={this.createNoteClick} showCardCall={this.showCards} />}
                        <Cards parentProps={this.state.cardStyle}
                            ref={this.noteToCardsRef}
                            navigateReminder={this.state.reminder}
                            navigateArchive={this.state.archive}
                            navigateTrashed={this.state.trash} />
                    </div>
                </div>
            )
        }
    }
}
export default Note;