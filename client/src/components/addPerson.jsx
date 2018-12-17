import React, { Component } from 'react';
import notePerson from '../assets/notePerson.svg';
import { Avatar, Tooltip, Dialog, DialogTitle, createMuiTheme, Button, Divider, Input, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "600px",
                margin: "0px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflowY:"hidden"
            }
        }
    }
})

class AddPerson extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.handleColab = this.handleColab.bind(this);
    }
    handleColab() {
        this.setState({ open: !this.state.open });
    }
    render() {
        const userDetails = localStorage.getItem('UserName');
        const mailId = localStorage.getItem('Email');
        const initial = userDetails.substring(0, 1);

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

                        <div style={{ paddingLeft: "10px", paddingTop: "12px", paddingBottom: "10px", display: "flex", flexDirection: "row" }}>
                            <Avatar style={{ backgroundColor: "transparent", border: "1px solid grey" }}>
                                <img src={require('../assets/addColabIcon.svg')} alt="colabIcon" />
                            </Avatar>
                            <Input
                                placeholder="Person or email to share with"
                                disableUnderline={true}
                                style={{ fontSize: "13px", width: "400px", marginLeft: "18px" }}

                            />
                        </div>


                        <div style={{ display: "flex", paddingBottom: "10px", paddingTop: "10px", backgroundColor: "#EEEEEE" }}>

                            <div style={{ marginLeft: "330px" }} >
                                <Button className="doneButton" onClick={this.handleColab}>Cancel</Button>
                            </div>

                            <div style={{ marginLeft: "22px" }} >
                                <Button className="doneButton" onClick={this.handleColab}>Save</Button>
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