import { Box, Typography, Button, Alert } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {Link, useParams} from 'react-router-dom'

const NotFound = () => {
    const {msg} = useParams()
    console.log(msg)
    let notFoundMsg = msg || "Page Not Found!"
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
            <Typography variant="h1" color={'#443C68'}>404</Typography>
            <Typography variant="h5" color={'#635985'}>{notFoundMsg}</Typography>
            <Button color="secondary" to="/" component={Link} ><NavigateBeforeIcon/> Go To Home</Button>
        </Box>
    );
};

export default NotFound