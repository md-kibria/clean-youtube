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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import useVideo from "../../hooks/useVideo";
import { toast } from 'react-toastify';


import { useStoreActions } from 'easy-peasy';




const VideoCardItem = ({ item, type=null }) => {
    const { videoId, videoTitle, videoDescription, videoThumbnail, channelId, channelTitle, logo, publishedAt } = item;
    
    const [isFavourite, setIsFavourite] = useState(false);
    const [isAdded, setIsAdded] = useState(item.isAdded);
    
    const favourites = useStoreState((state) => state.favourites.data.videos);
    
    const {videos: {getVideo}} = useStoreActions(state => state)
    const {error: errorV, isLoading: isLoadingV} = useStoreState(state => state.videos)
  
  const [t, setT] = useState(false)
  const [loading, setLoading] = useState(false)
    

    const { handleFavourite, handleDelete } = useVideo()


    const handleAdd = async () => {
        getVideo(item.videoId)
    
        setT(true)
    
      }

    const favHandle = () => {
        handleFavourite(videoId)
        setIsFavourite(!isFavourite)
    }

    const addHandle = () => {
        if(isAdded) {
            setLoading(false);
            handleDelete(videoId);
            setIsAdded(false);
        } else {
            setLoading(true);
            handleAdd();
            setIsAdded(!isAdded);
        }
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

    useEffect(() => {
        setLoading(false);
        if(t && !errorV && !isLoadingV) {
            toast.success("Video added successfully", {
              position: 'bottom-left',
              autoClose: 2000
            })
          }
    }, [isLoadingV])

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
                image={videoThumbnail?.url}
            // alt={videoTitle}
            />

            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {`${videoTitle.length > 50
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
                {type === 'search' ? (
                    <IconButton onClick={addHandle} color="error">
                        {isAdded ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                    </IconButton>
                ) : (
                    <Box>
                        <IconButton onClick={favHandle} color="error">
                            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <IconButton onClick={() => handleDelete(videoId)} color="error">
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export default VideoCardItem;
