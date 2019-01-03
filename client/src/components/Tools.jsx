import React, { Component } from 'react';
import Reminder from './reminder';
import AddPerson from './addPerson';
import Upload from './upload';
import NoteArchive from './noteArchive';
import More from './noteMore';
import ColorPallete from './colorPallete';

class Tools extends Component {
    render() {
        let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (
            <div className="cardTools"><Reminder parentProps={ampm} note={this.props.note}
                reminder={this.props.reminder} />
                <AddPerson noteId={this.props.noteId} collabs={this.props.collab}  owner={this.props.owner} />
                <ColorPallete ToolsProps={this.props.getColorProps} noteId={this.props.noteId} />
                <Upload note={this.props.note} uploadImage={this.props.uploadImage}/>
                <NoteArchive archiveProps={this.props.archiveProps}
                    noteId={this.props.noteId}
                    archiveStatus={this.props.archiveStatus} />
                {/* { console.log("jiefklnbiofhgbkoj",this.props.isTrashed)} */}
                <More isTrashed={this.props.isTrashed} noteId={this.props.noteId} addLabelToNote={this.props.addLabelToNote} />
            </div>
        )
    }
}

export default Tools;