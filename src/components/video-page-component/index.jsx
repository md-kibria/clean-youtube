import useVideo from "../../hooks/useVideo";
import PageSection from "../PageSection";
import VideoCardItem from '../video-card-item'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const VideoPage = ({items}) => {
    
    return (
        <>
            <PageSection 
                title="Videos" 
                items={items}
                TitleIcon={VideoLibraryIcon} 
                Card={VideoCardItem}
            />
        </>
    )
};

export default VideoPage;
