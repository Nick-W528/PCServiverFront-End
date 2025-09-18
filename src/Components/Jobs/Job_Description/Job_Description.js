import { Typography } from "@mui/material";

function JobDescription({ name, description, createdAt }) {
  const formattedData = Date.parse(createdAt)

  return (
    <>
      <Typography variant="caption">{formattedData}</Typography>
      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: "700" }}
      >
        {name}
      </Typography>
      <Typography variant="caption">{description}</Typography>
    </>
  );
}

export default JobDescription;
