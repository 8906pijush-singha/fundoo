import axios from 'axios'

export function reset(password){
  axios('/reset',{
    method: "POST",
    headers: {
      "access-token": localStorage.getItem(window.location.pathname.substr(7))
    },
    body:{
        password:password
    }
    }).then(function (response) {
            window.location.href='/';             
        })
        .catch(function (error) {
          console.log(error);
          
          // alert(error);
        });
      }
