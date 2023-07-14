import { createStore, persist } from "easy-peasy";
import FavouriteMode from "./favourite-model";
import playlistModel from "./playlist-model";
import RecentModel from "./recent-model";
import videoModel from "./video-model";
import channelModel from "./channel-model";

const store = createStore(
    persist(
        {
            videos: videoModel,
            playlists: playlistModel,
            channels: channelModel,
            favourites: FavouriteMode,
            recents: RecentModel,
        },
        { storage: "localStorage" }
    )
);

export default store;
