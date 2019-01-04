import axios from 'axios'

export function getNotes(url, data) {
  console.log("token", localStorage.getItem("token"))
  axios(url, {
    method: "post",
    headers: {
      "access-token": localStorage.getItem("token")
    },
    data: data
  }).then(function (response) {
    console.log(response.data);
    return response.data;
  })
    .catch(function (error) {
      console.log(error);
      alert(error);
      return error
    });
}
export function uploadProfilePic(url, data) {
  return axios(url, {
    method: "PUT",
    headers: {
      "access-token": localStorage.getItem("token")
    },
    data: data
  })
}
