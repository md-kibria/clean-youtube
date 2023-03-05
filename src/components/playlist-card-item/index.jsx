import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";
import { Box, Stack } from "@mui/system";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import usePlaylist from "../../hooks/usePlaylist";


const PlaylistCardItem = ({ playlist }) => {
    const { playlistThumbnail, playlistTitle, channelTitle, playlistId } =
        playlist;
    const [isFavourite, setIsFavourite] = useState(false);

    const favourites = useStoreState((state) => state.favourites.data);

    const {handleFavourite} = usePlaylist()

    const favHandle = () => {
        handleFavourite(playlistId)
    }

    useEffect(() => {
        if (favourites.length !== 0) {
            favourites.map((fav) => {
                if (fav === playlistId) {
                    setIsFavourite(true);
                }
            });
        }
    }, [favourites]);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: 1,
            }}
        >
            <CardMedia
                component="img"
                image={playlistThumbnail.url}
                alt={playlistTitle}
            />

            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {`${
                        playlistTitle.length > 50
                            ? playlistTitle.substring(0, 50) + "..."
                            : playlistTitle
                    }`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {channelTitle}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }}></Box>
            <CardActions
                disableSpacing
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button to={`/playlist/${playlistId}`} component={Link}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <PlayCircleOutline />
                        <Typography variant="body2" fontWeight={600}>
                            Start Playlist
                        </Typography>
                    </Stack>
                </Button>
                <IconButton onClick={favHandle} color="error">
                    {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PlaylistCardItem;
