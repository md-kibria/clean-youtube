import { Avatar, Box, Button, Typography } from "@mui/material";
import YouTube from "react-youtube";
import PlaylistItem from "../../components/playlist-item";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlayerLoader from "../../components/loader/player-page";
import { toast } from "react-toastify";
import responsiveHeight from "../../utils/responsiveHeight";
import usePlaylist from "../../hooks/usePlaylist";

const Player = () => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [videoIndex, setVideoIndex] = useState(0);
    const [video, setVideo] = useState({
        title: "",
        description: "",
        thumbnail: { url: "" },
        contentDetails: { videoPublishedAt: "" },
    });

    const navigate = useNavigate();

    const [sbWidth, setSbWidth] = useState(420);
    const [plHeight, setPlHeight] = useState(550);
    const [sm, setSm] = useState(false);

    const playlists = useStoreState((state) => state.playlists.data);
    const { playlistId, videoId } = useParams();

    const { getPlaylist } = useStoreActions((state) => state.playlists);
    const { isLoading } = useStoreState((state) => state.playlists);

    const {loadPlaylist} = usePlaylist()

    const [playlist, setPlaylist] = useState(
        playlists[playlistId] || { channelTitle: "", playlistItems: [] }
    );

    const { channelTitle, playlistItems, channelId, logo } = playlist;

    const handlePrev = () => {
        setVideo(playlistItems[videoIndex - 2]);
        setVideoIndex(videoIndex - 1);
        navigate(
            `/playlists/${playlistId}/video/${
                playlistItems[videoIndex - 2].contentDetails.videoId
            }`
        );
    };
    const handleNext = () => {
        setVideoIndex(videoIndex + 1);
        setVideo(playlistItems[videoIndex]);
        navigate(
            `/playlists/${playlistId}/video/${playlistItems[videoIndex].contentDetails.videoId}`
        );
    };

    const getLoadList = async () => {
        const list = await loadPlaylist(playlistId);
        console.log(list);
        
        setPlaylist(list);
    }


    useEffect(() => {
        if (playlists[playlistId]) {
            setPlaylist(playlists[playlistId]);
            setLoading(false);
        } else {
            // ⚡This is for save playlist and show playlist not found
            // getPlaylist(playlistId);
            // toast.warn("Playlist or video not found");
            // navigate("/404/Playlist or video not found");

            // This is form load video from YT and show
            getLoadList()
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (playlistItems.length !== 0) {
            setVideo(
                playlistItems.filter((video, indx) => {
                    if (video.contentDetails.videoId === videoId) {
                        setVideoIndex(indx + 1);
                        return video;
                    }
                })[videoIndex]
            );
        }
    }, [playlist]);

    useEffect(() => {
        if (playlistItems.length !== 0) {
            setVideo(
                playlistItems.filter((video, indx) => {
                    if (video.contentDetails.videoId === videoId) {
                        setVideoIndex(indx + 1);
                        return video;
                    }
                })[0]
            );
        }
    }, [videoId]);

    // Responsive
    useEffect(() => {
        window.addEventListener("resize",() => responsiveHeight(setPlHeight, setSbWidth, setSm));
        responsiveHeight(setPlHeight, setSbWidth, setSm)
    }, []);

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
        title,
        description,
        thumbnail,
        contentDetails: { videoId: id, videoPublishedAt },
    } = video;

    if (loading) {
        return <PlayerLoader />;
    }

    return (
        <Box my="1rem">
            <Box sx={{ display: "flex", position: "relative" }}>
                <Box
                    sx={{ background: "#222", height: plHeight, width: "100%" }}
                >
                    <YouTube videoId={id} opts={opts} />
                </Box>

                <Box sx={{ position: "relative" }}>
                    <Button
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 5,
                            background: "#635985",
                        }}
                        color="secondary"
                        variant="contained"
                        onClick={() => setOpen(!open)}
                    >
                        <PlaylistPlayIcon />
                    </Button>

                    <Box
                        sx={{
                            display: open ? "flex" : "none",
                            borderRadius: 1,
                            flexDirection: "column",
                            p: "5px 10px",
                            background: "#bdb0e6",
                            overflow: "hidden",
                            position: "absolute",
                            height: 600,
                            width: sbWidth,
                            right: 0,
                            zIndex: 4,
                        }}
                    >
                        <Typography variant="h5" my="5px">
                            All videos
                        </Typography>
                        <Box sx={{ overflowY: "scroll" }}>
                            {playlistItems.map((item, indx) => (
                                <PlaylistItem
                                    sm={sm}
                                    video={item}
                                    indx={indx + 1}
                                    playlistId={playlistId}
                                    sidebar={true}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "2rem",
                }}
            >
                <Button
                    variant="contained"
                    onClick={handlePrev}
                    disabled={videoIndex === 1}
                >
                    <NavigateBeforeIcon /> Prev
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={videoIndex === playlistItems.length}
                >
                    Next <NavigateNextIcon />
                </Button>
            </Box>
            <Typography variant="h5" mt="1rem">
                {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
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
            </Box>
            <Typography variant="body1" color={"#aaa"} my="3px">
                {new Date(videoPublishedAt).toDateString()}
            </Typography>
            <Typography variant="body1" color={"#18122B"} component="pre" whiteSpace="pre-wrap">
                {description}
            </Typography>
        </Box>
    );
};

export default Player;
