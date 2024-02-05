import { Typography } from "@mui/material";

function JobStatus({ status }) {

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
    <div
      className="job-status"
      style={{ backgroundColor: statusColor(status) }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {status}
      </Typography>
    </div>
  );
}

export default JobStatus;
