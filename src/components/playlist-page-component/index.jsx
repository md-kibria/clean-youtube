import { Alert, Box, Grid, Typography } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const PlaylistPage = ({title, TitleIcon, playlists}) => {

    return (
        <>
            <Box sx={{ display: "flex", my: "1rem", color: "#635985", mt: "2rem" }}>
                <Typography
                    component="p"
                    variant="h4"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <TitleIcon fontSize="25px" />
                </Typography>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    {title}
                </Typography>
            </Box>
    
            <Grid container spacing={2} mb="2rem">
                {playlists.length > 0 ? playlists.map(playlist => (
                    <Grid key={playlist.playlistId} item md={4} sm={6} xs={12}>
                        <PlaylistCardItem
                            playlist={playlist}
                        />
                    </Grid>
                )) : <Alert severity="info" sx={{width: '100%', m:"1rem"}}>There are no playlist available for now!</Alert>}
            </Grid>
        </>
    );
};

export default PlaylistPage;
