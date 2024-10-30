import { useEffect, useState } from "react";
import SearchPage from "../../components/search-page-component";
import getResult from "../../api/search";
import { useSearchParams } from "react-router-dom";
import PaginationOutlined from "../../components/pagination";
import { useStoreState } from "easy-peasy";


const Search = () => {

    let [searchParams] = useSearchParams();
    const [data, setData] = useState({ items: [] })
    const [isDataLoading, setIsDataLoading] = useState(false);
    const videos = useStoreState((state) => state.videos.data);
    const playlists = useStoreState((state) => state.playlists.data);
    const channels = useStoreState((state) => state.channels.data);

 
    const getData = async (token) => {
        setIsDataLoading(true);
        setData({ items: [] })
        let result = await getResult(searchParams.get('q'), searchParams.get('type'), token)
        result.items = result.items.map(itms => {
            let isFound = false;

            if (searchParams.get('type') == 'video') {
                Object.keys(videos).forEach(rv => {
                    if (itms.videoId == rv) {
                        isFound = true;
                    }
                });
            } else if (searchParams.get('type') == 'playlist') {
                Object.keys(playlists).forEach(rv => {
                    if (itms.playlistId == rv) {
                        isFound = true;
                    }
                });
            } else if (searchParams.get('type') == 'channel') {
                Object.keys(channels).forEach(rv => {
                    if (itms.channelId == rv) {
                        isFound = true;
                    }
                });
            }

            if (isFound) {
                return {
                    ...itms,
                    isAdded: true
                }
            } else {
                return {
                    ...itms,
                    isAdded: false
                }
            }
        })

        setData(result);
        setIsDataLoading(false);
    }

    useEffect(() => {
        getData();
    }, [searchParams]);


    return <>
        <SearchPage items={data?.items} isDataLoading={isDataLoading} />
        <PaginationOutlined data={data} getData={getData} />
    </>
};

export default Search;
