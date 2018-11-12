import axios from 'axios'

export function auth(){

  axios.post('/login', {
          token:localStorage.getItem("token")
        })
        .then(function (response) {
            if(response.data.status)
                window.location.href='note';
            else
                window.location.href='/';
        })
        .catch(function (error) {
          console.log(error);
        });
      }
