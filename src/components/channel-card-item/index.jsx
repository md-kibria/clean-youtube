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

import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import useChannel from "../../hooks/useChannel";


const ChannelCardItem = ({ item }) => {
    const { channelId, channelTitle, channelDescription, customUrl, logo, publishedAt } =
        item;
    const [isFavourite, setIsFavourite] = useState(false);

    const favourites = useStoreState((state) => state.favourites.data.channels);
    
    const recents = useStoreState((state) => state.recents.data.channels);
    const {addToRecents} = useStoreActions((state) => state.recents);

    const {handleFavourite, handleDelete} = useChannel()

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

    const handleRecent = () => {
        if (recents.length !== 0) {
            let isRecent = recents.filter((rec) => rec === channelId).length === 0;
            if (isRecent) addToRecents({type: 'channel', data: channelId});
        } else {
            addToRecents({type: 'channel', data: channelId});
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
                src={logo.url}
                alt={channelTitle} 
                style={{height: 250, width: 250, borderRadius: "50%", border: "2px solid grey", margin: "auto", fontSize: 65}}
            />

            <CardContent>
                <Typography variant="h6" color="text.primary" textAlign={"center"}>
                    {`${
                        channelTitle.length > 50
                            ? channelTitle.substring(0, 50) + "..."
                            : channelTitle
                    }`}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    <Link to={`https://youtube.com/${customUrl}`} style={{color: "rgba(0, 0, 0, 0.6)", textDecoration: "none"}} target="_blank">
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
                <Box>
                    <IconButton onClick={favHandle} color="error">
                        {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleDelete(channelId)} color="error">
                        <DeleteOutlineIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ChannelCardItem;
