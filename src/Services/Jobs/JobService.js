import axios from "axios";

const client = await axios.create({
    baseURL: "http://localhost:8800/jobs/"
})

async function GetJobsByUser(id) {
    return client.get(id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    })    
}

export const JobService = {
    GetJobsByUser
}