import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import { getNotes } from '../services/notes';
import Tools from './Tools';
import pinIcon from '../assets/pin.svg'
import { updateNotes } from '../services/updateNotes';
class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
        // this.setData = this.setData.bind(this);

    }
    componentDidMount() {
        console.log("this card",this);

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

    // setData(notes) {
    //     var data = this.getColor();
    //     console.log("data:", data);
        
    //     this.setState({
    //         notes: notes
    //     })
    // }
    getColor(value, noteId) {
        console.log(noteId);
        console.log(value);
        const color = {
            noteID: noteId,
            color: value
        }
        return updateNotes('/updateColor', color)
            .then((result) => {
                console.log("result", this.notes);
                let newArray = this.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].color = result.data.data;
                        console.log("this",this);
                        
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
                                        <img src={pinIcon} alt="pinIcon" className="pinIcon"></img>
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


