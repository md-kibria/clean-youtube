import { action, persist,thunk } from "easy-peasy";
import getPlaylist from "../api/playlist";

const playlistModel = persist({
    data: {},
    error: '',
    isLoading: false,
    addPlaylist: action((state, payload) => {
        state.data[payload.playlistId] = payload
    }),
    removePlaylist: action((state, payload) => {
        delete state.data[payload]
    }),
    setLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),
    getPlaylist: thunk(async({addPlaylist, setLoading, setError},playlistId,{getState}) => {
        if(getState().data[playlistId]) {
            setError("Playlist already added")
            return;
        }
        setLoading(true)
        try {
            const playlist = await getPlaylist(playlistId)
            addPlaylist(playlist)
            setError('')
        } catch(err) {
            setError(err.response?.data?.error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }),
    refreshPlaylist: thunk(async({addPlaylist, setLoading, setError},playlistId,{getState}) => {
        setLoading(true)
        try {
            const playlist = await getPlaylist(playlistId)
            addPlaylist(playlist)
            setError('')
        } catch(err) {
            setError(err.response?.data?.error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    })
})

export default playlistModel
