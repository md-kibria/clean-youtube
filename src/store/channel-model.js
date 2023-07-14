import { action, persist,thunk } from "easy-peasy";
import getChannel from "../api/channel";

const channelModel = persist({
    data: {},
    error: '',
    isLoading: false,
    addChannel: action((state, payload) => {
        state.data[payload.channelId] = payload
    }),
    removeChannel: action((state, payload) => {
        delete state.data[payload]
    }),
    setLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),
    getChannel: thunk(async({addChannel, setLoading, setError},channelId,{getState}) => {
        if(getState().data[channelId]) {
            setError("Channel already added")
            return;
        }
        setLoading(true)
        try {
            const channel = await getChannel(channelId)
            addChannel(channel)
            setError('')
        } catch(err) {
            setError(err.response?.data?.error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    })
})

export default channelModel