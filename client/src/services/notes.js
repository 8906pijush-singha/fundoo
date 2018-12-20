import axios from 'axios'


export function getNotes() {
    return axios('/getNotes', {
        method: "GET",
        headers: {
            "access-token": localStorage.getItem("token")
        }
    }).then(function (response) {
        const result = response.data.data;
        return result;
    })
}

export function createNote(data) {
    return axios('/createNote', {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}
export function deleteNoteForever(url,data) {
    return axios(url, {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}

export function getCollabDetails(url) {
    console.log(url);
    
    return axios(url, {
        method: "GET",
        headers: {
            "access-token": localStorage.getItem("token")
        },
    })
}

export function saveCollabs(url,data) {
    console.log(url,data);
    
    return axios(url, {
        method: "POST",
        headers: {
            "access-token": localStorage.getItem("token")
        },
        data:data
    })
}
