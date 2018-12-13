import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import { getNotes } from '../services/notes';
import Tools from './Tools';
import { updateNotes } from '../services/updateNotes';
import Pin from './editPin';
import PinAndOthers from './pinAndOtherCards';
import NavigateReminder from './navigationBar/reminderNotes';
import NavigateArchived from './navigationBar/archivedNotes';
import NavigateTrashed from './navigationBar/trashedNotes';
import ClockIcon from './clockIcon'
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
    overrides: {
        MuiChip:{
            root:{
                marginTop:"20px",
                backgroundColor:"rgb(0,0,0,0.10)",
                height:"20px",
                fontSize:"12px",
                padding:"2px"
            },
            deleteIcon:{
                width:"20px",
                height:"20px"
            }
        }
    }
})

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }

        this.getColor = this.getColor.bind(this);
        this.pinNote = this.pinNote.bind(this)
        this.archiveNote = this.archiveNote.bind(this);
        this.reminderNote = this.reminderNote.bind(this);
        this.pinArray = this.pinArray.bind(this);
        this.othersArray = this.othersArray.bind(this);
        this.ordinaryCards = this.ordinaryCards.bind(this);
        this.archivedNotes = this.archivedNotes.bind(this);
        this.reminderNotes = this.reminderNotes.bind(this);
    }
    ordinaryCards() {
        let ordinaryCards = [];
        for (let i = 0; i < this.state.notes.length; i++) {
            if (!this.state.notes[i].isPinned && !this.state.notes[i].archive && !this.state.notes[i].isTrashed) {
                ordinaryCards.push(this.state.notes[i]);
            }
        }
        return ordinaryCards;
    }
    reminderNotes() {
        let reminderNotes = [];
        for (let i = 0; i < this.state.notes.length; i++) {
            if (this.state.notes[i].reminder!=="") {
                reminderNotes.push(this.state.notes[i]);
            }
        }
        return reminderNotes;
    }
    archivedNotes() {
        let archivedNotes = [];
        for (let i = 0; i < this.state.notes.length; i++) {
            if (this.state.notes[i].archive) {
                archivedNotes.push(this.state.notes[i]);
            }
        }
        return archivedNotes;
    }
    othersArray() {
        let othersArray = []

        for (let i = 0; i < this.state.notes.length; i++) {
            if (!this.state.notes[i].isPinned && !this.state.notes[i].archive) {
                othersArray.push(this.state.notes[i])
            }
        }
        return othersArray

    }
    pinArray() {
        let pinArray = []

        for (let i = 0; i < this.state.notes.length; i++) {
            if (this.state.notes[i].isPinned) {
                pinArray.push(this.state.notes[i])
            }
        }
        return pinArray

    }
    componentDidMount() {

        getNotes()
            .then((result) => {
                this.setState({
                    notes: result
                })
                console.log("this card", this.state.notes);
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
                    if (newArray[i]._id === noteId) {
                        newArray[i].color = result.data.data;
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
                    if (newArray[i]._id === noteId) {
                        newArray[i].isPinned = result.data.data;
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
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.data;
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
    reminderNote(date, noteId) {
        console.log(noteId);
        console.log(date);
        const reminder = {
            noteID: noteId,
            reminder: date
        }
        updateNotes('/setReminder', reminder)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].reminder = result.data.data;
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
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";

        if (this.props.navigateReminder) {
            return (
                <NavigateReminder
                    reminderNotes={this.reminderNotes}
                    othersArray={this.othersArray}
                    pinArray={this.pinArray}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps} />
            )
        } else if (this.props.navigateArchive) {
            return (
                <NavigateArchived
                    archivedNotes={this.archivedNotes}
                    othersArray={this.othersArray}
                    pinArray={this.pinArray}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps} />
            )
        } else if (this.props.navigateTrashed) {
            return (
                <NavigateTrashed
                    
                    othersArray={this.othersArray}
                    pinArray={this.pinArray}
                    pinNote={this.pinNote}
                    getColor={this.getColor}
                    archiveNote={this.archiveNote}
                    reminderNote={this.reminderNote}
                    parentProps={this.props.parentProps} />
            )
        }
        else
            return (

                <MuiThemeProvider theme={theme}>
                    {this.pinArray().length !== 0 ?
                        <PinAndOthers
                            ordinaryCards={this.ordinaryCards}
                            pinArray={this.pinArray}
                            pinNote={this.pinNote}
                            getColor={this.getColor}
                            archiveNote={this.archiveNote}
                            reminderNote={this.reminderNote}
                            parentProps={this.props.parentProps} />
                        :
                        <div className="gridCards" >
                            {Object.keys(this.ordinaryCards()).map((key) => {
                                // console.log(this.state.notes[key]._id);
                                return (
                                    <div key={this.state.notes[key]._id}>
                                        <Card className={changeCardStyle} style={{ backgroundColor: this.state.notes[key].color }} >
                                            <div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <b>{this.state.notes[key].title}</b>
                                                    <Pin noteId={this.state.notes[key]._id} getPinProps={this.pinNote} pinStatus={this.state.notes[key].isPinned} />
                                                </div>
                                                <div>
                                                    {this.state.notes[key].description}
                                                </div>
                                                {this.state.notes[key].reminder !== "" ?
                                                    <Chip
                                                        icon={<ClockIcon/>}
                                                        label={this.state.notes[key].reminder}
                                                        onDelete
                                                    />

                                                    : null}
                                            </div>
                                            <div className="noteicons">
                                                <Tools getColorProps={this.getColor}
                                                    note={this.state.notes[key]}
                                                    noteId={this.state.notes[key]._id}
                                                    archiveProps={this.archiveNote}
                                                    archiveStatus={this.state.notes[key].archive}
                                                    reminder={this.reminderNote} />

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
export default Cards;


