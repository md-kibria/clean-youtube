import PlaylistPage from "../../components/playlist-page-component";
import usePlaylist from "../../hooks/usePlaylist";

const Playlists = () => {
    const {playlists} = usePlaylist()
    return <PlaylistPage items={playlists.reverse()}/>
};

export default Playlists;
