import React, { Component } from 'react';
import RegisterInput from '../components/register_input';
import { RegisterLink } from '../components/links';

const style={
    width:"35%",
    height:"35%"
}

class Register extends Component{
    render(){
        return(
            <form className="App1">
                <h2 >Sign up</h2>
                <img src={require('../assets/user.jpg')}
                alt="user"
                style={style}/>
                <RegisterInput/>
                <RegisterLink/>
            </form>
        )
    }
}

export default Register;