import axios from 'axios'

export function auth(){
  console.log("token",localStorage.getItem("token"))
  axios('/token',{
    method: "POST",
    headers: {
      "access-token": localStorage.getItem("token")
    }
    }).then(function (response) {
            console.log(response);
            
            localStorage.setItem("isAuth",response.data.status)              
        })
        .catch(function (error) {
          console.log(error);
          
          alert(error);
        });
      }
