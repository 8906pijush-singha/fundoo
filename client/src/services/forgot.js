import axios from 'axios'

export function forgot(email){

  axios.post('/forgot', {
          email:email,
        })
        .then(function (response) {
            alert("An email has been sent to your registered mail id\nplease check it");
            window.location.href="/"
        })
        .catch(function (error) {
          console.log(error);
        });
      }
