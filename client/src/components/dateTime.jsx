import React, { Component } from 'react';
import { MenuItem, Popper, Paper, ListItem, Input } from '@material-ui/core';


import DateTimePicker from 'react-datetime-picker'

class PickDateAndTime extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            date: new Date()
        }
        this.handleDateAndTime = this.handleDateAndTime.bind(this);
        this.showTime=this.showTime.bind(this);
    }
    handleDateAndTime(event) {
        const { currentTarget } = event
        this.setState({
            anchorEl: currentTarget,
            open: !this.state.open
        })
    }
    showTime(){
        // console.log(this.state.date)
    }
    onChange = date => this.setState({ date })

    render() { 
        const { anchorEl, open } = this.state;

        return (
            <div>
                <MenuItem onClick={this.handleDateAndTime}>
                    Pick date and time
                </MenuItem>
                <Popper open={open} placement={"right"} anchorEl={anchorEl}>
                    <Paper className="pickDateTimePopper">
                        <ListItem>Pick date and time</ListItem>
                        <input type ="date"></input>
                        {/* <DateTimePicker
                            onClick={this.showTime}
                            onChange={this.onChange}
                            value={this.state.date}
                            defaultValue="2017-05-24T10:30"
                        /> */}
                    </Paper>
                </Popper>
            </div>
        )
    }
}

export default PickDateAndTime;























 // // export default DateAndTimePickers
// import React, { Component } from 'react';
// import Popper from '@material-ui/core/Popper';
// import Fade from '@material-ui/core/Fade';
// import { MenuItem, Paper, ListItem, TextField } from '@material-ui/core';

// class PickDateAndTime extends Component {
//     state = {
//         anchorEl: null,
//         open: false,
//         placement: null,
//     };

//     pickDateTime(event) {
//         const { currentTarget } = event;

//         this.setState(state => ({
//             anchorEl: currentTarget,
//             open: !state.open,

//         }));
//     };

//     render() {

//         const { anchorEl, open } = this.state;
//         return (
//             <div>
//                 <div>
//                     <MenuItem onClick={this.pickDateTime.bind(this)}>Pick Date</MenuItem>
//                 </div>

//                 <Popper open={open} anchorEl={anchorEl} placement={'right'} transition>
//                     {({ TransitionProps }) => (
//                         <Fade {...TransitionProps} timeout={0}>
//                             <Paper>
//                                 <div className="pickDateTime">

//                                     <ListItem>Pick Date And Time</ListItem>
//                                     <TextField
//                                         type="date"
//                                         InputProps={{
//                                             disableUnderline: true
//                                         }}
//                                     />
//                                     <TextField
//                                         type="time"
//                                         defaultValue="12:30"
//                                         InputProps={{
//                                             disableUnderline: true
//                                         }}
//                                     />
//                                     <TextField
//                                         defaultValue="Does not repeat"
//                                         InputProps={{
//                                             disableUnderline: true
//                                         }}
//                                     />



//                                 </div>
//                             </Paper>
//                         </Fade>
//                     )}
//                 </Popper>
//             </div>

//         )
//     }
// }
