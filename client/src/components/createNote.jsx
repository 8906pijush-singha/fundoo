import React, { Component } from 'react';
import { Input, Card, Button } from '@material-ui/core';

import Upload from './upload';
import Tools from './Tools';
import { createNote } from '../services/notes';
import Pin from './editPin';



class CreateNote extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            color: "rgb(255,255,255)",
            reminder: "",
            isPinned: false,
            image: "",
            archive: false,
            isTrashed: false,
            onCreateNoteClick: false,
            newNote: {},
        }
        this.setOnCreateNoteClickFalse = this.setOnCreateNoteClickFalse.bind(this);
        this.setOnCreateNoteClickTrue = this.setOnCreateNoteClickTrue.bind(this);
        this.getCreateNoteStatus = this.getCreateNoteStatus.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this)
        this.getColor = this.getColor.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.archive=this.archive.bind(this);

    }
    getColor(value) {
        this.setState({
            color: value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    handleTitle(event) {
        this.setState({
            title: event.target.value
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
        // console.log(e.target)
        if (e.target.id === "card-layout")
            this.setState({ onCreateNoteClick: false });
    }
    disableClick(e) {
        e.preventDefault();
        console.log(e.target.id);
        // console.log("Child call");
        return false;
    }
    handlePin(value) {
        this.setState({
            isPinned: value
        })
    }
    handleClick() {
        this.setState({ onCreateNoteClick: false });
        if (this.state.title !== '' && this.state.description !== "") {
            const note = {
                "email": localStorage.getItem("Email"),
                "title": this.state.title,
                "description": this.state.description,
                "color": this.state.color,
                "reminder": this.state.reminder,
                "isPinned": this.state.isPinned,
                "image": this.state.image,
                "archive": this.state.archive,
                "isTrashed": this.state.isTrashed
            }
            createNote(note)
                .then((result) => {
                    console.log("data from backend", result.data.data);
                    
                    this.setState({
                        newNote: result.data.data
                    })
                    this.props.showCardCall(this.state.newNote);
                })
                .catch((error) => {
                    alert(error)
                });
            this.setState({
                title: "",
                description: "",
                color: "rgb(255,255,255)",
                reminder: "",
                isPinned: false,
                image: "",
                archive: false,
                isTrashed: false,
            })
        }
        this.setState({
            color: "rgb(255,255,255)"
        })
    }
    archive(value){
        this.setState({
            archive:value
        })
        console.log("archive status" ,value);
        
    }
    render() {
        return (
            !this.state.onCreateNoteClick ?
                <div>
                    <Card id="card1">
                        <div className="createNoteAndUpload">
                            <Input placeholder="Take a note... "
                                className="createNoteInput"
                                readOnly={true}
                                disableUnderline={true}
                                onClick={this.setOnCreateNoteClickTrue}
                                value={''}
                            ></Input>
                            <Upload />
                        </div>
                    </Card>
                </div>
                :
                <div>
                    <Card id="card2" style={{ backgroundColor: this.state.color }}>
                        <div className="titleAndPin">
                            <Input
                                className="createNoteInput"
                                placeholder="Title "
                                readOnly={false}
                                disableUnderline={true}
                                onClick={this.disableClick}
                                value={this.state.title}
                                onChange={this.handleTitle}

                            ></Input>
                            <Pin getPinProps={this.handlePin} />
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
                                <Tools getColorProps={this.getColor}
                                    ref={this.createNoteToTools}
                                    archiveProps={this.archive} />
                                <Button onClick={this.handleClick} >Close</Button></div>
                        </div>
                    </Card>
                </div>
        )

    }
}

export default CreateNote;