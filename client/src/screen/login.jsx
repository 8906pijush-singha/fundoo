import React, { Component } from 'react';
import LoginInput from '../components/login_input'
import { Links } from '../components/links';
import { auth } from '../services/auth';

const style={
    width:"35%",
    height:"35%"
}

class Login extends Component{
    componentWillMount(){
        auth();
    }
    render(){
        if(localStorage.getItem("isAuth")===true){
            window.location.href='note';
          }else{
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
}

export default Login;