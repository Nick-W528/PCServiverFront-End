import axios from "axios";

const client = await axios.create({
    baseURL: "http://localhost:8800/subjobs/"
})

async function GetSubJobsByJob(id) {
    console.log(id);
    return client.get(id);
}

async function EditSubJob(id, body) {
    console.log(body);
    return client.put(id, {
        name: body.subJobName,
        description: body.subJobDescription,
    });
}

export const SubJobService = {
    GetSubJobsByJob,
    EditSubJob
}