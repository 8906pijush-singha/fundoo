import React, { Component } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';


class ViewCards extends Component {
    constructor() {
        super();
        this.state = {
            view: true
        }
        this.onListViewClick = this.onListViewClick.bind(this);
    }
    onListViewClick(e) {
        e.preventDefault();
        this.setState({ view: !this.state.view })
        this.props.parentProps();
    }
    render() {
        return (
            this.state.view ?
                <div className="cardsView"> 
                    <Tooltip title="List View">
                        <IconButton style={{ marginRight: "0px" }} onClick={this.onListViewClick}>
                            <img src={require('../assets/view-agenda.svg')} alt="setting icon" ></img>
                        </IconButton>
                    </Tooltip>
                </div>
                :
                <div className="cardsView">
                    <Tooltip title="Grid View">
                        <IconButton style={{ marginRight: "0px" }} onClick={this.onListViewClick}>
                            <img src={require('../assets/view-grid.svg')} alt="setting icon" ></img>
                        </IconButton>
                    </Tooltip>
                </div>
        )
    }

}

export default ViewCards;