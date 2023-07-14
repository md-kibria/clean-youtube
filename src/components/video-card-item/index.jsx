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
import useVideo from "../../hooks/useVideo";


const VideoCardItem = ({ item }) => {
    const { videoId, videoTitle, videoDescription, videoThumbnail, channelId, channelTitle, logo, publishedAt } = item;

    const [isFavourite, setIsFavourite] = useState(false);

    const favourites = useStoreState((state) => state.favourites.data.videos);

    const {handleFavourite, handleDelete} = useVideo()

    const favHandle = () => {
        handleFavourite(videoId)
        setIsFavourite(!isFavourite)
    }

    useEffect(() => {
        if (favourites.length !== 0) {
            favourites.map((fav) => {
                if (fav === videoId) {
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
                image={videoThumbnail.url}
                // alt={videoTitle}
            />

            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {`${
                        videoTitle.length > 50
                            ? videoTitle.substring(0, 50) + "..."
                            : videoTitle
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
                <Button to={`/videos/${videoId}`} component={Link}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <PlayCircleOutline />
                        <Typography variant="body2" fontWeight={600}>
                            Play Video
                        </Typography>
                    </Stack>
                </Button>

                <Box>
                <IconButton onClick={favHandle} color="error">
                    {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={() => handleDelete(videoId)} color="error">
                    <DeleteOutlineIcon />
                </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default VideoCardItem;
