import React, { Component } from 'react';
import { Input, Card, Button } from '@material-ui/core';

import Upload from './upload';
import Tools from './Tools';



class CreateNote extends Component {
    constructor() {
        super();
        this.state = {
            onCreateNoteClick: false
        }
        this.setOnCreateNoteClickFalse = this.setOnCreateNoteClickFalse.bind(this);
        this.setOnCreateNoteClickTrue = this.setOnCreateNoteClickTrue.bind(this);
        this.getCreateNoteStatus = this.getCreateNoteStatus.bind(this);
        this.handleClick=this.handleClick.bind(this);
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
    handleClick(e){
        e.preventDefault();
        this.setState({onCreateNoteClick:false});
    }
    render() {
        return (
        !this.state.onCreateNoteClick ?
            <div>
                <Card id="card1">
                    <div>
                        <Input placeholder="Take a note... "
                            className="createNoteInput"
                            readOnly={true}
                            disableUnderline={true}
                            onClick={this.setOnCreateNoteClickTrue}

                        ></Input>
                        <Upload/>
                    </div>
                </Card>
            </div>
            :
            <div>
                <Card id="card2">
                    <div>
                        <Input
                            className="createNoteInput" 
                            placeholder="Title "
                            readOnly={false}
                            disableUnderline={true}
                            onClick={this.disableClick}

                        // disabled={onclick}
                        ></Input>
                    </div>
                    <div>
                        <Input
                            className="createNoteInput"
                             placeholder="Take a note... "
                            disableUnderline={true}
                            // disabled={onclick}                                
                            onClick={this.disableClick}
                        ></Input>
                        <div className="createNoteTools">
                       <Tools/>
                       <Button onClick={this.handleClick} >Close</Button></div>
                    </div>
                </Card>
            </div>
        )

    }
}

export default CreateNote;