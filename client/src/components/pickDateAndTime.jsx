import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { MenuItem, Paper, ListItem, TextField } from '@material-ui/core';

class PickDateAndTime extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
    };


    onClick=event=>{
         console.log("abcde");
        
        this.props.parentProps(event);
        this.pickDateTime("right");
    }
    pickDateTime = placement => event => {
        console.log("hoh ho");
        
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };

    render() {

        const { anchorEl, open, placement } = this.state;
        return (
            <div>
                <div>
                    <MenuItem onClick={this.onClick}>Pick Date</MenuItem>
                </div>

                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <div>
                                    <ListItem >Pick Date And Time</ListItem>
                                    <TextField></TextField>
                                    
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>

        )
    }
}
export default PickDateAndTime;