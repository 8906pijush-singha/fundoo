import React,{ Component } from "react";

import ResetPasswordInput from "../components/resetPasswordInput";
// import { auth } from "../services/auth";

class ResetPassword extends Component
{
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
            <div className="App2">
                <h1>Reset your password</h1>
                <p />
                <ResetPasswordInput/>
            </div>
        )
    }
}
export default ResetPassword;