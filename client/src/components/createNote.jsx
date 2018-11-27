import React, { Component } from 'react';
import { Input, Card } from '@material-ui/core';


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
        if (e.target.id==="card-layout")
            this.setState({ onCreateNoteClick: false });
    }
    disableClick(e){
        e.preventDefault();
        console.log(e.target.id);
        // console.log("Child call");
        return false;
    }
    render() {
        if (!this.state.onCreateNoteClick) {
            return (
                <div>
                    <Card id="card1">
                        <div>
                            <Input placeholder="  Take a note... "
                                readOnly={true}
                                disableUnderline={true}
                                onClick={this.setOnCreateNoteClickTrue}
                                ></Input>
                        </div>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <Card id="card2">
                        <div>
                            <Input placeholder="  Title "
                                readOnly={false}
                                disableUnderline={true}
                                onClick={this.disableClick}
                                // disabled={onclick}
                            ></Input>
                        </div>
                        <div>
                            <Input placeholder="  Take a note... "
                                disableUnderline={true}
                                // disabled={onclick}                                
                                onClick={this.disableClick}
                            ></Input>
                        </div>
                    </Card>
                </div>
            )
        }

    }
}

export default CreateNote;