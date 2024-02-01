import "./JobCardV2.css";
import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useUser } from "../Utils/UserContext";
import { JobService } from "../../Services/Jobs/JobService";

function JobCardV2() {  
  const [jobs, setJobs] = useState([]);
  const { currentUser, fetchUserData } = useUser();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && !currentUser) {
      fetchUserData(token);
    }

    if (currentUser) {
      const userId = currentUser._id;
      JobService.GetJobsByUser(userId).then((response) => {
        setJobs(response.data);
      });
    }
  }, [currentUser, fetchUserData]);

  const statusColor = (status) => {
    if (status === "New") {
      return "#50C878";
    }

    if (status === "In Progress") {
      return "Red";
    }

    if (status === "Completed") {
      return "green";
    }
  };

  return (
    <>
      {jobs.map((job, key) => (
        <Grid xs={4} item key={key}>
          <Box
            sx={{
              backgroundColor: "#0c0c0c",
              color: "#F4DFC8",
              border: "1px solid #F4DFC8",
              padding: '20px 40px',              
              cursor: 'pointer',
              transition: '0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#F4DFC8',
                color: '#0c0c0c',                        
              }
            }}
          >
            <Grid container xs={12} sx={{ marginBottom: '20px;'}}>
              <Grid xs={3}>IMG</Grid>
              <Grid xs={9} sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <Typography variant="caption" sx={{
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}>
                  Task Completion
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ marginBottom: '20px;'}}>
              <Typography variant="h6" sx={{textTransform: 'uppercase', fontWeight: '700'}}>
                Nickel Design Studio
              </Typography>
              <Typography variant="caption">
                Redesign all the web pages with animation
              </Typography>
              <div
                  className="job-status"
                  style={{ backgroundColor: statusColor(job.status) }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {job.status}
                  </Typography>
                </div>
            </Grid>
            <Grid xs={12} sx={{              
              marginBottom: '20px',            
            }}>
              <Typography variant="body2" sx={{
                textTransform: 'uppercase',
                color: '#F4DFC8',
                fontWeight: 'bold',
              }}>
                Progress
              </Typography>
              <LinearProgress variant="determinate" value={10} />              
            </Grid>
          </Box>
        </Grid>
      ))}
    </>
  );
}

export default JobCardV2;
