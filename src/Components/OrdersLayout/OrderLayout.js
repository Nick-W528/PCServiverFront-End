import { Grid } from "@mui/material";
import JobCard from "../JobCard/JobCard";

function OrderLayout(props) {
    return (
        <Grid container spacing={2} style={{ marginTop: 64 }}>
            <JobCard />
        </Grid>
    )
}

export default OrderLayout;