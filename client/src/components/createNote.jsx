import React, { Component } from 'react';
import { Input, Card } from '@material-ui/core';
import Reminder from './reminder';
import AddPerson from './addPerson';
import NoteColor from './noteColor';
import NoteArchive from './noteArchive';
import Upload from './upload';
import More from './noteMore';


class CreateNote extends Component {
    constructor() {
        super();
        this.state = {
            onCreateNoteClick: false
        }
        this.setOnCreateNoteClickFalse = this.setOnCreateNoteClickFalse.bind(this);
        this.setOnCreateNoteClickTrue = this.setOnCreateNoteClickTrue.bind(this);
        this.getCreateNoteStatus = this.getCreateNoteStatus.bind(this);
    }

    getCreateNoteStatus() {
        return this.state.onCreateNoteClick;
    }

    setOnCreateNoteClickTrue(e) {
        e.preventDefault();
        if (this.state.onCreateNoteClick === false)
            this.setState({ onCreateNoteClick: true });
    }
    setOnCreateNoteClickFalse(e) {
        e.preventDefault();
        console.log(e.target)
        if (e.target.id === "card-layout")
            this.setState({ onCreateNoteClick: false });
    }
    disableClick(e) {
        e.preventDefault();
        console.log(e.target.id);
        // console.log("Child call");
        return false;
    }
    render() {
        return (
        !this.state.onCreateNoteClick ?
            <div>
                <Card id="card1">
                    <div>
                        <Input placeholder="Take a note... "
                            readOnly={true}
                            disableUnderline={true}
                            onClick={this.setOnCreateNoteClickTrue}

                        ></Input>
                    </div>
                </Card>
            </div>
            :
            <div>
                <Card id="card2">
                    <div>
                        <Input placeholder="Title "
                            readOnly={false}
                            disableUnderline={true}
                            onClick={this.disableClick}

                        // disabled={onclick}
                        ></Input>
                    </div>
                    <div>
                        <Input placeholder="Take a note... "
                            disableUnderline={true}
                            // disabled={onclick}                                
                            onClick={this.disableClick}
                        ></Input>
                        <div><Reminder /><AddPerson/><NoteColor /><Upload/><NoteArchive/><More/></div>
                    </div>
                </Card>
            </div>
        )

    }
}

export default CreateNote;