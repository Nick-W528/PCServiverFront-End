import "./SubJobCard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

function SubJobCard(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const client = axios.create({
    baseURL: "http://localhost:8800/",
  });

  useEffect(() => {
    client
      .get("subjobs/" + props.id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const statusColor = (status) => {
    if (status === "New") {
      return "blue";
    }

    if (status === "In Progress") {
      return "Red";
    }

    if (status === "Completed") {
      return "green";
    }
  };

  return (
    <div>
      {loading ? (
        <p>loading data...</p>
      ) : (
        <Grid container spacing={2} sx={{marginBottom: '12px'}}>
          {data.map((item, key) => (
            <Grid item xs={4} key={key}>            
              <div className="sub-job-card-wrapper" key={key}>                
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{
                      textTransform: 'uppercase', fontWeight: 700
                      }}>
                        {item.name}
                    </Typography>
                    <div className="status-wrapper">
                      <div
                        className="status-pill"
                        style={{ backgroundColor: statusColor(item.status) }}
                      >
                        <p>{item.status}</p>
                      </div>
                    </div>
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
    </div>
  );
}

export default SubJobCard;
