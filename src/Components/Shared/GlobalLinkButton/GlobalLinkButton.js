import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

function GlobalLinkButton({ link, buttonText }) {
    return (
        <Grid item xs={12}>
            <Link to={link}>
                <Button variant="contained">{buttonText}</Button>
            </Link>
        </Grid>
    )
}

export default GlobalLinkButton;