import React, { Component } from 'react';
import { Card, Chip, Tooltip, Avatar } from '@material-ui/core';
import Pin from './editPin';
import Tools from './Tools';
import ClockIcon from './clockIcon'

class PinAndOthers extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";

        return (
            <div>
                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey" }}>PINNED</label>
                <div className="gridCards" style={{ marginBottom: "30px" }}>
                    {this.props.pinArray.map((key) => {
                        return (
                            <div key={key.note._id}>
                                <Card className={changeCardStyle} style={{ backgroundColor: key.note.color }} >
                                    <div >
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <b>{key.note.title}</b>
                                            <Pin noteId={key.note._id} getPinProps={this.props.pinNote} pinStatus={key.note.isPinned} />
                                        </div>
                                        <div>
                                            {key.note.description}
                                        </div>
                                        {key.note.reminder !== "" ?
                                            <Chip
                                                icon={<ClockIcon />}
                                                style={{}}
                                                label={key.note.reminder}
                                                onDelete={() => this.props.reminderNote("", key.note._id)}
                                            />

                                            : null}
                                    </div>
                                    <div className="noteicons">
                                        <Tools getColorProps={this.props.getColor}
                                            collab={key.collab}
                                            note={key.note}
                                            noteId={key.note._id}
                                            archiveProps={this.props.archiveNote}
                                            archiveStatus={key.note.archive}
                                            reminder={this.props.reminderNote}
                                            isTrashed={this.props.isTrashed} />

                                    </div>
                                </Card>
                            </div>
                        )
                    })
                    }
                </div>

                <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey" }}>OTHERS</label>
                <div className="gridCards">
                    {this.props.ordinaryCards.map((key) => {
                        return (
                            <div key={key.note._id}>
                                <Card className={changeCardStyle} style={{ backgroundColor: key.note.color }} >
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
                                                style={{}}
                                                icon={<ClockIcon />}
                                                label={key.note.reminder}
                                            />

                                            : null}
                                    </div>
                                    <div className="noteicons">
                                        <Tools getColorProps={this.props.getColor}
                                            collab={key.collab}
                                            note={key.note}
                                            noteId={key.note._id}
                                            archiveProps={this.props.archiveNote}
                                            archiveStatus={key.note.archive}
                                            reminder={this.props.reminderNote}
                                            isTrashed={this.props.isTrashed} />

                                    </div>
                                </Card>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
export default PinAndOthers