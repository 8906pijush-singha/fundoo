import React, { Component } from 'react';
import {TextField, Button} from "@material-ui/core"
import { signup } from '../services/signup';

class RegisterInput extends Component {
  constructor(){
    super();
    this.state={
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:""
    }
    this.handleFirstName=this.handleFirstName.bind(this);
    this.handleLastName=this.handleLastName.bind(this);
    this.handleEmail=this.handleEmail.bind(this);
    this.handlePassword=this.handlePassword.bind(this);    
    this.handleConfirmPassword=this.handleConfirmPassword.bind(this);    
    this.validate=this.validate.bind(this);
    
  }
  handleFirstName=(e)=>{
    this.setState({firstName:e.target.value})
  }
  handleLastName=(e)=>{
    this.setState({lastName:e.target.value})
  }
  handleEmail=(e)=>{
    this.setState({email:e.target.value})
  }
  handlePassword=(e)=>{
    this.setState({password:e.target.value})
  }
  handleConfirmPassword=(e)=>{
    this.setState({confirmPassword:e.target.value})
  }
  validate = (e) => {
    // password must be at least 8 characters
    // At least 1 special character from @#$%&
    // At least 1 number, 1 lowercase, 1 uppercase letter
            if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(this.state.email)===false
            ||/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(this.state.password)===false||
            /\w{3}/.test(this.state.firstName)===false||
            /\w{3}/.test(this.state.lastName)===false||
            /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(this.state.confirmPassword)===false) {
                alert('invalid username or password');
            }
            else if(this.state.password!==this.state.confirmPassword){
              alert("mismatched password")
            }
            else {
              alert("ok");
              console.log("bolo");
              signup(this.state.firstName,this.state.lastName,this.state.email,this.state.password);
             
            }
            e.preventDefault();
        }
  render() {
    return (
      <div >
        <TextField
        label="First name"
        value={this.state.firstName}
        onChange={this.handleFirstName}
        />
        <TextField
        label="Last name"
        value={this.state.lastName}
        onChange={this.handleLastName}
        />
       
        <TextField
        label="Email"
        type="Email"
        value={this.state.email}
        onChange={this.handleEmail}
        />
        {/* //  InputProps={{
        //  disableUnderline: true
        //  }}
        // if it is text field and u need to remove the underline do the above 
        // and if it is input the simply use "disableUnderline={true}"  */}
        <TextField
        type="password"
        label="Password"
        value={this.state.password}
        onChange={this.handlePassword}
        />
        <TextField
        type="password"
        label="Confirm password"
        value={this.state.confirmPassword}
        onChange={this.handleConfirmPassword}
        />
        <p />
        <Button 
        type="submit"
        component="span"
        style={{fontSize:"100%"}}
        onClick={this.validate}
        ><b>SignUp</b>
        </Button>
      </div>
      
    );
  }
}
export default RegisterInput;