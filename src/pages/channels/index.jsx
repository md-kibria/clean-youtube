import ChannelPage from "../../components/channel-page-component";
import useChannel from "../../hooks/useChannel";

const Channels = () => {
    const {channels} = useChannel()
    return <ChannelPage items={channels}/>
};

export default Channels;
