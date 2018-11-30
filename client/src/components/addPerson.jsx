import React, { Component } from 'react';
import notePerson from '../assets/notePerson.svg';

class AddPerson extends Component{
    render(){
        return(
            <img src={notePerson} alt="Add Person icon" className="noteSVG" ></img>
        )
    }
}

export default AddPerson;