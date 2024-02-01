import { Grid } from "@mui/material";
// import JobCard from "../JobCard/JobCard";
import JobCardV2 from "../JobCardV2/JobCardV2";

function OrderLayout(props) {
    return (
        <Grid container spacing={2} style={{ marginTop: 64 }}>
            {/* <JobCard /> */}
            <JobCardV2 />
        </Grid>
    )
}

export default OrderLayout;