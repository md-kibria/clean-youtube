import HistoryIcon from "@mui/icons-material/History";
import PlaylistPage from "../../components/playlist-page-component";
import usePlaylist from "../../hooks/usePlaylist";

const Recents = () => {
    const { playlists } = usePlaylist({ filter: "recents" });

    return (
        <PlaylistPage
            title="Recents"
            TitleIcon={HistoryIcon}
            playlists={playlists}
        />
    );
};

export default Recents;
