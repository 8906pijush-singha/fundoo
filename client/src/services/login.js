import axios from 'axios'

export function login(email,password){
  axios.post('/login', {
          email:email,
          password:password
        })
        .then(function (response) {
            console.log(response);
          localStorage.setItem("token",response.data);
          window.location.href='logout';
        })
        .catch(function (error) {
          console.log(error);
        });
  }
