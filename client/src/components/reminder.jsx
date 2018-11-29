import React, { Component } from 'react';


class Reminder extends Component{
    render(){
        return(
            <img src={require('../assets/noteReminder.svg')} alt="Reminder icon"  className="noteSVG"  ></img>
        )
    }
}

export default Reminder;