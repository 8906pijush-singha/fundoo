import React, { Component } from 'react';


class NoteArchive extends Component{
    render(){
        return(
            <img src={require('../assets/noteArchive.svg')} alt="Archive" className="noteSVG" ></img>
        )
    }
}

export default NoteArchive;