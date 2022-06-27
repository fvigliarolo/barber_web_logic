const backend = 'http://localhost:3000/'

const myFetch = {
    post: async function (endpoint, data) {
        await fetch(`${backend}${endpoint}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    } ,
    get: async function (endpoint) {
        let response = await fetch(`${backend}${endpoint}`)
        return response.json()
    }
}

// POST
function postFetch(endpoint, form) {
    return new Promise((resolve, reject) => {
        const data = myFetch.post(endpoint, form)
        resolve(data)
    })
}

// GET
function getFetch(endpoint) {
    return new Promise((resolve, reject) => {
        const data = myFetch.get(endpoint)
        resolve(data)
    })
}


export  { myFetch , postFetch, getFetch } ;



















