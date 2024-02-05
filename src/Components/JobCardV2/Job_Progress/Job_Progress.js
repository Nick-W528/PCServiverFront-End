import { Typography, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { SubJobService } from "../../../Services/SubJobs/SubJobService";

function JobProgress({ jobId }) {
  const [subJobs, setSubJobs] = useState(null);  
  const [completedTaskCount, setCompletedTaskCount] = useState(null);
  const [totalTaskCount, setTotalTaskCount] = useState(null);

  let completedTasks = [];  

  useEffect(() => {
    SubJobService.GetSubJobsByJob(jobId).then((res) => {
      const data = res.data;
      data.forEach((job) => {
        if (job.status === "Completed") {
          completedTasks.push(job);
        }
      });
      setCompletedTaskCount(completedTasks.length);
      setTotalTaskCount(data.length);
      setSubJobs(res.data);
    });
  }, [jobId]);  

  return (
    <>
      <Typography
        variant="body2"
        sx={{
          textTransform: "uppercase",
          color: "#F4DFC8",
          fontWeight: "bold",
        }}
      >
        Progress {completedTaskCount} / {totalTaskCount}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(100 / totalTaskCount) * completedTaskCount}
        sx={{
          backgroundColor: "#252525",
          "& span": {
            backgroundColor: "#F4DFC8",
          },
        }}
      />
    </>
  );
}

export default JobProgress;
