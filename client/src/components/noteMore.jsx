import React, { Component } from 'react';
import { MenuItem, Popper, Paper, Fade, ListItem } from '@material-ui/core';


class More extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
        this.clickMoreOptions=this.clickMoreOptions.bind(this);
    }
    clickMoreOptions(event) {
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,

        }));
    }
    render() {
        const { anchorEl, open } = this.state;
        return (
            <div>
                <img src={require('../assets/noteMore.svg')}
                onClick={this.clickMoreOptions}
                    alt="more options icon" />


                <Popper open={open} anchorEl={anchorEl} placement={'right'} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={0}>
                            <Paper className="moreOptionsPopper">
                                <div className="selectMoreOptions">
                                    <MenuItem id="moreOptionsMenu">Add Label</MenuItem>
                                    <ListItem className="addDrawingOptions">Add Drawing</ListItem>
                                    <MenuItem id="moreOptionsMenu">Show Checkboxes</MenuItem>

                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        )
    }
}
export default More;