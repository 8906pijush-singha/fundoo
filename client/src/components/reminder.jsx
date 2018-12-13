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
    handleClick = placement => event => {

        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    };
    setTodayReminder(note) {
        let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        console.log("before",note);
        
        var date = new Date().toDateString();
        note.reminder = date+ ", 8 "+ampm;
        console.log(note.reminder);
        this.props.reminder(note.reminder,note._id)
    }
    setTomorrowReminder(note){
        let days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon"]
        console.log("before",note);
        var date = new Date().toDateString();
        date=date.replace(new Date().getDate().toString(),new Date().getDate()+1);
        date=date.replace(days[new Date().getDay()-1],days[new Date().getDay()]);
        note.reminder = date+ ", 8 AM" ;
        console.log(note.reminder);
        this.props.reminder(note.reminder,note._id)
    }
    setWeeklyReminder(note){
        console.log("before",note);
        var date = new Date().toDateString();
        date=date.replace((new Date().getDate()),(new Date().getDate()+7));
        note.reminder = date+ ", 8 AM" ;
        console.log(note.reminder);
        this.props.reminder(note.reminder,note._id)
    }
    render() {
        const ampm = this.props.parentProps
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
                                    <MenuItem className="menuItemReminder" onClick={() => this.setTodayReminder(this.props.note)} ><div>Later today</div>
                                        <div>
                                            8:00 {ampm}
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="menuItemReminder" onClick={() =>this.setTomorrowReminder(this.props.note)}><div>Tomorrow</div>
                                        <div  value={30} >
                                            8:00 PM
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="menuItemReminder" onClick={() =>this.setWeeklyReminder(this.props.note)}><div>Next Week</div>
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
