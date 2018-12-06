import React, { Component } from 'react';
import { Input, Card, Button } from '@material-ui/core';

import Upload from './upload';
import Tools from './Tools';
import { createNote } from '../services/notes';



class CreateNote extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
            color:"",
            reminder: "",
            isPinned: false,
            image:"",
            archive: false,
            isTrashed: false,
            onCreateNoteClick: false,
            newNote:{}
        }
        this.setOnCreateNoteClickFalse = this.setOnCreateNoteClickFalse.bind(this);
        this.setOnCreateNoteClickTrue = this.setOnCreateNoteClickTrue.bind(this);
        this.getCreateNoteStatus = this.getCreateNoteStatus.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
        this.handleDescription=this.handleDescription.bind(this)
        this.getNewNote=this.getNewNote.bind(this);
    }
    getNewNote(){
        return this.state.newNote;
    }

    handleDescription(e){
        this.setState({
            description:e.target.value
        })
    }
    handleTitle(event){
        this.setState({
            title:event.target.value
        })
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
        const note={
            "email":localStorage.getItem("Email"),
            "title": this.state.title,
            "description": this.state.description,
            // "color": data.color,
            // "reminder": data.reminder,
            // "isPinned": data.isPinned,
            // "image": data.image,
            // "archive": data.archive,
            // "isTrashed": data.isTrashed
        }
        createNote(note)
            .then((result) => {
                this.setState({
                    newNote:result.data.data
                })
                console.log("result",result.data.data)
                this.props.showCardCall();
            })
            .catch((error) => {
                alert(error)
            });
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
                            value={this.state.title}
                            onChange={this.handleTitle}

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
                            value={this.state.description}
                            onChange={this.handleDescription}

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