import React, { Component } from 'react';
import { TextField, Button } from "@material-ui/core"
import { login } from '../services/login';



class LoginInput extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleEmail = (e) => {
    this.setState({ email: e.target.value })
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  validate = (e) => {
    // password must be at least 8 characters
    // At least 1 special character from @#$%&
    // At least 1 number, 1 lowercase, 1 uppercase letter
    if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(this.state.email) === false
      || /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(this.state.password) === false) {
      alert('invalid username or password');
    }
    else {

      login(this.state.email, this.state.password);
    }
    e.preventDefault();
  }
  render() {
    return (
      <div >
        <TextField
          id="email"
          label="Email"
          type="Email"
          value={this.state.email}
          onChange={this.handleEmail}
        />
        <p />
        <TextField
          //  InputProps={{
          //  disableUnderline: true
          //  }}
          // if it is text field and u need to remove the underline do the above 
          // and if it is input then simply use "disableUnderline={true}" 
          id="password"
          type="password"
          label="Password"
          value={this.state.password}
          onChange={this.handlePassword}
        />
        <p />
        <Button
          id="btnLogin"
          type="submit"
          style={{ fontSize: "100%" }}
          component="span"
          onClick={this.validate}
        ><b>Login</b></Button>
      </div>

    );
  }
}
export default LoginInput;