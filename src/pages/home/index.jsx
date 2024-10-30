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
            <VideoPage items={videos.reverse().slice(0, 3)}/>
            <PlaylistPage items={playlists.reverse().slice(0, 3)}/>
            <ChannelPage items={channels.reverse().slice(0, 3)}/>
        </>
    );
};

export default Home;
