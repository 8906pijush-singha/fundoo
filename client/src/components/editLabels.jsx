import React, { Component } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';


class EditLabel extends Component {
    handleToggle() {
        this.props.handleToggle()
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.drawerPropstoEditLabels}
                    onClose={this.handleToggle}
                >
                    <DialogTitle id="editLabelPopup">Edit Label</DialogTitle>

                    <TextField
                        id="editLabelTextField"
                        placeholder="Create New Label"
                        InputProps={{
                            disableUnderline: true
                        }}
                    />

                    <div className="editCloseButton" >
                        <Button onClick={this.handleToggle.bind(this)}>Done</Button>
                    </div>
                </Dialog>
            </div>
        )

    }
}
export default EditLabel;