import React, { Component } from 'react';
import { MenuItem, Popper, Paper, Fade, Checkbox } from '@material-ui/core';
import { getLabels } from '../services/labelServices';


class AddLabelsOnNote extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
            label: []
        }
        this.addLabelPopup = this.addLabelPopup.bind(this);
        this.showLabels = this.showLabels.bind(this);

    }
    addLabelPopup(event) {
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,

        }));
    }
    componentDidMount() {
        getLabels()
            .then((result) => {
                this.setState({
                    label: result
                })
                console.log("labels", result);

            })
            .catch((error) => {
                alert(error)
            });
    }

    showLabels(value) {
        this.setState({
            label: [...this.state.label, value]
        })
    }

    closeLabelPopper(){
        this.setState({
            open: false
        })
    }
    selectLabel(noteID, label) {
        // this.setState({
        //     open: false
        // })
        console.log(noteID, label,this.props);
        
        this.props.addLabelToNote(noteID, label)
    }

    render() {
        let displayLabels = this.state.label;
        if (this.state.label !== "") {
            displayLabels = this.state.label.map((key) =>
                <MenuItem style={{ display: "flex", flexDirection: "row", }}>

                    <Checkbox onClick={() => this.selectLabel(this.props.noteID, key.label)} />

                    <div style={{ color: "black", marginRight: "50px", fontFamily: "arial", fontSize: "1rem", marginBottom: "10px", marginTop: "10px" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }

        const { anchorEl, open } = this.state;
        return (
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={'right'} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={0}>
                            <Paper className="moreOptionsPopper" style={{ paddingTop: "10px" }}
                                onClick={() => this.closeLabelPopper()}>
                                <div style={{ color: "#3c4043", fontSize: "15px", fontWeight: "500", fontFamily: "'Roboto',arial,sans-serif", paddingLeft: "10px", paddingRight: "10px" }}>
                                    Label Note
                                </div>

                                <div>

                                    {displayLabels}
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        )
    }
}
export default AddLabelsOnNote;