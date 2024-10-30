import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialChannel = {
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

const useChannel = (arg) => {
    const channelData = useStoreState((state) => state.channels.data);
    let channels = null;

    const { addToFavourite, removeFromFavourite } = useStoreActions(
        (state) => state.favourites
    );
    const favourites = useStoreState((state) => state.favourites.data.channels);

    const { removeChannel } = useStoreActions((state) => state.channels);
    const { removeFromRecents } = useStoreActions((state) => state.recents);

    const history = useNavigate();

    if (arg) {
        if (arg.filter === "home") {
            channels = Object.values(channelData);
        } else if (arg.filter === "favourites") {
            const favourites = useStoreState((state) => state.favourites.data.channels);
            channels = favourites.map((fav) => channelData[fav]);
        } else if (arg.filter === "recents") {
            const recents = useStoreState((state) => state.recents.data.channels);
            channels = recents.map((rec) => channelData[rec]);
        }
    } else {
        // Like home
        channels = Object.values(channelData);
    }

    // Handle favoutie
    const handleFavourite = (channelId) => {
        if (favourites.length !== 0) {
            let isFav =
                favourites.filter((fav) => fav === channelId).length !== 0;
            if (isFav) {
                removeFromFavourite({type: 'channel', data: channelId});
                toast.info("Removed from favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            } else {
                addToFavourite({type: 'channel', data: channelId});
                toast.info("Added to favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            }
        } else {
            addToFavourite({type: 'channel', data: channelId});
            toast.info("Added to favorites", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    // Delete playlist
    const handleDelete = (channelId, setChannel) => {
        if (confirm("Are you sure?")) {
            if(setChannel) setChannel(initialChannel);
            removeChannel(channelId);
            removeFromFavourite({type: 'channel', data: channelId})
            removeFromRecents({type: 'channel', data: channelId})
            if(setChannel) history(-1);
            toast.warn("Channel was successfully removed!", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    return {
        channels,
        handleFavourite,
        handleDelete,
        initialChannel,
    };
};

export default useChannel;
