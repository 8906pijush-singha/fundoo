import React, { Component } from 'react';


class AddPerson extends Component{
    render(){
        return(
            <img src={require('../assets/notePerson.svg')} alt="Add Person icon" className="noteSVG" ></img>
        )
    }
}

export default AddPerson;