import React, { Component } from 'react';
import LoginInput from '../components/login_input'
import { Links } from '../components/links';

const style={
    width:"35%",
    height:"35%"
}

class Login extends Component{
    render(){
        return(
            <form className="App1">
                <h2 >Sign in</h2>
                <p />
                <img src={require('../assets/user.jpg')}
                alt="user"
                style={style}/>
                <p />
                <LoginInput/>
                <p />
                <Links/>
            </form>
        )
    }
}

export default Login;