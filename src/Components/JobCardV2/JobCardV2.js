import "./JobCardV2.css";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useUser } from "../Utils/UserContext";
import { JobService } from "../../Services/Jobs/JobService";
import JobDescription from "./Job_Description/Job_Description.js";
import JobProgress from "./Job_Progress/Job_Progress.js";
import JobStatus from "./Job_Status/Job_Status.js";
import JobCompletionDate from "./Job_Completion/Job_Completion.js";

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

  return (
    <>
      {jobs.map((job, key) => (
        <Grid xs={4} item key={key}>
          <Box
            sx={{
              backgroundColor: "#0c0c0c",
              color: "#F4DFC8",
              border: "1px solid #F4DFC8",
              padding: "20px 40px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.2s ease-in-out",
              "&:hover": {
                // backgroundColor: '#F4DFC8',
                // color: '#0c0c0c',
              },
            }}
          >
            <Grid container xs={12} sx={{ marginBottom: "20px;" }}>
              <Grid xs={3}>IMG</Grid>
              <Grid
                xs={9}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <JobCompletionDate
                  estimatedCompletion={job.estimatedCompletion}
                />
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ marginBottom: "20px;" }}>
              <JobDescription
                name={job.name}
                description={job.description}
                createdAt={job.createdAt}
              />
              <JobStatus status={job.status} />
            </Grid>
            <Grid xs={12} sx={{ marginBottom: "20px" }}>
              <JobProgress jobId={job._id} />
            </Grid>
          </Box>
        </Grid>
      ))}
    </>
  );
}

export default JobCardV2;
