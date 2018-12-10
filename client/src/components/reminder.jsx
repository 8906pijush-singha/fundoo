import React, { Component } from 'react'
import Popper from '@material-ui/core/Popper';
import { MenuItem, Paper, Tooltip, ListItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import reminder from '../assets/noteReminder.svg'
import PickDateAndTime from '../components/dateTime';
const theme = createMuiTheme({
    overrides: {
        MuiMenuItem: {
            root: {
                fontSize: "12px",
                height: "13px",
                width: "268px",
                marginTop: "5px",
                marginBottom: "5px"
            }
        }
    },
});
class Reminder extends Component {
    
    state = {
        anchorEl: null,
        open: false,
        placement: null,
    };

    // handelOpen(e){
    //     console.log("ku6 v");
    //     const { currentTarget } = e;
        
    //     // e.preventDefault();
            
    //         this.setState(state => ({anchorEl: currentTarget,open:!state.open}));
    // }
    handleClick = placement => event => {
        
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };

    render() {
        const ampm=this.props.parentProps
        const { anchorEl, open, placement } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title="Remind me">
                    <img src={reminder} alt="Reminder icon" onClick={this.handleClick('bottom-start')} ></img>
                </Tooltip>


                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper >
                                <div>

                                    <ListItem className="reminderIcon">Reminder:</ListItem>
                                    <MenuItem className="menuItemReminder" ><div>Later today</div>
                                    <div>
                                        8:00 {ampm}
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="menuItemReminder"><div>Tomorrow</div>
                                    <div>
                                        8:00 PM
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="menuItemReminder"><div>Next Week</div>
                                    <div>
                                        8:00 PM
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="menuItemReminder"><div>Home</div>
                                    <div>
                                        Vashi (West)
                                    </div>
                                    </MenuItem>

                                    <PickDateAndTime />
                                    <MenuItem >Pick place</MenuItem>
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </MuiThemeProvider>
        )
    }
}

export default Reminder;
