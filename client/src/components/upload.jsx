import React, { Component } from 'react';


class Upload extends Component{
    render(){
        return(
            <img src={require('../assets/notePictures.svg')} alt="Upload" className="noteSVG" ></img>
        )
    }
}

export default Upload;