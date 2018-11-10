import React,{Component} from 'react';


class Links extends Component{
    render(){
        return(
            <div className="registerLink">
            <a href="/forgot" id="forgot"
             >Forgot password?</a>
            <a href="/register" id="acunt" 
            >New user?</a>
            </div>
        )
    }
}

class RegisterLink extends Component{
    render(){
        return(
            <div>
            <a href="/login" id="registerLink" 
            >Already have an acount?</a>
            </div>
        )
    }
}

class Home extends Component{
    render(){
        return(
            <div>
            <a href="/login" id="homeLink" 
            >Back to sign in</a>
            </div>
        )
    }
}
export{ 
    Links,
    RegisterLink,
    Home
}