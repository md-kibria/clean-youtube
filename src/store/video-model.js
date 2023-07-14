import { action, persist,thunk } from "easy-peasy";
import getVideo from "../api/video";

const videoModel = persist({
    data: {},
    error: '',
    isLoading: false,
    addVideo: action((state, payload) => {
        state.data[payload.videoId] = payload
    }),
    removeVideo: action((state, payload) => {
        delete state.data[payload]
    }),
    setLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),
    getVideo: thunk(async({addVideo, setLoading, setError},videoId,{getState}) => {
        if(getState().data[videoId]) {
            setError("Video already added")
            return;
        }
        setLoading(true)
        try {
            const video = await getVideo(videoId)
            addVideo(video)
            setError('')
        } catch(err) {
            setError(err.response?.data?.error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    })
})

export default videoModel