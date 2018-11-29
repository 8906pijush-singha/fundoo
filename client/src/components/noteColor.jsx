import React, { Component } from 'react';


class NoteColor extends Component{
    render(){
        return(
            <img src={require('../assets/noteColor.svg')} alt="Add Person icon" className="noteSVG" ></img>
        )
    }
}

export default NoteColor;