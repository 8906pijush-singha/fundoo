import React, { Component } from 'react';
import { MenuItem, Popper, Paper, Fade, ClickAwayListener } from '@material-ui/core';
import AddLabelsOnNote from './addLabelsOnNote';


class More extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
        this.moreOptionsToAddLabels=React.createRef();
        this.clickMoreOptions=this.clickMoreOptions.bind(this);
        this.handleLabelsOnNote=this.handleLabelsOnNote.bind(this);
        this.closeMOreOptions=this.closeMOreOptions.bind(this);
    }
    clickMoreOptions(event) {
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,

        }));
    }
    handleTrashed(value){
        this.props.isTrashed(value);
    }
    handleLabelsOnNote(e){
        // this.setState({
        //     open: false
        // })
        this.moreOptionsToAddLabels.current.addLabelPopup(e);
    }
    closeMOreOptions(){
        this.setState({
            open:false
        })
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
                            <ClickAwayListener onClickAway={()=>this.closeMOreOptions()}>
                                <div className="selectMoreOptions">
                                    <MenuItem onClick={()=>this.handleTrashed(this.props.noteId)} id="moreOptionsMenu">Delete</MenuItem>
                                    <MenuItem id="moreOptionsMenu"  onClick={this.handleLabelsOnNote}>Add Label</MenuItem>
                                </div>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <AddLabelsOnNote 
                ref={this.moreOptionsToAddLabels} 
                noteID={this.props.noteId} 
                addLabelToNote={this.props.addLabelToNote} 
                anchorEl={this.state.anchorEl}
                closeMOreOptions={this.closeMOreOptions} />
            </div>
        )
    }
}
export default More;