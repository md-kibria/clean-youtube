import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PlaylistItem from "../../components/playlist-item";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlaylistLoader from "../../components/loader/playlist-page";

import { toast } from "react-toastify";
import usePlaylist from "../../hooks/usePlaylist";

const Playlist = () => {
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const { handleFavourite, handleDelete, initialPlaylist } = usePlaylist();

    const [isFavourite, setIsFavourite] = useState(false);
    const favourites = useStoreState((state) => state.favourites.data);

    const { addToRecents } = useStoreActions((state) => state.recents);
    const recents = useStoreState((state) => state.recents.data);

    const { getPlaylist } = useStoreActions((state) => state.playlists);
    const { isLoading } = useStoreState((state) => state.playlists);
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

    const favHandle = () => {
        handleFavourite(playlistId);
        setIsFavourite(!isFavourite);
    };

    useEffect(() => {
        if (recents.length !== 0) {
            let isRecent = recents.filter((rec) => rec === id).length === 0;
            if (isRecent) addToRecents(id);
        } else {
            addToRecents(id);
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
                if (fav === playlistId) {
                    setIsFavourite(true);
                }
            });
        }
    }, [favourites]);

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
                <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
                    <a
                        target="_blank"
                        href={`https://youtube.com/channel/${channelId}`}
                    >
                        <Avatar alt={channelTitle} src={logo.url} />
                    </a>

                    <Typography variant="h6" ml="0.5rem" sx={{ flexGrow: 1 }}>
                        {/* <a target="_blank" href={`https://youtube.com/channel/${channelId}`}> */}
                        {channelTitle}
                        {/* </a> */}
                    </Typography>
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
                        <DeleteIcon />
                    </IconButton>
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
