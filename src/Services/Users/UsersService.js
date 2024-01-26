import axios from "axios";

const client = await axios.create({
    baseURL: "http://localhost:8800/users/"
})

async function getCurrentUser(token) {
    const response = await client.get('/current', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
    })
    return response.data;
}

export const UsersService = {
    getCurrentUser
}