import axios from 'axios'

export function reset(password) {
  axios('/reset', {
    method: "POST",
    headers: {
      "access-token": window.location.pathname.substr(7)
    },
    data: {
      password: password
    }
  }).then(function (response) {
    window.location.href = '/';
  })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
}