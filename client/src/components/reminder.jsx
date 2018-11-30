import React, { Component } from 'react'
import Popper from '@material-ui/core/Popper';
import { MenuItem, Paper, Tooltip } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import reminder from '../assets/noteReminder.svg'

class Reminder extends Component {

    state = {
        anchorEl: null,
        open: false,
        placement: null,
    };

    handleClick = placement => event => {
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
                    <Tooltip title="Remind me">
                        <img src={reminder} alt="Reminder icon"  className="noteSVG" onClick={this.handleClick('bottom-start')} ></img>
                    </Tooltip>


                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <div>

                                    <MenuItem className="remindersMenuItem">Reminder:</MenuItem>                       
                                    <MenuItem className="remindersMenuItem">Later today</MenuItem>
                                    <MenuItem className="remindersMenuItem">Tomorrow</MenuItem>
                                    <MenuItem className="remindersMenuItem">Next Week</MenuItem>
                                    <MenuItem className="remindersMenuItem">Home</MenuItem>
                                    <MenuItem className="remindersMenuItem">Pick date and time</MenuItem>
                                    <MenuItem className="remindersMenuItem">Pick place</MenuItem>


                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
               
            </div>
        )
    }
}

export default Reminder;
