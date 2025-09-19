import "./ToolbarHeader.css";
import { Button, ButtonGroup, Grid } from "@mui/material";

function ToolbarHeader() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <h1
          style={{
            color: '#F4DFC8',
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
            textTransform: "capitalize",
          }}
        >
          Good Morning User
        </h1>
      </Grid>
      <Grid item xs={8} style={{ textAlign: "right" }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button className='toolbar_button'>One</Button>
          <Button className='toolbar_button'>Two</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default ToolbarHeader;
