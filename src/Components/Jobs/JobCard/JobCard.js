import "./JobCard.css";
import { useEffect, useContext } from "react";
import { Box, Grid } from "@mui/material";
import { useUser } from "../../Utils/UserContext.js";
import { JobService } from "../../../Services/Jobs/JobService.js";
import JobDescription from "../Job_Description/Job_Description.js";
import JobProgress from "../Job_Progress/Job_Progress.js";
import JobStatus from "../Job_Status/Job_Status.js";
import JobCompletionDate from "../Job_Completion/Job_Completion.js";
import CreateJob from "../CreteJob/CreateJob.js";
import { AppContext } from "../../Utils/AppContext.js";
import { DateHelper } from "../../Utils/FormatDate.js";

function JobCard() {
  const { currentUser, fetchUserData } = useUser();
  const { selectedDate } = useContext(AppContext);
  const { jobs, setJobs } = useContext(AppContext);

  const fetchJobs = () => {    
    const userId = currentUser._id;
    try {
      JobService.GetJobsByDueDate(
        userId,
        DateHelper.FormatDate(selectedDate)
      ).then((response) => {
        setJobs(response.data);
      });
    } catch (error) {
      console.error("Error fetching jobs by due date:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && !currentUser) {
      fetchUserData(token);
    }

    if (currentUser) {      
      fetchJobs();
    }
  }, [selectedDate, currentUser, fetchUserData, setJobs, jobs]);

  return (
    <>
    <Grid xs={12} item spacing={2} sx={{ margin: "10px 10px" }}>
      <CreateJob onJobCreated={fetchJobs} />
    </Grid>
      {jobs.length !== 0 ? (
        jobs.map((job, key) => (          
          <Grid xs={12} item key={key} spacing={2} sx={{ margin: "10px 10px" }}>
            {/* <Link to={`/subjob/${job._id}`} style={{ textDecoration: "none" }}> */}
            <Box
              sx={{
                backgroundColor: "#0c0c0c",
                color: "#F4DFC8",
                border: "2px solid #0c0c0c",
                padding: "20px 40px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.1s ease-in",
                "&:hover": {
                  borderColor: "red",
                  border: "2px solid #F4DFC8",
                },
              }}
            >
              <Grid container item xs={12} sx={{ marginBottom: "20px" }}>
                <Grid xs={3} item>
                  IMG
                </Grid>
                <Grid
                  xs={9}
                  item
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
              <Grid xs={12} item sx={{ marginBottom: "20px;" }}>
                <JobDescription
                  name={job.name}
                  description={job.description}
                  createdAt={job.createdAt}
                />
                <JobStatus status={job.status} />
              </Grid>
              <Grid xs={12} item sx={{ marginBottom: "20px" }}>
                <JobProgress jobId={job._id} />
              </Grid>
            </Box>
            {/* </Link> */}
          </Grid>                    
        ))
      ) : (
        <Box sx={{ color: "#F4DFC8", marginTop: "20px", textAlign: "center" }}>
          <h2>No jobs found for the selected date.</h2>          
        </Box>
      )}      
    </>
  );
}

export default JobCard;
