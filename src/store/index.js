import { createStore, persist } from "easy-peasy";
import FavouriteMode from "./favourite-model";
import playlistModel from "./playlist-model";
import RecentModel from "./recent-model";

const store = createStore(
    persist(
        {
            playlists: playlistModel,
            favourites: FavouriteMode,
            recents: RecentModel,
        },
        { storage: "localStorage" }
    )
);

export default store;
