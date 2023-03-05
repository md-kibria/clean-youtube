import { action, persist } from "easy-peasy";

const RecentModel = persist({
    data: [],
    addToRecents: action((state, payload) => {
        state.data.unshift(payload);
        state.data = state.data.splice(0, 5)
    }),
    removeFromRecents: action((state, payload) => {
        state.data = state.data.filter(rec => rec !== payload)
    })
})

export default RecentModel