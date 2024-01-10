import './JobCard.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from '@mui/material';
import SubJobCard from '../SubJobCard/SubJobCard';
import { useUser } from '../Utils/UserContext'

const client = await axios.create({
    baseURL: "http://localhost:8800/"
});

function JobCard() {
    const [post, setPost] = useState([]);
    const [subJob, setSubJob] = useState(null);
    const { currentUser, fetchUserData } = useUser();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token && !currentUser) {            
            fetchUserData(token);
        }                

        if (currentUser) {            
            const userId = currentUser._id;            
            client.get("jobs/" + userId, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },  
            }).then((response) => {                                
                setPost(response.data);
            })
        }

    }, [currentUser, fetchUserData]);

    const renderSubJob = (jobId) => {
        setSubJob(jobId)
    }

    return (
        <>
            <Grid item xs={6}>
                {post.map((job, key) => (
                    <div className="job-card-wrapper" key={key} onClick={() => renderSubJob(job._id)}>
                        <h2>{job.description}</h2>
                        <p>{job.name}</p>
                        <p>{job.status}</p>
                    </div>
                ))}
            </Grid>
            <Grid item xs={6}>
                {subJob && <SubJobCard id={subJob} />}
            </Grid>
        </>
    )
}

export default JobCard;