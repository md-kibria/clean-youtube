import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import VideoPage from "../../components/video-page-component";
import PlaylistPage from "../../components/playlist-page-component";
import ChannelPage from "../../components/channel-page-component";
import usePlaylist from "../../hooks/usePlaylist";
import Title from "../../components/title";
import useVideo from "../../hooks/useVideo";
import useChannel from "../../hooks/useChannel";

const Favourites = () => {
    const {videos} = useVideo({filter: 'favourites'}) 
    const {playlists} = usePlaylist({filter: 'favourites'})
    const {channels} = useChannel({filter: 'favourites'})

    return (
        <> 
            <Title title="Favourites" Icon={PlaylistAddCheckIcon}/>

            <VideoPage items={videos}/>
            <PlaylistPage items={playlists}/>
            <ChannelPage items={channels}/>
        </>
    )
};

export default Favourites;
