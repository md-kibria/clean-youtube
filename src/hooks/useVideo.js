import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getVideo from "../api/video";

const initialVideo = {
    videoId: "",
    videoTitle: "",
    videoDescription: "",
    videoThumbnail: {url: ""},
    channelId: "",
    channelTitle: "",
    logo: {url: ""},
    publishedAt: ""
};

const useVideo = (arg) => {
    const videoData = useStoreState((state) => state.videos.data);
    let videos = null;

    const { addToFavourite, removeFromFavourite } = useStoreActions(
        (state) => state.favourites
    );
    const favourites = useStoreState((state) => state.favourites.data.videos);

    const { removeVideo } = useStoreActions((state) => state.videos);
    const { removeFromRecents } = useStoreActions((state) => state.recents);

    const history = useNavigate();

    if (arg) {
        if (arg.filter === "home") {
            videos = Object.values(videoData);
        } else if (arg.filter === "favourites") {
            const favourites = useStoreState((state) => state.favourites.data.videos);
            videos = favourites.map((fav) => videoData[fav]);
        } else if (arg.filter === "recents") {
            const recents = useStoreState((state) => state.recents.data.videos);
            videos = recents.map((rec) => videoData[rec]);
        }
    } else {
        // Like home
        videos = Object.values(videoData);
    }

    // Handle favoutie
    const handleFavourite = (videoId) => {
        if (favourites.length !== 0) {
            let isFav =
                favourites.filter((fav) => fav === videoId).length !== 0;
                // Q to Me: Can I use here js array method "includes" here?
            if (isFav) {
                removeFromFavourite({type: 'video', data: videoId});
                toast.info("Removed from favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            } else {
                addToFavourite({type: 'video', data: videoId});
                toast.info("Added to favorites", {
                    position: "bottom-left",
                    autoClose: 2000
                });
            }
        } else {
            addToFavourite({type: 'video', data: videoId});
            toast.info("Added to favorites", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    // Delete playlist
    const handleDelete = (videoId, setvideo) => {
        if (confirm("Are you sure?")) {
            if(setvideo) setvideo(initialVideo);
            removeVideo(videoId);
            removeFromFavourite({type: 'video', data: videoId})
            removeFromRecents({type: 'video', data: videoId})
            if(setvideo) history(-1);
            toast.warn("Video was successfully removed!", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    };

    // Load video from search
    const loadVideo = async (id) => {
        const video = await getVideo(id)
        return video;
    }

    return {
        videos,
        handleFavourite,
        handleDelete,
        initialVideo,
        loadVideo
    };
};

export default useVideo;
