import { action, persist } from "easy-peasy";

const RecentModel = persist({
    data: {
        videos: [],
        playlists: [],
        channels: []
    },
    addToRecents: action((state, payload) => {
        state.data[payload.type+'s'].unshift(payload.data)
        state.data[payload.type+'s'] = state.data[payload.type+'s'].splice(0, 5)
    }),
    removeFromRecents: action((state, payload) => {
        state.data = {
            ...state.data,
            [payload.type+'s']: state.data[payload.type+'s'].filter(rec => rec !== payload.data)
        }
    })
})

export default RecentModel