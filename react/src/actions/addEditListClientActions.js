import fetch from 'isomorphic-fetch';

export function fetchClients() {
    const response = await fetch('/api/clients');
    return await response.json().then(res => res.json())
    .catch(err => err);
}

export function fetchClientbyId(id) {
    return await fetch('/api/clients/' + id, {
        method: 'GET'
    }).then(res => res.json())
    .catch(err => err);
}

export function createClient(data) {
    return await fetch('/api/clients', {
        method: 'POST',       
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function updateclient(id, data) {
    return await fetch('/api/clients/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function deleteclient(id) {
    return await fetch('/api/clients/' + id, {
        method: 'DELETE'
    }).then(res => {
        return res;
    }).catch(err => err);
}
