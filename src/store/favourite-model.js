import { action, persist } from "easy-peasy";

const FavouriteMode = persist({
    data: {
        videos: [],
        playlists: [],
        channels: []
    },
    addToFavourite: action((state, payload) => {
        state.data[payload.type+'s'].push(payload.data)
    }),
    removeFromFavourite: action((state, payload) => {
        state.data = {
            ...state.data,
            [payload.type+'s']: state.data[payload.type+'s'].filter(fav => fav !== payload.data)
        }
    })
})

export default FavouriteMode