import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import { getNotes } from '../services/notes';
import Tools from './Tools';
import { updateNotes } from '../services/updateNotes';
import Pin from './editPin';
class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
        this.getColor=this.getColor.bind(this);
        this.pinNote=this.pinNote.bind(this)
    }
    componentDidMount() {
        console.log("this card", this);

        getNotes()
            .then((result) => {
                this.setState({
                    notes: result
                })
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
                console.log(result.data.data);
                
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
        updateNotes('/isPinned',isPinned )
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
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <div className="gridCards" >
                {Object.keys(this.state.notes).map((key) => {
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
                                </div>
                                <div className="noteicons">
                                    <Tools getColorProps={this.getColor} noteId={this.state.notes[key]._id} />

                                </div>
                            </Card>
                        </div>

                    )
                })}
            </div>


        )
    }

}
export default Cards;


