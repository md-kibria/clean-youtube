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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import usePlaylist from "../../hooks/usePlaylist";


const PlaylistCardItem = ({ item }) => {
    const { playlistThumbnail, playlistTitle, channelTitle, playlistId } =
        item;
    const [isFavourite, setIsFavourite] = useState(false);

    const favourites = useStoreState((state) => state.favourites.data.playlists);

    const {handleFavourite, handleDelete} = usePlaylist()

    const favHandle = () => {
        handleFavourite(playlistId)
        setIsFavourite(!isFavourite)
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
                // alt={playlistTitle}
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
                <Button to={`/playlists/${playlistId}`} component={Link}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <PlayCircleOutline />
                        <Typography variant="body2" fontWeight={600}>
                            Start Playlist
                        </Typography>
                    </Stack>
                </Button>

                <Box>
                    <IconButton onClick={favHandle} color="error">
                        {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleDelete(playlistId)} color="error">
                        <DeleteOutlineIcon />
                    </IconButton>

                </Box>
            </CardActions>
        </Card>
    );
};

export default PlaylistCardItem;
