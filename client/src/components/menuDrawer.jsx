import React, { Component } from 'react';
import { MenuItem, Drawer } from '@material-ui/core';

import EditLabel from "../components/editLabel"
import { getLabels } from '../services/labelServices';

class MenuDrawer extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false,
            label:[]
        }
        this.handleEditLabel = this.handleEditLabel.bind(this);
        this.showLabels = this.showLabels.bind(this);
        this.newLabels=this.newLabels.bind(this);
    }

    handleEditLabel() {
        this.setState({ open: !this.state.open })
    }
    componentDidMount() {
        getLabels()
            .then((result) => {
                this.setState({
                    label: result
                })
                console.log("labels", result);

            })
            .catch((error) => {
                alert(error)
            });
    }
    displaySearchLabels(value) {
        this.props.searchLabels(value)
    }
    showLabels(value) {
     
        this.setState({
            label: [...this.state.label, value]
        })
    }

    newLabels(value) {
        this.setState({ label: value })
    }
    async handleNotes() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: false
        })
        this.props.closeLabelOption();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleReminder() {
        await this.setState({
            navigateReminder: true,
            navigateArchived: false,
            navigateTrashed: false
        })
        this.props.closeLabelOption();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleArchived() {

        await this.setState({
            navigateReminder: false,
            navigateArchived: true,
            navigateTrashed: false
        })
        this.props.closeLabelOption();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    async handleTrashed() {
        await this.setState({
            navigateReminder: false,
            navigateArchived: false,
            navigateTrashed: true
        })
        this.props.closeLabelOption();
        this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
    }
    render() {
        let displayLabels = this.state.label;
        if (this.state.label !== "") {
            displayLabels = this.state.label.map((key) =>
                <MenuItem style={{ display: "flex", flexDirection: "row", }} onClick={()=>this.displaySearchLabels(key.label)}>

                    <img src={require('../assets/labelIcon.svg')} alt="label icon" style={{ marginRight: "50px" }} />

                    <div style={{ color: "black", marginRight: "50px", fontFamily: "arial", fontSize: "1rem", marginBottom: "10px", marginTop: "10px" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }

        return (
            <div>
                <Drawer
                    open={this.props.parentProps}
                    variant="persistent"
                // containerStyle={{ 'top': 70, "boxShadow": 0 }}
                >
                    <MenuItem onClick={() => this.handleNotes()}>
                        <img src={require('../assets/note.svg')} alt="Note icon" style={{ marginRight: "55px" }}>
                        </img>Notes</MenuItem>

                    <MenuItem onClick={this.handleReminder.bind(this)}>
                        <img src={require('../assets/reminder.svg')} alt="Reminder icon" style={{ marginRight: "55px" }}>
                        </img>Reminders</MenuItem>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ fontSize: "85%", marginLeft: "10px", marginTop: "10px", color: "grey", fontFamily: "georgia" }}>
                            LABELS
                                    </div>
                        <div>
                            {displayLabels}
                        </div>
                        <MenuItem  onClick={this.handleEditLabel}>
                            <img src={require('../assets/edit.svg')} alt="edit icon" style={{ marginRight: "55px" }}></img>
                            Edit Label
                                </MenuItem>
                    </div>

                    <MenuItem onClick={() => this.handleArchived()}>
                        <img src={require('../assets/baseline-archive-24px.svg')} alt="archive icon" style={{ marginRight: "55px" }}></img>Archive</MenuItem>

                    <MenuItem onClick={() => this.handleTrashed()}>
                        <img src={require('../assets/icons8-trash-24.png')} alt="trash icon" style={{ marginRight: "55px" }}></img>Trash</MenuItem>


                </Drawer>
                <EditLabel
                    newLabels={this.newLabels}
                    label={this.state.label}
                    showLabels={this.showLabels}
                    drawerPropstoEditLabels={this.state.open}
                    labelToggle={this.handleEditLabel} />
            </div>
        )
    }
}

export default MenuDrawer;