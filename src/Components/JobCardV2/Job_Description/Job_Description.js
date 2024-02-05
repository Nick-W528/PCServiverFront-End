import { Typography } from "@mui/material";

function JobDescription({ name, description, createdAt }) {
  return (
    <>
      <Typography variant="caption">{createdAt}</Typography>
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
