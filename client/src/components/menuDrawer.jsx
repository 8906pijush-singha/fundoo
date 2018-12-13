import React, { Component } from 'react';
import { MenuItem, Drawer } from '@material-ui/core';

import EditLabel from "../components/editLabels"

class MenuDrawer extends Component {
    constructor(){
        super();

        this.state={
            open:false,
            navigateReminder:false,
            navigateArchived:false,
            navigateTrashed:false
        }
        this.handleEditLabel=this.handleEditLabel.bind(this);
    }
    
    handleEditLabel(){
        this.setState({open:!this.state.open})
    }
    async handleNotes(){
        await this.setState({
            navigateReminder:false,
            navigateArchived:false,
            navigateTrashed:false
        })
        this.props.handleNavigation(this.state.navigateReminder,this.state.navigateArchived,this.state.navigateTrashed); 
    }
    async handleReminder(){
        await this.setState({
            navigateReminder:true,
            navigateArchived:false,
            navigateTrashed:false
        })
        this.props.handleNavigation(this.state.navigateReminder,this.state.navigateArchived,this.state.navigateTrashed); 
    }
    async handleArchived(){

        await this.setState({
            navigateReminder:false,
            navigateArchived:true,
            navigateTrashed:false
        })
        this.props.handleNavigation(this.state.navigateReminder,this.state.navigateArchived,this.state.navigateTrashed); 
    }
    async handleTrashed(){
        await this.setState({
            navigateReminder:false,
            navigateArchived:false,
            navigateTrashed:true
        })
        this.props.handleNavigation(this.state.navigateReminder,this.state.navigateArchived,this.state.navigateTrashed); 
    }
    render() {
        return (
            <div>
                <Drawer
                    open={this.props.parentProps}
                    variant="persistent"
                // containerStyle={{ 'top': 70, "boxShadow": 0 }}
                >
                    <MenuItem onClick={()=>this.handleNotes()}>
                    <img src={require('../assets/note.svg')} alt="Note icon" style={{ marginRight: "55px" }}>
                    </img>Notes</MenuItem>
                    
                    <MenuItem onClick={this.handleReminder.bind(this)}>
                    <img src={require('../assets/reminder.svg')} alt="Reminder icon" style={{ marginRight: "55px" }}>
                    </img>Reminders</MenuItem>
                    
                    <div style={{ height: "92px", borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ fontSize: "85%", marginLeft: "10px", marginTop: "10px", color: "grey", fontFamily: "georgia" }}>
                            LABELS
                                    </div>
                        <MenuItem style={{ marginBottom: "100px" }} onClick={this.handleEditLabel}>
                            <img src={require('../assets/edit.svg')} alt="edit icon" style={{ marginRight: "55px" }}></img>
                            Edit Label
                                </MenuItem>
                    </div>
                    
                    <MenuItem onClick={()=>this.handleArchived()}>
                    <img src={require('../assets/baseline-archive-24px.svg')} alt="archive icon" style={{ marginRight: "55px" }}></img>Archive</MenuItem>
                    
                    <MenuItem onClick={()=>this.handleTrashed()}>
                    <img src={require('../assets/icons8-trash-24.png')} alt="trash icon" style={{ marginRight: "55px" }}></img>Trash</MenuItem>


                </Drawer>
                <EditLabel drawerPropstoEditLabels={this.state.open} handleToggle={this.handleEditLabel}/>
            </div>
        )
    }
}

export default MenuDrawer;