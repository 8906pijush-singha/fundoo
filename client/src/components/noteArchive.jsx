import React, { Component } from 'react';
import archive from '../assets/noteArchive.svg'


class NoteArchive extends Component {
    constructor() {
        super();
        this.state = {
            archive: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }
    componentWillMount() {

        if (typeof this.props.archiveStatus !== 'undefined') {
            this.setState({
                archive: this.props.archiveStatus
            })
            console.log("archive status", this.props.archiveStatus);

        }
    }
    async handleToggle() {
        await this.setState({
            archive: !this.state.archive
        })
        this.props.getarchiveProps(this.state.archive, this.props.noteId)
    }
    render() {
        return (
            <img src={archive} alt="Archive" className="noteSVG" onClick={this.handleToggle}></img>

        )
    }
}

export default NoteArchive;