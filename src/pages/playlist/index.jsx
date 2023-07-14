import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PlaylistItem from "../../components/playlist-item";

import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { IconButton } from "@mui/material";
import { useParams, useNavigate, useAsyncError } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlaylistLoader from "../../components/loader/playlist-page";

import { toast } from "react-toastify";
import usePlaylist from "../../hooks/usePlaylist";

import {ProgressBar} from 'react-loader-spinner'

const Playlist = () => {
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const { handleFavourite, handleDelete, initialPlaylist } = usePlaylist();

    const [isFavourite, setIsFavourite] = useState(false);
    const favourites = useStoreState((state) => state.favourites.data.playlists);

    const { addToRecents } = useStoreActions((state) => state.recents);
    const recents = useStoreState((state) => state.recents.data.playlists);

    const { getPlaylist, refreshPlaylist } = useStoreActions((state) => state.playlists);
    const { isLoading, error } = useStoreState((state) => state.playlists);
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(initialPlaylist);
    const playlists = useStoreState((state) => state.playlists.data);
    const {
        playlistId,
        playlistTitle,
        playlistDescription,
        playlistThumbnail,
        logo,
        channelId,
        channelTitle,
        playlistItems,
        publishedAt,
    } = playlist;

    const [status, setStatus] = useState(false)
    const [allow, setAllow] = useState(false)

    const favHandle = () => {
        handleFavourite(playlistId);
        setIsFavourite(!isFavourite);
    };

    const refreshHandle = () => {
        if(localStorage.getItem('rfs-time') < Date.now()) {
            refreshPlaylist(playlistId)
            setStatus(true)
            localStorage.setItem('rfs-time', Date.now() + ((1000*60)*60)*24)
        } else {
            alert("You can refresh only once in 24 hours.")
        }
    }

    useEffect(() => {
        if (recents.length !== 0) {
            let isRecent = recents.filter((rec) => rec === id).length === 0;
            if (isRecent) addToRecents({type: 'playlist', data: id});
        } else {
            addToRecents({type: 'playlist', data: id});
        }
    }, []);

    useEffect(() => {
        if (playlists[id]) {
            setPlaylist(playlists[id]);
            setloading(false);
        } else {
            getPlaylist(id);
            toast.warn("Playlist not found");
            navigate("/404/Playlist not found");
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
        if(!error && !isLoading && status) {
            setStatus(false);
            toast.success("Playlist refreshed successfully", {
                position: 'bottom-left',
                autoClose: 2000
              })
        }
    }, [isLoading, status])

    useEffect(() => {
        if(localStorage.getItem('rfs-time') < Date.now()) {
            setAllow(true)
        } else {
            setAllow(false)
        }
    }, [status])

    if (loading) {
        return <PlaylistLoader />;
    }

    return (
        <Grid container spacing={2} my="2rem">
            <Grid item lg={6} md={5} xs={12}>
                <img src={playlistThumbnail.url} alt="" width={"100%"} />

                <Typography variant="h5" mt="1rem">
                    {playlistTitle}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: "1rem" }}>
                    <a
                        target="_blank"
                        href={`https://youtube.com/channel/${channelId}`}
                        style={{color: '#222', textDecoration: 'none', display: 'flex', alignItems: 'center'}}
                    >
                        <Avatar alt={channelTitle} src={logo.url} />
                        <Typography variant="h6" ml="0.5rem" sx={{ flexGrow: 1 }}>
                            {channelTitle}
                        </Typography>
                    </a>

                    <Box position={'relative'}>
                        { isLoading && <ProgressBar
                            height="70"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{position: 'absolute', right: 120, bottom: -15}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor = '#18122B'
                            barColor = '#635985'
                        /> }
                        <IconButton onClick={refreshHandle} color={allow ? "error" : "default"}>
                            <RotateLeftIcon />
                        </IconButton>
                        <IconButton onClick={favHandle} color="error">
                            {isFavourite ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => handleDelete(playlistId, setPlaylist)}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Typography variant="body1" color={"#aaa"} my="3px">
                    {new Date(publishedAt).toDateString()}
                </Typography>
                <Typography variant="body1" color={"#18122B"}>
                    {playlistDescription}
                </Typography>
            </Grid>
            <Grid item lg={6} md={7} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {playlistItems.map((item, indx) => (
                        <PlaylistItem
                            key={item?.contentDetails?.videoId}
                            video={item}
                            indx={indx + 1}
                            playlistId={playlistId}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Playlist;
