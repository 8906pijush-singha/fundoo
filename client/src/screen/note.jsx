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
            trash: false,
            show: false,
            searchNote: "",
            label: "",
            slideNotes:false
        }
        this.createNoteClick = React.createRef();
        this.noteToCardsRef = React.createRef();
        this.noteToAppbarRef = React.createRef();

        this.closeLabelOption = this.closeLabelOption.bind(this);
        this.setCardStyle = this.setCardStyle.bind(this);
        this.showCards = this.showCards.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.getSearchNote = this.getSearchNote.bind(this);
        this.searchLabels = this.searchLabels.bind(this);


    }

    searchLabels(value) {
        this.setState({ label: value });
        console.log("search labels", value);
        this.noteToCardsRef.current.displayLabelledCards();
    }

    getSearchNote(value) {
        this.setState({
            searchNote: value
        })
    }
    slideNotes=()=>{
        this.setState({slideNotes:!this.state.slideNotes})
    }
    closeLabelOption() {
        this.noteToCardsRef.current.closeLabelOption();
    }

    // getSearchNote(value) {
    //     if(this.noteToCardsRef.current!==null){
    //         this.noteToCardsRef.current.getSearchNote(value);
    //     }
    // }

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
        const cardLayout = this.state.slideNotes ? "afterSlide" : "beforeSlide";
        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <div className={cardLayout} >
                    <AppBarComp
                        slideNotes={this.slideNotes}
                        closeLabelOption={this.closeLabelOption}
                        parentProps={this.setCardStyle}
                        handleNavigation={this.handleNavigation}
                        getSearchNote={this.getSearchNote}
                        searchLabels={this.searchLabels}
                    />
                    <div className="dashBoard">
                        {(this.state.archive || this.state.trash) ? null :
                            <CreateNote ref={this.createNoteClick} showCardCall={this.showCards} />}
                        <Cards
                            labelValue={this.state.label}
                            searchNote={this.state.searchNote}
                            parentProps={this.state.cardStyle}
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