import "./SubJobCard.css";
import { useEffect, useState } from "react";
import { Drawer, Grid, Typography } from "@mui/material";
import EditSubJob from "./Edit/EditSubJob";
import { SubJobService } from "../../../Services/SubJobs/SubJobService";
import { useParams } from "react-router-dom";
import JobStatus from "../Job_Status/Job_Status";
import GlobalLinkButton from "../../Shared/GlobalLinkButton/GlobalLinkButton";

function SubJobCard(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubJob, setSelectedSubJob] = useState(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let JobId = useParams();

  useEffect(() => {
    if (JobId !== undefined) {
      SubJobService.GetSubJobsByJob(JobId.id)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const toggleDrawer = (anchor, open, item) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSelectedSubJob(item);
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {loading ? (
        <p>loading data...</p>
      ) : (
        <Grid container spacing={2} sx={{ marginBottom: "12px" }}>          
          <GlobalLinkButton link="/" buttonText="Back" />
          {data.map((item, key) => (
            <Grid
              item
              xs={12}
              key={key}
              sx={{ 
                backgroundColor: '#0c0c0c',
                color: '#F4DFC8',
                border: '1px solid #F4DFC8',
                padding: '20px 40px',
                borderRadius: '10px',
                cursor: 'pointer',                
              }}
              onClick={toggleDrawer("right", true, item)}
            >
              <div className="sub-job-card-wrapper">
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <JobStatus status={item.status} />
                </Grid>

                <Grid item xs={12}>
                  <Grid item xs={8}>
                    <p>{item.type}</p>
                    <p>{item.description}</p>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedSubJob ? (
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false, null)}
        >
          <EditSubJob
            state={toggleDrawer()}
            id={selectedSubJob._id}
            name={selectedSubJob.name}
            description={selectedSubJob.description}
          />
        </Drawer>
      ) : null}
    </div>
  );
}

export default SubJobCard;
