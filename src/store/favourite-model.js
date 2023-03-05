import { action, persist } from "easy-peasy";

const FavouriteMode = persist({
    data: [],
    addToFavourite: action((state, payload) => {
        state.data.push(payload);
    }),
    removeFromFavourite: action((state, payload) => {
        state.data = state.data.filter(fav => fav !== payload)
    })
})

export default FavouriteMode