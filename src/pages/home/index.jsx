import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlaylistPage from "../../components/playlist-page-component";
import usePlaylist from "../../hooks/usePlaylist";

const Home = () => {
    const {playlists} = usePlaylist({filter: 'home'})

    return <PlaylistPage 
        title="Playlists" 
        TitleIcon={PlaylistPlayIcon} 
        playlists={playlists} 
    />;
};

export default Home;
