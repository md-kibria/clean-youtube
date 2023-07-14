import PlaylistCardItem from "../playlist-card-item";
import PageSection from "../PageSection";
import DnsIcon from '@mui/icons-material/Dns';

const PlaylistPage = ({items}) => {

    return (
        <>
            <PageSection 
                title="Playlists"
                items={items}
                TitleIcon={DnsIcon} 
                Card={PlaylistCardItem}
            />
        </>
    )
};

export default PlaylistPage;
