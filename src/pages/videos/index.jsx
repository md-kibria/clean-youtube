import VideoPage from "../../components/video-page-component";
import useVideo from "../../hooks/useVideo";

const Videos = () => {
    const {videos} = useVideo() 
    return <VideoPage items={videos}/>
};

export default Videos;
