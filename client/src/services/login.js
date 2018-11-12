import axios from 'axios'

export function login(email,password){

  axios.post('/login', {
          email:email,
          password:password
        })
        .then(function (response) {
            console.log(response.data);
          localStorage.setItem("token",response.data);
          window.location.href='note';
        })
        .catch(function (error) {
          console.log(error);
        });
      }
