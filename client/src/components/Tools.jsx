import React, { Component } from 'react';
import Reminder from './reminder';
import AddPerson from './addPerson';
import Upload from './upload';
import NoteArchive from './noteArchive';
import More from './noteMore';
import ColorPallete from './colorPallete';
import { getNotes } from '../services/notes';

class Tools extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }

    }
     render() {
        let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (
            <div className="cardTools"><Reminder parentProps={ampm} /><AddPerson />
                <ColorPallete ToolsProps={this.props.getColorProps} noteId={this.props.noteId} notes={this.state.notes} />
                <Upload />
                <NoteArchive />
                <More />
            </div>
        )
    }
}

export default Tools;