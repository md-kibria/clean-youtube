import { useEffect, useState } from "react";
import PageSection from "../PageSection";
import TuneIcon from '@mui/icons-material/Tune';
import { useSearchParams } from "react-router-dom";
import VideoCardItem from '../video-card-item'
import PlaylistCardItem from "../playlist-card-item";
import ChannelCardItem from "../channel-card-item";

const SearchPage = ({items, isDataLoading}) => {
    let [searchParams] = useSearchParams();
    const [type, setType] = useState('video');

    useEffect(() => {
        setType(searchParams.get('type'));
    }, [searchParams]);
    
    
    return (
        <>
            <PageSection 
                title={`Filtered: ${type[0].toUpperCase()+type.slice(1)}s`}
                items={items}
                TitleIcon={TuneIcon}
                Card={type === 'video' ? VideoCardItem : type === 'playlist' ? PlaylistCardItem : ChannelCardItem}
                type="search"
                loading={isDataLoading}
            />
        </>
    )
};

export default SearchPage;
