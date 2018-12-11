import React, { Component } from 'react';
import pinBeforeClick from '../assets/pin.svg'
import pinAfterClick from '../assets/pinAfterClick.svg'
class Pin extends Component {
    constructor() {
        super();
        this.state = {
            pin: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }
    componentWillMount(){

        if(typeof this.props.pinStatus !== 'undefined'){
            this.setState({
                pin:this.props.pinStatus
            })
        }
    }
   async handleToggle() {
       await this.setState({
            pin: !this.state.pin
        })
        this.props.getPinProps(this.state.pin, this.props.noteId)
    }
    render() {
        let pinIcon = this.state.pin ? pinAfterClick : pinBeforeClick
        return (
            <img src={pinIcon} alt="pinIcon" className="pinIcon" onClick={this.handleToggle}></img>
        )
    }
}

export default Pin;