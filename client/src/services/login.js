import axios from 'axios'

export function login(email,password){

  axios.post('/login', {
          email:email,
          password:password
        })
        .then(function (response) {
            console.log(response.data);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("isAuth",true); 
          localStorage.setItem("UserName",response.data.userName); 
          localStorage.setItem("profilePic",response.data.profilePic); 
          localStorage.setItem("Email",email);
          window.location.href='notes';
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        });
      }
