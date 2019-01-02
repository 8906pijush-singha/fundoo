import React, { Component } from 'react';

import GoogleLogin from 'react-google-login';



const responseGoogle = (response) => {
    console.log(response);
}

class GoogleLoginPage extends Component {
    render() {
        return (
            <GoogleLogin
                clientId="237902801242-6r0u6nkauig470mvsj37egeo42qlsn03.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        )
    }
}
export default GoogleLoginPage;


// ReactDOM.render(
//  ,
//   document.getElementById('googleButton')
// );