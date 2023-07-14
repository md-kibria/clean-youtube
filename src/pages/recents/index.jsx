import HistoryIcon from "@mui/icons-material/History";
import VideoPage from "../../components/video-page-component";
import PlaylistPage from "../../components/playlist-page-component";
import ChannelPage from "../../components/channel-page-component";
import usePlaylist from "../../hooks/usePlaylist";
import Title from "../../components/title";
import useVideo from "../../hooks/useVideo";
import useChannel from "../../hooks/useChannel";

const Recents = () => {
    const {videos} = useVideo({filter: 'recents'}) 
    const {playlists} = usePlaylist({filter: 'recents'})
    const {channels} = useChannel({filter: 'recents'})

    return (
        <> 
            <Title title="Recents" Icon={HistoryIcon}/>

            <VideoPage items={videos}/>
            <PlaylistPage items={playlists}/>
            <ChannelPage items={channels}/>
        </>
    )
};

export default Recents;
