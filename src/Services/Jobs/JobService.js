import axios from "axios";

const client = await axios.create({
  baseURL: "http://localhost:8800/jobs/",
});

async function CreateJob(data) {    
  try {
    return client.post("", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log("Error creating new job:", error);
  }  
}

async function GetJobsByUser(id) {
  return client.get(id, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}

async function GetJobsByDueDate(id, dueDate) {
  try {
    return client.get(`${id}/date/${dueDate}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs by due date:", error);
  }
}

export const JobService = {
  CreateJob,
  GetJobsByUser,
  GetJobsByDueDate,
};