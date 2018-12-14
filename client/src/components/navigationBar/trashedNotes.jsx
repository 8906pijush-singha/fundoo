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
                <div className="gridCards" style={{marginBottom:"30px",paddingTop:"150px"}}>
                     {this.props.trashArray.map((key)=>{
                         return(
                         <Card className={changeCardStyle} style={{ backgroundColor:key.color }} >
                            <div style={{fontSize:"22px",marginBottom:"50px",color:"gray"}}>
                            <label >Empty Note</label>
                            </div>

                            <TrashOptions/>
                     </Card>)
                     })
                    }    
                </div>
            </MuiThemeProvider>
        )
    }
}
export default NavigateTrashed;