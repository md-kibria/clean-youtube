import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
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

import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import useChannel from "../../hooks/useChannel";
import { toast } from 'react-toastify';


const ChannelCardItem = ({ item, type }) => {
    const { channelId, channelTitle, channelDescription, customUrl, logo, publishedAt } =
        item;
    const [isFavourite, setIsFavourite] = useState(false);
    const [isAdded, setIsAdded] = useState(item.isAdded);

    const favourites = useStoreState((state) => state.favourites.data.channels);

    const recents = useStoreState((state) => state.recents.data.channels);
    const { addToRecents } = useStoreActions((state) => state.recents);

    const { channels: { getChannel } } = useStoreActions(state => state)
    const { error: errorC, isLoading: isLoadingC } = useStoreState(state => state.channels)


    const [t, setT] = useState(false)
    const [loading, setLoading] = useState(false)


    const { handleFavourite, handleDelete } = useChannel()

    const handleAdd = async () => {
        getChannel(channelId)
    
        setT(true)
    
      }

    const favHandle = () => {
        handleFavourite(channelId)
        setIsFavourite(!isFavourite)
    }

    useEffect(() => {
        if (favourites.length !== 0) {
            favourites.map((fav) => {
                if (fav === channelId) {
                    setIsFavourite(true);
                }
            });
        }
    }, [favourites]);

    useEffect(() => {
        setLoading(false);
        if(t && !errorC && !isLoadingC) {
            toast.success("Channel added successfully", {
              position: 'bottom-left',
              autoClose: 2000
            })
          }
    }, [isLoadingC])

    const addHandle = () => {
        if(isAdded) {
            setLoading(false);
            handleDelete(channelId);
            setIsAdded(false);
        } else {
            setLoading(true);
            handleAdd();
            setIsAdded(true);
        }
    }

    const handleRecent = () => {
        if (recents.length !== 0) {
            let isRecent = recents.filter((rec) => rec === channelId).length === 0;
            if (isRecent) addToRecents({ type: 'channel', data: channelId });
        } else {
            addToRecents({ type: 'channel', data: channelId });
        }
    }

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: 1,
            }}
        >
            <Avatar
                src={logo?.url}
                alt={channelTitle}
                style={{ height: 250, width: 250, borderRadius: "50%", border: "2px solid grey", margin: "auto", fontSize: 65 }}
            />

            <CardContent>
                <Typography variant="h6" color="text.primary" textAlign={"center"}>
                    {`${channelTitle.length > 50
                        ? channelTitle.substring(0, 50) + "..."
                        : channelTitle
                        }`}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    <Link to={`https://youtube.com/${customUrl}`} style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }} target="_blank">
                        {customUrl}
                    </Link>
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }}></Box>
            <CardActions
                disableSpacing
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button onClick={handleRecent} to={`https://youtube.com/channel/${channelId}`} target="_blank" component={Link}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <PlayCircleOutline />
                        <Typography variant="body2" fontWeight={600}>
                            {/* Play Videos */}
                            Go To Channel
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
                        <IconButton onClick={() => handleDelete(channelId)} color="error">
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                )
                }
            </CardActions >
        </Card >
    );
};

export default ChannelCardItem;
