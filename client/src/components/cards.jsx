import React, { Component } from 'react';
import { Card, Chip, Avatar, Tooltip } from '@material-ui/core';
import { getNotes, deleteNoteForever, saveLabel } from '../services/notes';
import Tools from './Tools';
import { updateNotes, updateImages } from '../services/updateNotes';
import Pin from './editPin';
import PinAndOthers from './pinAndOtherCards';
import NavigateReminder from './navigationBar/reminderNotes';
import NavigateArchived from './navigationBar/archivedNotes';
import NavigateTrashed from './navigationBar/trashedNotes';
import ClockIcon from './clockIcon'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import SearchedNotes from '../components/searchBar/searchedNotes'
import {
    ordinaryCards,
    pinArray,
    othersArray,
    archivedNotes,
    reminderNotes, trashArray
} from '../services/cardServices'
import DialogBox from './Dialog';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: "0px"
            }
        },
        MuiChip: {
            root: {
                marginTop: "20px",
                backgroundColor: "rgb(0,0,0,0.10)",
                height: "20px",
                fontSize: "12px",
                padding: "2px"
            },
            deleteIcon: {
                width: "20px",
                height: "20px"
            }
        }
    },
    typography: {
        useNextVariants: true,
    }
})

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            notes: [],
            label: false
            // searchNote: ""
        }
        this.cardsToDialogBox = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.getColor = this.getColor.bind(this);
        this.pinNote = this.pinNote.bind(this)
        this.archiveNote = this.archiveNote.bind(this);
        this.reminderNote = this.reminderNote.bind(this);
        this.isTrashed = this.isTrashed.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.closeEditBox = this.closeEditBox.bind(this);
        this.addLabelToNote = this.addLabelToNote.bind(this);
        this.deleteLabelFromNote = this.deleteLabelFromNote.bind(this);
        this.closeLabelOption = this.closeLabelOption.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    async handleClick(note) {
        await this.setState({ open: true })
        this.cardsToDialogBox.current.getData(note);
    }
    closeEditBox() {
        this.setState({ open: false })
    }
    closeLabelOption() {
        this.setState({
            label: false
        })
    }
    componentDidMount() {

        getNotes()
            .then((result) => {

                this.setState({
                    notes: result
                })
                console.log("this card", result);
            })
            .catch((error) => {
                alert(error)
            });

    }
    showCard(newCard) {
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    displayLabelledCards() {
        this.setState({ label: true })
    }
    editTitle(value, noteId) {
        const title = {
            noteID: noteId,
            title: value
        }

        updateNotes('/editTitle', title)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.title = result.data.data;
                        this.setState({
                            notes: newArray
                        })

                    }
                }

            })


    }
    uploadImage(value, noteId) {
        console.log("image:------------", value);
        let data = new FormData();
        data.append('file', value);
        data.append('noteID', noteId);

        // const image = {
        //     noteID: noteId,
        //     image: data
        // }

        updateImages('/uploadImage', data)
            .then((result) => {
                console.log("result",result.data.data)
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.image = result.data.data;
                        this.setState({
                            notes: newArray
                        })

                    }
                }

            })


    }

    editDescription(value, noteId) {
        const description = {
            noteID: noteId,
            description: value
        }
        updateNotes('/editDescription', description)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.description = result.data.data;
                        this.setState({
                            notes: newArray
                        })

                    }
                }
            })
    }


    getColor(value, noteId) {
        console.log(noteId);
        console.log(value);
        const color = {
            noteID: noteId,
            color: value
        }
        updateNotes('/updateColor', color)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.color = result.data.data;

                        this.setState({
                            notes: newArray
                        })

                    }
                }

            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }

    pinNote(status, noteId) {
        console.log(noteId);
        console.log(status);
        const isPinned = {
            noteID: noteId,
            isPinned: status
        }
        updateNotes('/isPinned', isPinned)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.isPinned = result.data.data;
                        newArray[i].note.archive = false;
                        newArray[i].note.isTrashed = false;
                        this.setState({
                            notes: newArray
                        })


                    }
                }

            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    archiveNote(status, noteId) {
        console.log(noteId);
        console.log(status);
        const isPinned = {
            noteID: noteId,
            archive: status
        }
        updateNotes('/isArchived', isPinned)
            .then((result) => {

                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.archive = result.data.data;
                        newArray[i].note.isPinned = false;
                        newArray[i].note.isTrashed = false;
                        console.log("Result archive", result.data);

                        console.log("Result archive", newArray);
                        this.setState({
                            notes: newArray
                        })


                    }
                }

            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    reminderNote(data, noteId) {
        const reminder = {
            noteID: noteId,
            reminder: data
        }
        updateNotes('/setReminder', reminder)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.reminder = result.data.data;
                        this.setState({
                            notes: newArray
                        })


                    }
                }

            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    isTrashed(noteId) {
        console.log(noteId);

        const trash = {
            noteID: noteId,

        }
        updateNotes('/isTrashed', trash)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.isTrashed = result.data.data;
                        newArray[i].note.isPinned = false;
                        newArray[i].note.archive = false;
                        console.log(newArray);

                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    deleteNote(noteId) {
        console.log(noteId);

        const obj = {
            noteID: noteId,

        }
        deleteNoteForever('/deleteNote', obj)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === obj.noteID) {
                        newArray.splice(i, 1);
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }
    addLabelToNote(noteId, value) {
        const addLabel = {
            noteID: noteId,
            label: value
        }
        saveLabel('/saveLabelToNote', addLabel)
            .then((result) => {


                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    deleteLabelFromNote(value, noteId) {
        const deleteLabel = {
            pull: true,
            value: value,
            noteID: noteId
        }
        saveLabel('/saveLabelToNote', deleteLabel)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i].note._id === noteId) {
                        newArray[i].note.label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
    }
    render() {

        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        if (this.props.searchNote !== "" || this.state.label) {

            let searchedNotes;
            if (this.props.searchNote !== "") {
                searchedNotes = this.state.notes.filter(
                    obj => obj.note.title.includes(this.props.searchNote) ||
                        obj.note.description.includes(this.props.searchNote)
                )
            } else {
                searchedNotes = this.state.notes.filter(
                    obj => obj.note.label.length > 0 && obj.note.label.find((item) => item === this.props.labelValue))
            }
            return (

                <SearchedNotes
                    searchedNotes={searchedNotes}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps}
                    isTrashed={this.isTrashed}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else if (this.props.navigateReminder) {

            return (
                <NavigateReminder
                    reminderNotes={reminderNotes(this.state.notes)}
                    othersArray={othersArray(this.state.notes)}
                    pinArray={pinArray(this.state.notes)}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps}
                    isTrashed={this.isTrashed}
                    uploadImage={this.uploadImage} />
            )
        } else if (this.props.navigateArchive) {
            return (
                <NavigateArchived
                    archivedNotes={archivedNotes(this.state.notes)}
                    othersArray={othersArray(this.state.notes)}
                    pinArray={pinArray(this.state.notes)}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps}
                    isTrashed={this.isTrashed}
                    uploadImage={this.uploadImage} />
            )
        } else if (this.props.navigateTrashed) {
            return (
                <NavigateTrashed

                    othersArray={othersArray(this.state.notes)}
                    pinArray={pinArray(this.state.notes)}
                    trashArray={trashArray(this.state.notes)}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    addLabelToNote={this.addLabelToNote}
                    deleteLabelFromNote={this.deleteLabelFromNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps}
                    isTrashed={this.isTrashed}
                    deleteNote={this.deleteNote}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else {
            let ordinaryCard = ordinaryCards(this.state.notes);
            return (
                <MuiThemeProvider theme={theme}>
                    {pinArray(this.state.notes).length !== 0 ?
                        <PinAndOthers
                            ordinaryCards={ordinaryCards(this.state.notes)}
                            pinArray={pinArray(this.state.notes)}
                            pinNote={this.pinNote}
                            deleteLabelFromNote={this.deleteLabelFromNote}
                            addLabelToNote={this.addLabelToNote}
                            getColor={this.getColor}
                            archiveNote={this.archiveNote}
                            reminderNote={this.reminderNote}
                            parentProps={this.props.parentProps}
                            isTrashed={this.isTrashed}
                            uploadImage={this.uploadImage} />
                        :
                        <div className="gridCards" >

                            {Object.keys(ordinaryCard).map((key) => {
                                // console.log(this.state.notes[key]._id);
                                return (
                                    <div key={ordinaryCard[key].note._id}>
                                        <Card className={changeCardStyle} style={{ backgroundColor: ordinaryCard[key].note.color, borderRadius: "10px" }} >
                                           
                                            <div>
                                                <div>
                                                    {ordinaryCard[key].note.image!==""?
                                                    <img src={ordinaryCard[key].note.image}></img>
                                                :null}
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <b onClick={() => this.handleClick(ordinaryCard[key].note)}>{ordinaryCard[key].note.title}</b>
                                                    <Pin noteId={ordinaryCard[key].note._id} getPinProps={this.pinNote} pinStatus={ordinaryCard[key].note.isPinned} />
                                                </div>

                                                <DialogBox
                                                    ref={this.cardsToDialogBox}
                                                    parentProps={this.state.open}
                                                    handleEdit={this.handleClick}
                                                    closeEditBox={this.closeEditBox}
                                                    note={ordinaryCard[key].note}
                                                    editTitle={this.editTitle}
                                                    editDescription={this.editDescription}
                                                />
                                                <div onClick={() => this.handleClick(ordinaryCard[key].note)}>

                                                    {ordinaryCard[key].note.description}
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    {ordinaryCard[key].collab.length > 0 ?
                                                        // eslint-disable-next-line
                                                        ordinaryCard[key].collab.map((collabKey) => {
                                                            if (ordinaryCard[key].owner.fname !== "") {

                                                                return (
                                                                    <div style={{ margin: "3px" }} key={collabKey._id}>
                                                                        {collabKey.email !== localStorage.getItem('Email') && ordinaryCard[key].owner !== undefined ?
                                                                            <Tooltip title={collabKey.fname + " " + collabKey.lname + " (" + collabKey.email + ")"}>
                                                                                <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                                    {collabKey.fname.substring(0, 1)}
                                                                                </Avatar>
                                                                            </Tooltip>
                                                                            : <Tooltip title={ordinaryCard[key].owner.fname + " " + ordinaryCard[key].owner.lname + " (" + ordinaryCard[key].owner.email + ")"}>
                                                                                <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                                    {ordinaryCard[key].owner.fname.substring(0, 1)}

                                                                                </Avatar>
                                                                            </Tooltip>
                                                                        }
                                                                    </div>
                                                                )
                                                            }

                                                        })
                                                        : null
                                                    }
                                                </div>
                                                {ordinaryCard[key].note.reminder !== "" ?
                                                    <Chip
                                                        icon={<ClockIcon />}
                                                        label={ordinaryCard[key].note.reminder}
                                                        onDelete={() => this.reminderNote("", ordinaryCard[key].note._id)}
                                                    />

                                                    : null}
                                                {ordinaryCard[key].note.label.length > 0 ?
                                                    ordinaryCard[key].note.label.map((key1) =>
                                                        <Chip
                                                            label={key1}
                                                            onDelete={() => this.deleteLabelFromNote(key1, ordinaryCard[key].note._id)} />
                                                    )
                                                    :
                                                    null}
                                            </div>
                                            <div className="noteicons">
                                                <Tools getColorProps={this.getColor}
                                                    collab={ordinaryCard[key].collab}
                                                    owner={ordinaryCard[key].owner}
                                                    note={ordinaryCard[key].note}
                                                    noteId={ordinaryCard[key].note._id}
                                                    addLabelToNote={this.addLabelToNote}
                                                    archiveProps={this.archiveNote}
                                                    archiveStatus={ordinaryCard[key].note.archive}
                                                    reminder={this.reminderNote}
                                                    isTrashed={this.isTrashed}
                                                    uploadImage={this.uploadImage} />

                                            </div>
                                        </Card>
                                    </div>

                                )
                            })}
                        </div>
                    }

                </MuiThemeProvider>
            )
        }
    }

}
export default Cards;


