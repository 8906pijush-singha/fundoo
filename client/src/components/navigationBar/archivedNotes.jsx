import React, { Component } from 'react';
import { Card, Chip, Tooltip, Avatar } from '@material-ui/core';
import Pin from '../editPin'
import Tools from '../Tools';
import ClockIcon from '../clockIcon'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                marginTop: "20px",
                backgroundColor: "rgb(0,0,0,0.10)",
                height: "20px",
                fontSize: "12px",
                padding: "2px"

            },
            deleteIcon: {
                width: "20px",
                height: "20px"
            }
        }
    },
    typography: {
    useNextVariants: true,
    }
})


class NavigateArchived extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <div className="gridCards" style={{ marginBottom: "30px", paddingTop: "150px" }}>
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey" }}>ARCHIVED</label>
                    {this.props.archivedNotes.map((key) => {
                        return (
                            <Card className={changeCardStyle} style={{ backgroundColor: key.note.color,  borderRadius: "10px" }} >
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.note.title}</b>
                                        <Pin noteId={key.note._id} getPinProps={this.props.pinNote} pinStatus={key.note.isPinned} />
                                    </div>
                                    <div>
                                        {key.note.description}
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        {key.collab.length > 0 ?
                                            // eslint-disable-next-line
                                            key.collab.map((collabKey) => {
                                                if (key.owner.fname !== "") {

                                                    return (
                                                        <div style={{ margin: "3px" }}>
                                                            {collabKey.email !== localStorage.getItem('Email') && key.owner !== undefined ?
                                                                <Tooltip title={collabKey.fname + " " + collabKey.lname + " (" + collabKey.email + ")"}>
                                                                    <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                        {collabKey.fname.substring(0, 1)}
                                                                    </Avatar>
                                                                </Tooltip>
                                                                : <Tooltip title={key.owner.fname + " " + key.owner.lname + " (" + key.owner.email + ")"}>
                                                                    <Avatar style={{ height: "30px", width: "30px", backgroundColor: "rgb(0,0,0,.10)" }}>
                                                                        {key.owner.fname.substring(0, 1)}

                                                                    </Avatar>
                                                                </Tooltip>
                                                            }
                                                        </div>
                                                    )
                                                }

                                            })
                                            : null
                                        }

                                    </div>
                                    {key.note.reminder !== "" ?
                                        <Chip
                                            icon={<ClockIcon />}
                                            label={key.note.reminder}
                                            onDelete={() => this.props.reminderNote("", key.note._id)}
                                        />

                                        : null}
                                    {key.note.label.length > 0 ?
                                        key.note.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key.note._id)} />
                                        )
                                        :
                                        null}
                                </div>
                                <div className="noteicons">
                                    <Tools
                                        addLabelToNote={this.props.addLabelToNote}
                                        getColorProps={this.props.getColor}
                                        collab={key.collab}
                                        owner={key.owner}
                                        note={key.note}
                                        noteId={key.note._id}
                                        archiveProps={this.props.archiveNote}
                                        archiveStatus={key.note.archive}
                                        reminder={this.props.reminderNote}
                                        isTrashed={this.props.isTrashed} />

                                </div>
                            </Card>)
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
export default NavigateArchived;