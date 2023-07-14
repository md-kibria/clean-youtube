import useChannel from "../../hooks/useChannel";
import PageSection from "../PageSection";
import ChannelCardItem from "../channel-card-item";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const ChannelPage = ({items}) => {

    return (
        <>
            <PageSection 
                title="Channels"
                items={items}
                TitleIcon={MovieFilterIcon} 
                Card={ChannelCardItem}
            />
        </>
    )
};

export default ChannelPage;
