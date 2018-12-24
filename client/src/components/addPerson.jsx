import React, { Component } from 'react';
import notePerson from '../assets/notePerson.svg';
import { Avatar, Tooltip, Dialog, DialogTitle, createMuiTheme, Button, Divider, Input, MuiThemeProvider } from '@material-ui/core';
import { getCollabDetails, saveCollabs } from '../services/notes';

const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "600px",
                margin: "0px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflowY: "hidden"
            }
        }
    }
})

class AddPerson extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            collabs: [],
            collabSelection: [],
            inputCollab: "",
            collabSuggestions: []
        }
        this.handleColab = this.handleColab.bind(this);
        this.handleInputCollab = this.handleInputCollab.bind(this);
        this.saveCollab = this.saveCollab.bind(this);
        // this.collabList=this.collabList.bind(this);
    }

    saveCollab() {

        let collabData = this.state.collabs.filter(obj => obj.email === this.state.inputCollab);
        console.log("collabData", collabData);

        let newArray = [];
        newArray.push(collabData[0]);
        this.setState({
            collabSelection: newArray,
            inputCollab: ""
        });
        const data = {
            noteID: this.props.noteId,
            collabID: collabData[0]._id
        }
        saveCollabs('/saveCollab', data)
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err)
            })
    }
    handleColab() {
        this.setState({
            open: !this.state.open
        });
    }
    handleInputCollab(e) {
        this.setState({
            inputCollab: e.target.value
        })
        let collabData = this.state.collabs.filter(obj => obj.email === (this.state.inputCollab))
        if (collabData) {
            this.setState({
                collabSuggestions: collabData
            })

        }
    }
    componentDidMount() {
        getCollabDetails('/getCollabDetails')
            .then(async (result) => {
                this.setState({
                    collabs: result.data.data
                })

                if (this.props.collabs !== undefined && this.props.collabs.length > 0) {
                    let newArray = [];
                    let owner={
                        _id:this.props.owner._id,
                        fname:this.props.owner.fname,
                        lname:this.props.owner.lname +" (Owner)",
                        email:this.props.owner.email
                    }
                    newArray.push(owner)
                    for (let i = 0; i < this.props.collabs.length; i++) {
                        if (this.props.collabs[i].email !== this.props.owner) {
                            newArray.push(this.props.collabs[i])
                        }
                    }
                    this.setState({
                        collabSelection: newArray
                    })
                }
            }).catch((err) => {
                console.log(err);
                alert(err);
            })
    }
    render() {
        const userDetails = localStorage.getItem('UserName');
        const mailId = localStorage.getItem('Email');
        const initial = userDetails.substring(0, 1);
        let collaborators = this.state.collabSelection;
        let collabDetails = collaborators.map((key) =>

            <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10px", paddingTop: "10px", width: "530px" }}>

                <Avatar>{key.fname.substring(0, 1)}</Avatar>

                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "18px", paddingTop: "8px" }}>

                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", fontWeight: "700" }}>
                        {key.fname + " " + key.lname}
                    </div>

                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", color: "gray" }}>
                        {key.email}
                    </div>

                </div>
            </div>
        )

        return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title="Collaborator">
                    <img src={notePerson} alt="Add Person icon" className="noteSVG"
                        onClick={this.handleColab}
                    />

                </Tooltip>

                {this.state.open ?

                    <Dialog id="colabDialog" open={this.state.open}>
                        <DialogTitle
                            style={{ fontSize: "25px", fontFamily: "georgia", fontWeight: "700" }}
                        >
                            Collaborators</DialogTitle>
                        <Divider />
                        {this.props.collabs.length === 0 ?
                            <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10px", paddingTop: "10px", width: "530px" }}>
                                <Avatar>{initial}</Avatar>

                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "18px", paddingTop: "8px" }}>

                                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", fontWeight: "700" }}>
                                        {userDetails}
                                    </div>

                                    <div style={{ fontSize: "13px", fontFamily: "'Roboto',arial,sans-serif", color: "gray" }}>
                                        {mailId}
                                    </div>

                                </div>
                            </div>
                            : null}
                        {collabDetails}
                        <div style={{ paddingLeft: "10px", paddingTop: "12px", paddingBottom: "10px", display: "flex", flexDirection: "row" }}>
                            <Avatar style={{ backgroundColor: "transparent", border: "1px solid grey" }}>
                                <img src={require('../assets/addColabIcon.svg')} alt="colabIcon" />
                            </Avatar>
                            <Input
                                placeholder="Person or email to share with"
                                disableUnderline={true}
                                autoComplete="on"
                                style={{ fontSize: "13px", width: "400px", marginLeft: "18px" }}
                                value={this.state.inputCollab}
                                onChange={this.handleInputCollab}
                            />
                        </div>

                        <div style={{ display: "flex", paddingBottom: "10px", paddingTop: "10px", backgroundColor: "#EEEEEE" }}>

                            <div style={{ marginLeft: "330px" }} >
                                <Button className="doneButton" onClick={this.handleColab}>Cancel</Button>
                            </div>

                            <div style={{ marginLeft: "22px" }} >
                                <Button className="doneButton" onClick={this.saveCollab}>Save</Button>
                            </div>
                        </div>
                    </Dialog>
                    :
                    null}
            </MuiThemeProvider>
        )
    }
}
export default AddPerson;