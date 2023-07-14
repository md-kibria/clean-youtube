import PlaylistPage from "../../components/playlist-page-component";
import usePlaylist from "../../hooks/usePlaylist";
import VideoPage from "../../components/video-page-component";
import ChannelPage from "../../components/channel-page-component";
import useVideo from "../../hooks/useVideo";
import useChannel from "../../hooks/useChannel";

const Home = () => {
    const {videos} = useVideo() 
    const {playlists} = usePlaylist()
    const {channels} = useChannel()

    return (
        <>
            <VideoPage items={videos}/>
            <PlaylistPage items={playlists}/>
            <ChannelPage items={channels}/>
        </>
    );
};

export default Home;
