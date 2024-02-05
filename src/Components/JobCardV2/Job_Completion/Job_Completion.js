import { Typography, Chip } from "@mui/material";

function JobCompletionDate({ estimatedCompletion }) {
  return (
    <Typography
      variant="caption"
      sx={{
        fontWeight: "700",
        textTransform: "uppercase",
      }}
    >
      <Chip
        label="8 days left"
        sx={{
          fontSize: "12px",
          backgroundColor: "#F4DFC8",
          color: "#0c0c0c",
        }}
      />
    </Typography>
  );
}

export default JobCompletionDate;
