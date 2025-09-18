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

async function GetJobsByDueDate(dueDate) {
    return client.get(`date/${dueDate}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    })
}

export const JobService = {
    GetJobsByUser,
    GetJobsByDueDate
}