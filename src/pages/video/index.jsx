import { Avatar, Box, Typography } from "@mui/material";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlayerLoader from "../../components/loader/player-page";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useVideo from "../../hooks/useVideo";
import responsiveHeight from "../../utils/responsiveHeight";
import NotFound from "../../components/NotFound";

const Video = () => {
    const { id } = useParams();
    const {handleFavourite, handleDelete, initialVideo, loadVideo} = useVideo()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [plHeight, setPlHeight] = useState(550);
    const [video, setVideo] = useState(initialVideo);

    const [isFavourite, setIsFavourite] = useState(false)
    const favourites = useStoreState(state => state.favourites.data.videos)

    const { addToRecents } = useStoreActions((state) => state.recents);
    const recents = useStoreState((state) => state.recents.data.videos);

    const {data: videos, isLoading} = useStoreState((state) => state.videos);
    const { getVideo } = useStoreActions((state) => state.videos);

    const getLoadVid = async () => {
        const vid = await loadVideo(id);
        setVideo(vid);
    }
   
    useEffect(() => {
        if (videos[id]) {
            setVideo(videos[id]);
            setLoading(false);
        } else {
            // ⚡This is for save video and show video not found
            // getVideo(id);
            // toast.warn("Playlist or video not found");
            // navigate("/404/Playlist or video not found");

            // This is form load video from YT and show
            getLoadVid()
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (favourites.length !== 0) {
            favourites.map((fav) => {
                if (fav === id) {
                    setIsFavourite(true);
                }
            });
        }
    }, [favourites]);

    useEffect(() => {
        if (recents.length !== 0) {
            let isRecent = recents.filter((rec) => rec === id).length === 0;
            if (isRecent) addToRecents({type: 'video', data: id});
        } else {
            addToRecents({type: 'video', data: id});
        }
    }, []);

    // Responsive
    useEffect(() => {
        window.addEventListener("resize",() => responsiveHeight(setPlHeight));
        responsiveHeight(setPlHeight)
    }, []);

    const favHandle = () => {
        setIsFavourite(!isFavourite)
        handleFavourite(videoId)
    }

    const opts = {
        height: plHeight,
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            rel: 0, // the player does not show related videos.
        },
    };

    const {
        videoId,
        videoTitle: title,
        videoDescription: description,
        videoThumbnail: thumbnail,
        channelId,
        channelTitle,
        logo,
        publishedAt
    } = video;

    if (loading) {
        return <PlayerLoader />;
    }

    if(!videoId) {
        return <NotFound />
    }

    return (
        <Box my="1rem">
            <Box sx={{ display: "flex", position: "relative" }}>
                <Box
                    sx={{ background: "#222", height: plHeight, width: "100%" }}
                >
                    <YouTube videoId={videoId} opts={opts} />
                </Box>
            </Box>
            
            <Typography variant="h5" mt="1rem">
                {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: "1rem" }}>
                <a
                    target="_blank"
                    href={`https://youtube.com/channel/${channelId}`}
                    style={{color: '#222', textDecoration: 'none', display: 'flex', alignItems: 'center'}}
                >
                    <Avatar alt={channelTitle} src={logo?.url} />
                    <Typography variant="h6" ml="0.5rem" sx={{ flexGrow: 1 }}>
                        {channelTitle}
                    </Typography>
                </a>

                <Box>
                    <IconButton onClick={favHandle} color="error">
                        {isFavourite ? (
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(videoId, setVideo)}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>                   
                </Box>
            </Box>
            <Typography variant="body1" color={"#aaa"} my="3px">
                {new Date(publishedAt).toDateString()}
            </Typography>
            <Typography variant="body1" color={"#18122B"} component="pre" whiteSpace="pre-wrap">
                {description}
            </Typography>
        </Box>
    );
};

export default Video;
