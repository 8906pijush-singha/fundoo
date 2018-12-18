import React, { Component } from 'react';
import archive from '../assets/noteArchive.svg'
import UnArchive from '../assets/unarchive.svg'

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
        }
    }
    async handleToggle() {
        await this.setState({
            archive: !this.state.archive
        })
        this.props.archiveProps(this.state.archive, this.props.noteId)
    }
    render() {
        return (
            !this.state.archive?
            <img src={archive} alt="Archive" onClick={this.handleToggle}></img>
            :
            <img src={UnArchive} alt="UnArchive" onClick={this.handleToggle}></img>

        )
    }
}

export default NoteArchive;