import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialPlaylist = {
    playlistId: "",
    playlistTitle: "",
    playlistDescription: "",
    playlistThumbnail: "",
    logo: "",
    channelId: "",
    channelTitle: "",
    playlistItems: [],
    publishedAt: "",
};

const usePlaylist = (arg) => {
    const playlistsData = useStoreState((state) => state.playlists.data);
    let playlists = null;

    const { addToFavourite, removeFromFavourite } = useStoreActions(
        (state) => state.favourites
    );
    const favourites = useStoreState((state) => state.favourites.data);

    const { removePlaylist } = useStoreActions((state) => state.playlists);
    const { removeFromRecents } = useStoreActions((state) => state.recents);

    const history = useNavigate();

    if (arg) {
        if (arg.filter === "home") {
            playlists = Object.values(playlistsData);
        } else if (arg.filter === "favourites") {
            const favourites = useStoreState((state) => state.favourites.data);
            playlists = favourites.map((fav) => playlistsData[fav]);
        } else if (arg.filter === "recents") {
            const recents = useStoreState((state) => state.recents.data);
            playlists = recents.map((rec) => playlistsData[rec]);
        }
    }

    // Handle favoutie
    const handleFavourite = (playlistId) => {
        if (favourites.length !== 0) {
            let isFav =
                favourites.filter((fav) => fav === playlistId).length !== 0;
            if (isFav) {
                removeFromFavourite(playlistId);
                toast.info("Removed from favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            } else {
                addToFavourite(playlistId);
                toast.info("Added to favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            }
        } else {
            addToFavourite(playlistId);
            toast.info("Added to favorites", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    // Delete playlist
    const handleDelete = (playlistId, setPlaylist) => {
        if (confirm("Are you sure?")) {
            setPlaylist(initialPlaylist);
            removePlaylist(playlistId);
            removeFromFavourite(playlistId)
            removeFromRecents(playlistId)
            history(-1);
            toast.info("Playlist was successfully deleted!", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    return {
        playlists,
        handleFavourite,
        handleDelete,
        initialPlaylist,
    };
};

export default usePlaylist;
