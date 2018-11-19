import axios from 'axios'

function signup(fname,lname,email,password){    
//   localStorage.setItem('email',email);
  axios.post('/register', {
          fname:fname,
          lname:lname,
          email:email,
          password:password
        })
        .then(function (response) {
          console.log(response);
          console.log("galat hai");
          window.location.href='/';
        })
        .catch(function (error) {
          console.log(error);
        });
  }
export{
    signup
}