import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core'
import TrashOptions from '../trashOption';
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
class NavigateTrashed extends Component {
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <label style={{fontFamily:"georgia",fontSize:"15px",color:"grey"}}>ARCHIVED</label>
                <div className="gridCards" style={{marginBottom:"30px",paddingTop:"150px"}} >
                     {this.props.trashArray.map((key)=>{
                    //      return(
                    //      <Card className={changeCardStyle} style={{ backgroundColor:key.color }} >
                    //         <div style={{fontSize:"22px",marginBottom:"50px",color:"gray"}}>
                    //         <label >Empty Note</label>
                    //         </div>

                    //         <TrashOptions/>
                    //  </Card>)
                    return(
                        <Card className={changeCardStyle} style={{ backgroundColor:key.note.color }} key={key.note._id} >
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <b style={{marginBottom:"35px"}}>{key.note.title}</b>
                            </div>
                            <div>
                                {key.note.description}
                            </div>
                            <TrashOptions restore={this.props.isTrashed} noteID={key.note._id} deleteNote={this.props.deleteNote}/>
                        </div>
                    </Card>)
                     })
                    }    
                </div>
            </MuiThemeProvider>
        )
    }
}
export default NavigateTrashed;