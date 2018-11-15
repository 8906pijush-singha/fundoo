import React,{ Component } from "react";
import { Button, TextField } from "@material-ui/core";
// import { auth } from "../services/auth";

class ResetPasswordInput extends Component
{

    constructor(){
        super();
        this.state={
            password:"",
            confirmPassword:""
        }
        this.handlePassword=this.handlePassword.bind(this);    
        this.handleConfirmPassword=this.handleConfirmPassword.bind(this);    
        this.validate=this.validate.bind(this);
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
              if (/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(this.state.password)===false) {
                  alert('invalid password');
              }
              else if(this.state.password!==this.state.confirmPassword){
                alert("mismatched password")
              }
              else {
                alert("ok");
              }
              e.preventDefault();
          }
    // clearLocslStorage(e){
    //     e.preventDefault();
    //     localStorage.clear();
    //     window.location.href="/";
    // }
    // // componentWillMount(){
    // //     auth();
    // // }
    render(){
        return(
            <form onSubmit={this.validate} >
                <TextField
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handlePassword}
                /><p />
                <TextField
                type="password"
                label="Confirm password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPassword}
                />  
                <p />
                <Button style={{marginTop:"3%",marginBottom:"3%"}} variant="contained"
                type="submit"
              >Submit</Button>

            </form>
        )
    }
}
export default ResetPasswordInput;