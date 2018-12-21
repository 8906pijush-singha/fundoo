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
            searchNote:""
        }
        this.createNoteClick = React.createRef();
        this.noteToCardsRef = React.createRef();
        this.noteToAppbarRef = React.createRef();

        // this.handleClick = this.handleClick.bind(this);
        this.setCardStyle = this.setCardStyle.bind(this);
        this.showCards = this.showCards.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.getSearchNote = this.getSearchNote.bind(this);


    }

    getSearchNote(value){
        this.setState({
            searchNote:value
        })  
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


    // handleChange = (font) => () => {
    //     this.setState({ value: font, show: false });
    // }

    // handleToggle = (e) => {
    //     e.target.focus();
    //     this.setState({ show: !this.state.show });
    // }

    // handleBlur = (e) => {
    //     // firefox onBlur issue workaround
    //     if (e.nativeEvent.explicitOriginalTarget &&
    //         e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
    //         return;
    //     }

    //     if (this.state.show) {
    //         timer = setTimeout(() => {
    //         this.setState({ show: false });
    //         }, 200);
    //     }
    // }


    render() {

        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <div id="card-layout" >
                    <AppBarComp parentProps={this.setCardStyle} handleNavigation={this.handleNavigation} getSearchNote={this.getSearchNote} />
                    <div className="dashBoard">
                        {(this.state.archive || this.state.trash) ? null :
                            <CreateNote ref={this.createNoteClick} showCardCall={this.showCards} />}
                        <Cards

                            // show={this.state.show}
                            // // value={this.state.value}
                            // handleToggle={this.handleToggle}
                            // handleBlur={this.handleBlur}
                            // handleChange={this.handleChange}

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