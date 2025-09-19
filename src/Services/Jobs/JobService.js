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

async function GetJobsByDueDate(id, dueDate) {
    try {
        return client.get(`${id}/date/${dueDate}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
    } catch (error) {
        console.error("Error fetching jobs by due date:", error);        
    }
}

export const JobService = {
    GetJobsByUser,
    GetJobsByDueDate
}