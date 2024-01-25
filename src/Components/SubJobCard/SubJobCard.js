import "./SubJobCard.css";
import { useEffect, useState } from "react";
import { Drawer, Grid, Typography } from "@mui/material";
import EditSubJob from "./Edit/EditSubJob";
import { SubJobService } from '../../Services/SubJobs/SubJobService'

function SubJobCard(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubJob, setSelectedSubJob] = useState(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });      

  useEffect(() => {
    SubJobService.GetSubJobsByJob(props.id).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })   
  }, [props.id, selectedSubJob]);

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

  const toggleDrawer = (anchor, open, item) => (event) => {    
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        <Grid container spacing={2} sx={{marginBottom: '12px'}}>
          {data.map((item, key) => (
            <Grid item xs={4} key={key} onClick={toggleDrawer('right', true, item)}>            
              <div className="sub-job-card-wrapper">                
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
      {selectedSubJob ? (
        <Drawer 
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false, null)}>          
            <EditSubJob state={toggleDrawer()} id={ selectedSubJob._id } name={selectedSubJob.name} description={selectedSubJob.description} />           
        </Drawer>
      ) : null }
      
    </div>
  );
}

export default SubJobCard;
