import React,{Component} from 'react'
import { TextField, Button } from '@material-ui/core';

class ForgotInput extends Component{
    constructor(){
        super()
        this.state={
            email:""
        }
        this.handleEmail=this.handleEmail.bind(this);
        this.validate=this.validate.bind(this);
    }
    handleEmail=(e)=>{
        this.setState({email:e.target.value})
      }
    validate = (e) => {
      // password must be at least 8 characters
      // At least 1 special character from @#$%&
      // At least 1 number, 1 lowercase, 1 uppercase letter
              if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(this.state.email)===false) {
                  alert('invalid email');
              }
              else {
                alert("hoh ho");
               
              }
              e.preventDefault();
          }
    render(){
        return(
            <div>
                <TextField 
                type="Email"
                placeholder="Registered email"
                value={this.state.email}
                onChange={this.handleEmail}
                />
                <Button
                type="submit"
                component="span"
                onClick={this.validate}>
                <b>Request reset link</b></Button>
            </div>
        )
    }
}
export default ForgotInput;