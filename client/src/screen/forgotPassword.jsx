import React,{Component} from 'react'
import {  } from '@material-ui/core';
import ForgotInput from '../components/forgotInput';
import { Home } from '../components/links';

class Forgot extends Component{
    render(){
        return(
            <form className="App2">
               <h2>Forgot your password?</h2>
               <h3 style={{color:"darkgreen"}}>Enter your registered email id and we will get back to you.</h3>
               <ForgotInput/> 
               <p />
               <Home/>
            </form>
        )
    }
}
export default Forgot;