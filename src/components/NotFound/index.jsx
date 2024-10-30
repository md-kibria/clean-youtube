import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '70vh'}}>
        <Typography variant="h1">404</Typography>
        <Typography variant="subtitle1">Sorry, Page Not Found</Typography>
        <Button to="/" component={Link}>Go To Home</Button>
    </Box>
}

export default NotFound;