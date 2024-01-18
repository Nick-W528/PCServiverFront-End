import "./JobCard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubJobCard from "../SubJobCard/SubJobCard";
import { useUser } from "../Utils/UserContext";

const client = await axios.create({
  baseURL: "http://localhost:8800/",
});

function JobCard() {
  const [expanded, setExpanded] = useState(false);
  const [subJob, setSubJob] = useState([]);
  const { currentUser, fetchUserData } = useUser();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && !currentUser) {
      fetchUserData(token);
    }

    if (currentUser) {
      const userId = currentUser._id;
      client
        .get("jobs/" + userId, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setSubJob(response.data);
        });
    }
  }, [currentUser, fetchUserData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      {subJob.map((job, key) => (
        <Grid xs={12} item key={key}>
          <Divider sx={{ borderColor: "#fff" }} />
          <Accordion
            className="job-card-container"
            expanded={expanded === key}
            onChange={handleChange(key)}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            <AccordionSummary
              className="job-card-wrapper"
              expandIcon={<ExpandMoreIcon className="job-icon" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ margin: 1 }}
            >
              <div className="job-details">
                <div className="job-title">
                  <Typography variant="h5">{job.name}</Typography>
                </div>
                <div
                  className="job-status"
                  style={{ backgroundColor: statusColor(job.status) }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {job.status}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#000" }}>
              <SubJobCard id={job._id} />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ borderColor: "#fff" }} />
        </Grid>
      ))}
    </>
  );
}

export default JobCard;
