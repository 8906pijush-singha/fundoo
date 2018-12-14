import React, { Component } from 'react';
import { Card ,Chip} from '@material-ui/core';
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


class NavigateArchived extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <div className="gridCards" style={{marginBottom:"30px",paddingTop:"150px"}}>
                <label style={{fontFamily:"georgia",fontSize:"15px",color:"grey"}}>ARCHIVED</label>
                     {this.props.archivedNotes.map((key)=>{
                         return(
                         <Card className={changeCardStyle} style={{ backgroundColor:key.color }} >
                         <div>
                             <div style={{ display: "flex", justifyContent: "space-between" }}>
                                 <b>{key.title}</b>
                                 <Pin noteId={key._id} getPinProps={this.props.pinNote} pinStatus={key.isPinned} />
                             </div>
                             <div>
                                 {key.description}
                             </div>
                             {key.reminder !== "" ?
                                 <Chip
                                     icon={<ClockIcon/>}
                                     label={key.reminder}
                                 />

                                 : null}
                         </div>
                         <div className="noteicons">
                             <Tools getColorProps={this.props.getColor}
                                 note={key}
                                 noteId={key._id}
                                 archiveProps={this.props.archiveNote}
                                 archiveStatus={key.archive}
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
export default NavigateArchived;