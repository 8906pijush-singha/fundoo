import React, { Component } from 'react';
import { Card, Chip, Divider } from '@material-ui/core';
import Pin from './editPin';
import Tools from './Tools';


class PinAndOthers extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <div>
                <label style={{fontFamily:"georgia",fontSize:"15px",color:"grey"}}>PINNED</label>
                <div className="gridCards" style={{marginBottom:"30px"}}>
                     {this.props.pinArray().map((key)=>{
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
                                     style={{}}
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
                                 reminder={this.props.reminderNote} />

                         </div>
                     </Card>)
                     })
                    }    
                </div>
               
                <label style={{fontFamily:"georgia",fontSize:"15px",color:"grey"}}>OTHERS</label>
                <div className="gridCards">
                    {this.props.othersArray().map((key)=>{
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
                                     style={{}}
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
                                 reminder={this.props.reminderNote} />

                         </div>
                     </Card>
                        )
                     })
                     } 
                </div>
            </div>
        )
    }
}
export default PinAndOthers