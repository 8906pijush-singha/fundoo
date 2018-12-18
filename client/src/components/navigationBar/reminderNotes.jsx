import React, { Component } from 'react';
import { Card, Chip } from '@material-ui/core';
import Pin from '../editPin'
import Tools from '../Tools';
import ClockIcon from '../clockIcon'
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
    overrides: {
        MuiChip:{
            root:{
                marginTop:"20px",
                backgroundColor:"rgb(0,0,0,0.10)",
                height:"20px",
                fontSize:"12px",
                padding:"2px"
            },
            deleteIcon:{
                width:"20px",
                height:"20px"
            }
        }
    }
})
class NavigateReminder extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <label style={{fontFamily:"georgia",fontSize:"15px",color:"grey"}}>REMINDER NOTES</label>
                <div className="gridCards" style={{marginBottom:"30px"}}>
                     {this.props.reminderNotes.map((key)=>{
                         return(
                         <Card className={changeCardStyle} style={{ backgroundColor:key.note.color }} >
                         <div>
                             <div style={{ display: "flex", justifyContent: "space-between" }}>
                                 <b>{key.note.title}</b>
                                 <Pin noteId={key.note._id} getPinProps={this.props.pinNote} pinStatus={key.note.isPinned} />
                             </div>
                             <div>
                                 {key.note.description}
                             </div>
                             {key.note.reminder !== "" ?
                                 <Chip
                                     style={{}}
                                     icon={<ClockIcon/>}
                                     label={key.note.reminder}
                                     onDelete={()=>this.props.reminderNote("",key.note._id)}
                                 />

                                 : null}
                         </div>
                         <div className="noteicons">
                             <Tools getColorProps={this.props.getColor}
                                 note={key.note}
                                 noteId={key.note._id}
                                 archiveProps={this.props.archiveNote}
                                 archiveStatus={key.note.archive}
                                 reminder={this.props.reminderNote} 
                                 isTrashed={this.props.isTrashed}/>

                         </div>
                     </Card>)
                     })
                    }    
                </div>
            </MuiThemeProvider>
        )
    }
}
export default NavigateReminder;
