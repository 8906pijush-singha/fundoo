import React, { Component } from 'react'
import Popper from '@material-ui/core/Popper';
import { IconButton, MenuItem, Paper, Tooltip } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import gearIcon from '../assets/gear.png'
const obj = [
    "Settings",
    "Send Feedback",
    "Help",
    "App Downloads",
    "Keyboard Shortcuts"
]
class Settings extends Component {

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
        // const numbers = [1, 2, 3, 4, 5];
        const listItems = obj.map((value) =>
            <MenuItem id="settingsMenuItem">{value}</MenuItem>
        );
        return (
            <div>
                <IconButton >
                    <Tooltip title="Settings">
                        <img src={gearIcon} onClick={this.handleClick('bottom-start')} alt="settings icon" />
                    </Tooltip>
                </IconButton>



                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className="settingsPopper">
                                <div>

                                    {listItems}

                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </div>
        )
    }
}
export default Settings;
