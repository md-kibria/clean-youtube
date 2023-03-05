import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistPage from "../../components/playlist-page-component";
import usePlaylist from "../../hooks/usePlaylist";

const Favourites = () => {
    const { playlists } = usePlaylist({ filter: "favourites" });

    return (
        <PlaylistPage
            title="Favourites"
            TitleIcon={PlaylistAddCheckIcon}
            playlists={playlists}
        />
    );
};

export default Favourites;
